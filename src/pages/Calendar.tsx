import { Link } from 'react-router-dom'
import CalendarEmbed from '../components/CalendarEmbed'

export default function Calendar() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">Check Availability</h1>
      <p className="mb-6 text-center text-gray-500">
        Green days are open, red days are already booked.
      </p>

      <CalendarEmbed />

      <p className="mt-6 text-center text-gray-600">
        Ready to book, or have a question about dates?{' '}
        <Link to="/contact" className="font-medium text-primary hover:underline">
          Get in touch
        </Link>
        .
      </p>
    </div>
  )
}
