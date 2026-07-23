import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '../data/images'

interface ImageCarouselProps {
  images: GalleryImage[]
}

const AUTOPLAY_MS = 5000

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, images.length])

  if (images.length === 0) return null

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setIndex((i) => (i + 1) % images.length)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) {
      if (delta > 0) goPrev()
      else goNext()
    }
    touchStartX.current = null
  }

  const current = images[index]
  const thumbnails = images.slice(0, 6)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label="Property photos"
      className="outline-none"
    >
      <div className="relative">
        <img
          src={current.src}
          alt={current.alt}
          className="aspect-video w-full rounded-2xl object-cover shadow-md"
        />

        <button
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? 'bg-primary' : 'bg-sand-dark'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 hidden justify-center gap-2 lg:flex">
        {thumbnails.map((img, i) => (
          <button key={img.src} onClick={() => setIndex(i)} aria-label={`Jump to photo ${i + 1}`}>
            <img
              src={img.src}
              alt=""
              className={`h-12 w-16 rounded-lg object-cover ${
                i === index ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
