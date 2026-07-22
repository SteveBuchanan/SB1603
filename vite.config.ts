import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev-only stand-in for api/calendar.php (which GoDaddy serves in production).
      // Vite's Node process forwards this server-side, so CORS never applies.
      '/api/calendar.php': {
        target: 'https://www.vrbo.com',
        changeOrigin: true,
        rewrite: () =>
          '/icalendar/e093697f12a04b218d199a606fcd2d3b.ics?nonTentative&includeTentative=true',
      },
    },
  },
})
