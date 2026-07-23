# Requirements

## Availability Calendar

Display a two-month availability calendar sourced from the property's VRBO
booking calendar, showing which days are booked vs. available.

### Functional requirements

Contained in the images file are images for my condo rental website.  Make the home page wallpaper be on of the images of the beachside building.

The calendar should be its own componet and have its own page with the sizing of the calendar to make it easy to see.

- Fetch and parse the ICS feed at:
  `https://www.vrbo.com/icalendar/e093697f12a04b218d199a606fcd2d3b.ics?nonTentative&includeTentative=true`
- Render two adjacent month grids (current month + next), each showing:
  - Days before today: greyed out, not clickable
  - Booked days: red background, strikethrough
  - Available days: green background
  - Today: highlighted with a ring
- Prev/next navigation between month pairs; "prev" is disabled once the
  current month is reached (no browsing into the past)
- A legend below the grids explaining the color coding
- Loading and error states while the feed is being fetched

Implemented in [`src/components/CalendarEmbed.tsx`](../src/components/CalendarEmbed.tsx),
rendered into [`src/App.tsx`](../src/App.tsx). Parsing (`parseICS`) is hand-rolled
regex over the raw ICS text — no calendar library:
- Un-folds RFC 5545 line-folding before parsing
- Splits on `BEGIN:VEVENT`, extracts `DTSTART`/`DTEND` (`YYYYMMDD`) per event
- A day is "booked" if it falls in `[start, end)` of any event — the `end`
  date itself (checkout day) is not booked, matching how VRBO exports it

### Technical constraint: CORS

VRBO's ICS endpoint does not send an `Access-Control-Allow-Origin` header,
so the browser refuses to let page JavaScript read the response body when
fetched cross-origin. The feed must be fetched server-side and relayed to
the browser from the same origin as the site.

### Production hosting: GoDaddy

The site deploys to GoDaddy shared (cPanel) hosting, which runs PHP but
does not run a persistent Node.js process on standard plans. The proxy is
therefore a plain PHP script rather than a Node/Express or serverless
function:

- [`api/calendar.php`](../api/calendar.php) — fetches the ICS URL server-side
  via `file_get_contents` and echoes the raw text with a
  `Content-Type: text/calendar` header and a 15-minute cache header (to
  avoid re-fetching from VRBO on every page load)
- Deploy by uploading the `dist/` build output plus `api/calendar.php` to
  `public_html/` (so the script ends up at `public_html/api/calendar.php`)
- `CalendarEmbed.tsx` fetches from `/api/calendar.php`

### Local development

Vite's dev server does not execute PHP, so `vite.config.ts` defines a
`server.proxy` entry that forwards the same `/api/calendar.php` path
directly to the VRBO ICS URL while running `npm run dev`. This mirrors
`api/calendar.php`'s behavior locally without needing a PHP runtime
installed for development — but note this proxy only exists in the dev
server; it has no effect on `vite build` output, which is why the PHP
script is required for the actual GoDaddy deployment.
