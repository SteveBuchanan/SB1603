# Sterling Breeze Condos — Website Requirements

## Project Overview

Build a modern, mobile-friendly vacation rental website for **Sterling Breeze Condos - Panama City Beach** using React, TypeScript, and Tailwind CSS. The design should evoke a clean beach aesthetic with a look and feel inspired by VRBO.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18+ with TypeScript |
| Styling | Tailwind CSS |
| Bundler | Vite |
| Routing | React Router v6 |
| Carousel | Embla Carousel or Swiper.js |
| Icons | Heroicons or Lucide React |

---

## Branding

- **Site Title**: Sterling Breeze Condos — Panama City Beach
- **Logo**: Text-based logo using site title; include a small wave or palm tree SVG icon
- **Color Palette**: Coastal blues, sandy beige, white, with teal accent
- **Typography**: Clean sans-serif (e.g., Inter or Nunito)
- **Tone**: Warm, welcoming, vacation-ready — consistent with VRBO aesthetic

---

## Layout & Navigation

### Sidebar Navigation
- Positioned on the **left side** of the page on desktop
- **Collapsible**: Toggled via a hamburger/menu icon
- On mobile: sidebar slides in as an overlay drawer
- Navigation links:
  - Home
  - Gallery
  - Amenities
  - Availability / Calendar
  - Location
  - Contact

### Page Layout
- Desktop: sidebar (fixed left) + main content area (right)
- Mobile: top bar with menu icon that opens the sidebar as a full-height drawer
- All pages should be mobile-first responsive

---

## Pages & Sections

### 1. Home / Landing Page
- Hero section with a full-width banner image (use `sterling-breeze-unit-1603_26.jpg` or `Sunset.jpg`)
- Property headline and short description
- Highlight cards: bedrooms, bathrooms, max guests, beachside location
- Call-to-action buttons: "Check Availability" and "View Gallery"

### 2. Gallery
- Full-page image carousel control
- Images sourced from the `images/` folder (see Image Inventory below)
- Carousel should support:
  - Previous / Next arrow controls
  - Dot/thumbnail navigation
  - Touch/swipe on mobile
  - Auto-play with pause-on-hover
- Optionally group images into tabs: **Exterior**, **Interior**, **Area**

### 3. Amenities
- Grid layout listing condo amenities
- Icons for each amenity
- Examples: Pool, Hot Tub, Gym, Grill, Fire Pit, Laundry, Bunk Room, Patio, Wine Bar, Beachside

### 4. Availability / Calendar
- Section heading: "Check Availability"
- Has its own dedicated page/route and is its own component, sized larger than an
  inline embed so the two-month grid is easy to read. Parses the property's VRBO
  ICS feed directly rather than embedding a Google Calendar iframe — see
  [REQUIREMENTS.md](REQUIREMENTS.md) for the full spec (CORS constraint, the
  GoDaddy PHP proxy, parsing approach).

### 5. Location
- Section heading: "Location"
- Property address block: Panama City Beach, FL
- Nearby attractions list with distances:
  - Pier Park (~1 mile)
  - Gulf of Mexico beach access (steps away)
  - Local restaurants and shops
- Optional: embedded Google Maps iframe for the area

### 6. Contact
- Simple contact form: Name, Email, Phone, Message, Dates of Interest
- Alternatively link to VRBO/Airbnb listing
- Phone and email displayed prominently

---

## Image Inventory

All images are located in `public/images/` and categorized in
[`src/data/images.ts`](../src/data/images.ts):

| File | Category |
|---|---|
| `sterling-breeze-unit-1603_26.jpg` | Exterior / Hero |
| `Building.jpg` | Exterior |
| `Complex.jpg` | Exterior |
| `Sunset.jpg` | Exterior / Atmosphere |
| `Beach Out of Season.jpg` | Area |
| `Pier Park 2.jpg` | Area |
| `pier_park_1.jpg` | Area |
| `Living Room 1.jpg` | Interior |
| `Living Room 2.jpg` | Interior |
| `Master Bed.JPG` | Interior |
| `Master Bath 1.jpg` | Interior |
| `Master Bath 2.jpg` | Interior |
| `Second Bath.jpg` | Interior |
| `Bunks.JPG` | Interior |
| `Wine Bar area.jpg` | Interior |
| `Patio Furniture.jpg` | Interior / Exterior |
| `Pool 3.jpg` | Amenity |
| `pool hot tub.jpg` | Amenity |
| `GYM.jpg` | Amenity |
| `Grill.jpg` | Amenity |
| `Fire Pit 2.jpg` | Amenity |
| `Laundry.jpg` | Amenity |
| `IMG_0309.jpg` | Area |
| `IMG_7346.jpg` | Interior |
| `IMG_8529.JPG` | Interior |
| `IMG_8574.JPG` | Interior |

`IMG_7690.jpg` is excluded from the site — it's a photo of an unrelated event
ticket, not a property photo.

---

## Component Architecture

```
src/
├── components/
│   ├── Sidebar.tsx          # Collapsible sidebar navigation
│   ├── TopBar.tsx           # Mobile-only top bar
│   ├── Layout.tsx           # Page wrapper with sidebar + content
│   ├── ImageCarousel.tsx    # Carousel component
│   ├── HeroSection.tsx      # Landing page hero
│   ├── AmenityGrid.tsx      # Amenities display
│   ├── CalendarEmbed.tsx    # Availability calendar (own page, see REQUIREMENTS.md)
│   └── ContactForm.tsx      # Contact section
├── pages/
│   ├── Home.tsx
│   ├── Gallery.tsx
│   ├── Amenities.tsx
│   ├── Calendar.tsx
│   ├── Location.tsx
│   └── Contact.tsx
├── data/
│   └── images.ts            # Image inventory with category metadata
└── App.tsx
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Sidebar hidden; hamburger icon in top bar opens overlay drawer |
| Tablet (768px–1023px) | Sidebar collapses to icon-only rail |
| Desktop (1024px+) | Full sidebar visible with labels |

---

## Design Details

- **VRBO-inspired**: Property stats bar (beds, baths, guests), clean white cards, large imagery
- **Beach theme**: Use ocean blue (`#0077B6`), sand (`#F4A261`), and white backgrounds
- **Cards**: Rounded corners, subtle drop shadows
- **Buttons**: Solid teal/blue primary; ghost secondary
- **Transitions**: Smooth sidebar open/close animation (200–300ms)
- **Accessibility**: Aria labels on nav, buttons, and carousel controls
