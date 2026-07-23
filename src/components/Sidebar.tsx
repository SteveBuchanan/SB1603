import { NavLink } from 'react-router-dom'
import { Home, Images, ListChecks, CalendarDays, MapPin, Mail, ChevronLeft, Waves } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/gallery', label: 'Gallery', icon: Images },
  { to: '/amenities', label: 'Amenities', icon: ListChecks },
  { to: '/calendar', label: 'Availability', icon: CalendarDays },
  { to: '/location', label: 'Location', icon: MapPin },
  { to: '/contact', label: 'Contact', icon: Mail },
]

interface SidebarProps {
  collapsed: boolean
  onToggleCollapsed: () => void
  onNavigate?: () => void
}

export default function Sidebar({ collapsed, onToggleCollapsed, onNavigate }: SidebarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={`flex h-full flex-col bg-primary text-white transition-[width] duration-200 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <Waves size={24} className="shrink-0" />
        {!collapsed && (
          <span className="font-semibold leading-tight">Sterling Breeze Condos</span>
        )}
      </div>

      <ul className="flex-1 space-y-1 px-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-white/10 ${
                  isActive ? 'border-l-4 border-accent bg-white/15 pl-2' : ''
                }`
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        onClick={onToggleCollapsed}
        className="hidden items-center justify-center gap-2 border-t border-white/10 py-4 hover:bg-white/10 lg:flex"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft
          size={18}
          className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
        />
        {!collapsed && <span className="text-sm">Collapse</span>}
      </button>
    </nav>
  )
}
