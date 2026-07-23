export type ImageCategory = 'exterior' | 'interior' | 'amenity' | 'area'

export interface GalleryImage {
  src: string
  alt: string
  category: ImageCategory
}

const path = (file: string) => `/images/${file}`

export const heroImage: GalleryImage = {
  src: path('Building.jpg'),
  alt: 'Aerial view of the Sterling Breeze beachfront building and coastline',
  category: 'exterior',
}

export const galleryImages: GalleryImage[] = [
  heroImage,
  { src: path('Complex.jpg'), alt: 'Sterling Breeze condo complex viewed from the beach', category: 'exterior' },
  { src: path('sterling-breeze-unit-1603_26.jpg'), alt: 'Building lobby with gulf view', category: 'interior' },
  { src: path('Sunset.jpg'), alt: 'Sunset over the Gulf of Mexico', category: 'exterior' },
  { src: path('Patio Furniture.jpg'), alt: 'Balcony patio furniture with gulf view', category: 'exterior' },

  { src: path('Beach Out of Season.jpg'), alt: 'Quiet beach near the property', category: 'area' },
  { src: path('Pier Park 2.jpg'), alt: 'Pier Park shopping and dining', category: 'area' },
  { src: path('pier_park_1.jpg'), alt: 'Pier Park at Panama City Beach', category: 'area' },
  { src: path('IMG_0309.jpg'), alt: 'Beach umbrellas and water sports rentals', category: 'area' },

  { src: path('Living Room 1.jpg'), alt: 'Living room seating area', category: 'interior' },
  { src: path('Living Room 2.jpg'), alt: 'Living room with gulf-view balcony', category: 'interior' },
  { src: path('Master Bed.JPG'), alt: 'Master bedroom', category: 'interior' },
  { src: path('Master Bath 1.jpg'), alt: 'Master bathroom', category: 'interior' },
  { src: path('Master Bath 2.jpg'), alt: 'Master bathroom vanity', category: 'interior' },
  { src: path('Second Bath.jpg'), alt: 'Second bathroom', category: 'interior' },
  { src: path('Bunks.JPG'), alt: 'Bunk room', category: 'interior' },
  { src: path('Wine Bar area.jpg'), alt: 'Wine bar area', category: 'interior' },
  { src: path('IMG_7346.jpg'), alt: 'Living room with ocean-view balcony', category: 'interior' },
  { src: path('IMG_8529.JPG'), alt: 'Bunk nook with beach-themed decor', category: 'interior' },
  { src: path('IMG_8574.JPG'), alt: 'Kitchen with breakfast bar seating', category: 'interior' },

  { src: path('Pool 3.jpg'), alt: 'Community pool', category: 'amenity' },
  { src: path('pool hot tub.jpg'), alt: 'Pool and hot tub area', category: 'amenity' },
  { src: path('GYM.jpg'), alt: 'Fitness center', category: 'amenity' },
  { src: path('Grill.jpg'), alt: 'Outdoor grill area', category: 'amenity' },
  { src: path('Fire Pit 2.jpg'), alt: 'Outdoor fire pit', category: 'amenity' },
  { src: path('Laundry.jpg'), alt: 'In-unit laundry', category: 'amenity' },
]
