import { Link } from 'react-router-dom'
import { heroImage } from '../data/images'

export default function HeroSection() {
  return (
    <section className="relative h-[50vh] w-full lg:h-[70vh]">
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-12">
        <p className="mb-1 text-sm font-medium uppercase tracking-wide text-sand">
          Panama City Beach, FL · Beachfront
        </p>
        <h1 className="text-3xl font-bold lg:text-5xl">Sterling Breeze Condos</h1>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/calendar"
            className="rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-primary-dark"
          >
            Check Availability
          </Link>
          <Link
            to="/gallery"
            className="rounded-xl border border-white/70 px-5 py-2.5 font-medium text-white transition-colors hover:bg-white/10"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
