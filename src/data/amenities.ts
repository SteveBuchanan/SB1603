import {
  Waves,
  Flame,
  Dumbbell,
  UtensilsCrossed,
  WashingMachine,
  BedDouble,
  Sofa,
  Wine,
  Umbrella,
  Wifi,
  ChefHat,
  Bath,
  type LucideIcon,
} from 'lucide-react'

export interface Amenity {
  label: string
  icon: LucideIcon
}

export const amenities: Amenity[] = [
  { label: 'Pool', icon: Waves },
  { label: 'Hot Tub', icon: Bath },
  { label: 'Gym', icon: Dumbbell },
  { label: 'Grill', icon: UtensilsCrossed },
  { label: 'Fire Pit', icon: Flame },
  { label: 'Laundry', icon: WashingMachine },
  { label: 'Bunk Room', icon: BedDouble },
  { label: 'Patio', icon: Sofa },
  { label: 'Wine Bar', icon: Wine },
  { label: 'Beachfront', icon: Umbrella },
  { label: 'Free WiFi', icon: Wifi },
  { label: 'Full Kitchen', icon: ChefHat },
]
