import { Link } from 'react-router-dom'
import { BedDouble, Bath, Users, Waves } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import { galleryImages } from '../data/images'

const STATS = [
  { icon: BedDouble, value: '2', label: 'Bedrooms' },
  { icon: Bath, value: '2', label: 'Bathrooms' },
  { icon: Users, value: '6', label: 'Guests' },
  { icon: Waves, value: 'Beachfront', label: 'Gulf Views' },
]

const TEASER_IMAGES = galleryImages.slice(1, 4)

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="grid grid-cols-2 divide-x divide-sand-dark/30 border-b border-sand-dark/30 bg-white lg:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 py-6 text-center">
            <Icon size={22} className="text-primary" />
            <span className="text-lg font-bold text-gray-800">{value}</span>
            <span className="text-sm text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      <section className="mx-auto max-w-3xl px-6 py-10 text-center text-gray-700">
        <p>
          Wake up to Gulf views at Sterling Breeze Condos, a beachfront getaway in the
          heart of Panama City Beach. This 2-bedroom, 2-bath condo sleeps up to six and
          puts you steps from the sand, with Pier Park's shops and restaurants just a
          short drive away.
        </p>
        <p className="mt-4">
          Enjoy the on-site pool and hot tub, a fully equipped kitchen, and a private
          balcony overlooking the water — everything you need for a relaxed coastal
          escape.
        </p>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {TEASER_IMAGES.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="aspect-video w-full rounded-2xl object-cover shadow-md"
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/gallery" className="font-medium text-primary hover:underline">
            View All Photos →
          </Link>
        </div>
      </section>
    </>
  )
}
