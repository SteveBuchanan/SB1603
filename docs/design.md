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
- Embedded Google Calendar iframe:
