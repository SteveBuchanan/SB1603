import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './CalendarEmbed.css'

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
    <div className="cal-month">
      <p className="cal-month-title">
        {MONTH_NAMES[month]} {year}
      </p>

      <div className="cal-dow-row">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="cal-dow">
            {d}
          </div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />

          const date = new Date(year, month, day)
          const past = date < today
          const todayCell = date.toDateString() === today.toDateString()
          const booked = !past && isBooked(date, ranges)

          const classes = ['cal-cell']
          if (past) classes.push('cal-cell--past')
          else if (booked) classes.push('cal-cell--booked')
          else classes.push('cal-cell--available')
          if (todayCell) classes.push('cal-cell--today')

          return (
            <div key={i} className={classes.join(' ')}>
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
      <div className="cal-card cal-card--center">
        <p className="cal-status cal-status--loading">Loading availability...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cal-card cal-card--center">
        <p className="cal-status cal-status--error">{error}</p>
      </div>
    )
  }

  return (
    <div className="cal-card">
      <div className="cal-header">
        <button
          onClick={prev}
          disabled={!canGoPrev}
          className="cal-nav-btn"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="cal-months">
          <MonthGrid year={viewYear} month={viewMonth} ranges={ranges} today={today} />
          <div className="cal-divider" />
          <MonthGrid year={second.year} month={second.month} ranges={ranges} today={today} />
        </div>

        <button onClick={next} className="cal-nav-btn" aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="cal-legend">
        <div className="cal-legend-item">
          <div className="cal-legend-swatch cal-legend-swatch--available" />
          Available
        </div>
        <div className="cal-legend-item">
          <div className="cal-legend-swatch cal-legend-swatch--booked" />
          Booked
        </div>
        <div className="cal-legend-item">
          <div className="cal-legend-swatch cal-legend-swatch--today" />
          Today
        </div>
      </div>
    </div>
  )
}
