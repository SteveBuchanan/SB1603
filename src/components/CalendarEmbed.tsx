import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ICS_URL = '/api/calendar.php'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

interface DateRange {
  start: Date
  end: Date
}

function parseICS(raw: string): DateRange[] {
  // Normalize line endings and unfold folded lines (RFC 5545 §3.1)
  const text = raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n[ \t]/g, '')

  const ranges: DateRange[] = []
  const blocks = text.split('BEGIN:VEVENT').slice(1)

  for (const block of blocks) {
    const startM = block.match(/DTSTART(?:;[^\n:]*)?:(\d{8})/)
    const endM = block.match(/DTEND(?:;[^\n:]*)?:(\d{8})/)
    if (!startM || !endM) continue

    const parse = (s: string) =>
      new Date(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8))

    ranges.push({ start: parse(startM[1]), end: parse(endM[1]) })
  }
  return ranges
}

function isBooked(date: Date, ranges: DateRange[]): boolean {
  const t = date.getTime()
  return ranges.some(({ start, end }) => t >= start.getTime() && t < end.getTime())
}

function offsetMonth(year: number, month: number, delta: number) {
  const d = new Date(year, month + delta, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

interface MonthGridProps {
  year: number
  month: number
  ranges: DateRange[]
  today: Date
}

function MonthGrid({ year, month, ranges, today }: MonthGridProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow = new Date(year, month, 1).getDay()

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="flex-1 min-w-0">
      <p className="text-center font-semibold text-gray-800 mb-3 text-lg">
        {MONTH_NAMES[month]} {year}
      </p>

      <div className="grid grid-cols-7 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-center text-sm font-medium text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />

          const date = new Date(year, month, day)
          const past = date < today
          const todayCell = date.toDateString() === today.toDateString()
          const booked = !past && isBooked(date, ranges)

          const base =
            'flex items-center justify-center h-11 w-full text-base rounded-lg select-none transition-colors '

          let style = base
          if (past) {
            style += 'text-gray-300'
          } else if (booked) {
            style += 'bg-red-50 text-red-300 line-through cursor-not-allowed'
          } else {
            style += 'bg-green-50 text-green-700 font-medium'
          }

          if (todayCell) {
            style += ' ring-2 ring-primary ring-offset-1'
          }

          return (
            <div key={i} className={style}>
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CalendarEmbed() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [ranges, setRanges] = useState<DateRange[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  useEffect(() => {
    fetch(ICS_URL)
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.text()
      })
      .then(text => {
        setRanges(parseICS(text))
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load availability. Please try again later.')
        setLoading(false)
      })
  }, [])

  const second = offsetMonth(viewYear, viewMonth, 1)
  const canGoPrev =
    viewYear > today.getFullYear() || viewMonth > today.getMonth()

  function prev() {
    if (!canGoPrev) return
    const { year, month } = offsetMonth(viewYear, viewMonth, -1)
    setViewYear(year)
    setViewMonth(month)
  }

  function next() {
    const { year, month } = offsetMonth(viewYear, viewMonth, 1)
    setViewYear(year)
    setViewMonth(month)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-md">
        <p className="text-gray-400 animate-pulse">Loading availability...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-md">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 lg:p-10">
      <div className="flex items-start gap-2 lg:gap-6">
        <button
          onClick={prev}
          disabled={!canGoPrev}
          className="mt-1 p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex-1 flex flex-col sm:flex-row gap-8 lg:gap-12">
          <MonthGrid year={viewYear} month={viewMonth} ranges={ranges} today={today} />
          <div className="hidden sm:block w-px bg-gray-100 self-stretch" />
          <MonthGrid year={second.year} month={second.month} ranges={ranges} today={today} />
        </div>

        <button
          onClick={next}
          className="mt-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="flex gap-6 mt-6 pt-5 border-t border-gray-100 text-sm text-gray-600 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-green-100 border border-green-300" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-red-50 border border-red-200" />
          Booked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded ring-2 ring-primary" />
          Today
        </div>
      </div>
    </div>
  )
}
