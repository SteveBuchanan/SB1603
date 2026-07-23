import { useState, type FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  guests: string
  message: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    // No backend is wired up yet — this just confirms the form was filled out
    // correctly. Submitting an inquiry for real needs a mail-sending endpoint
    // (e.g. a small PHP script alongside api/calendar.php) to relay it.
    setSubmitted(true)
  }

  function handleCancel() {
    setForm(EMPTY_FORM)
    setErrors({})
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-md">
        <p className="text-lg font-semibold text-gray-800">Thanks for reaching out!</p>
        <p className="mt-2 text-gray-600">We'll get back to you about your stay soon.</p>
        <button
          onClick={() => {
            setSubmitted(false)
            handleCancel()
          }}
          className="mt-4 font-medium text-primary hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-sand-dark/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-md lg:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={inputClass}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="guests" className="mb-1 block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <select
            id="guests"
            className={inputClass}
            value={form.guests}
            onChange={(e) => update('guests', e.target.value)}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="checkIn" className="mb-1 block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            id="checkIn"
            type="date"
            className={inputClass}
            value={form.checkIn}
            onChange={(e) => update('checkIn', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="mb-1 block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            id="checkOut"
            type="date"
            className={inputClass}
            value={form.checkOut}
            onChange={(e) => update('checkOut', e.target.value)}
          />
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className={inputClass}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Send Inquiry
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-xl border border-sand-dark/40 px-5 py-2.5 font-medium text-gray-600 hover:bg-sand/10"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
