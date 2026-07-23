import { amenities } from '../data/amenities'

export default function AmenityGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {amenities.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-md"
        >
          <Icon size={48} className="text-primary" />
          <span className="font-medium text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  )
}
