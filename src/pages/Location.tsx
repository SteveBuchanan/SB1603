import { MapPin } from 'lucide-react'

const ATTRACTIONS = [
  { name: 'Gulf of Mexico beach access', distance: 'Steps away' },
  { name: 'Pier Park (shopping & dining)', distance: '~1 mile' },
  { name: 'Local restaurants and shops', distance: 'Nearby' },
]

export default function Location() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Location</h1>

      <div className="mb-6 flex items-center justify-center gap-2 text-gray-600">
        <MapPin size={20} className="text-primary" />
        <span>Panama City Beach, FL</span>
      </div>

      <div className="mb-8 overflow-hidden rounded-2xl shadow-md">
        <div className="relative aspect-video w-full">
          <iframe
            title="Map of Panama City Beach, FL"
            src="https://www.google.com/maps?q=Panama+City+Beach,+FL&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      <ul className="space-y-3">
        {ATTRACTIONS.map(({ name, distance }) => (
          <li
            key={name}
            className="flex items-center justify-between rounded-xl bg-white px-5 py-4 shadow-sm"
          >
            <span className="text-gray-700">{name}</span>
            <span className="text-sm font-medium text-primary">{distance}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
