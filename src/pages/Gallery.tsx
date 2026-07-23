import { useState } from 'react'
import ImageCarousel from '../components/ImageCarousel'
import { galleryImages, type ImageCategory } from '../data/images'

const TABS: { label: string; value: ImageCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Exterior', value: 'exterior' },
  { label: 'Interior', value: 'interior' },
  { label: 'Amenities', value: 'amenity' },
  { label: 'Area', value: 'area' },
]

export default function Gallery() {
  const [tab, setTab] = useState<ImageCategory | 'all'>('all')

  const filtered =
    tab === 'all' ? galleryImages : galleryImages.filter((img) => img.category === tab)

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Gallery</h1>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {TABS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === value ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-sand/20'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <ImageCarousel key={tab} images={filtered} />
    </div>
  )
}
