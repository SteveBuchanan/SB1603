import { Menu } from 'lucide-react'

interface TopBarProps {
  onOpenMenu: () => void
}

export default function TopBar({ onOpenMenu }: TopBarProps) {
  return (
    <header className="flex items-center gap-3 bg-primary px-4 py-3 text-white lg:hidden">
      <button
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="rounded-lg p-1.5 hover:bg-white/10"
      >
        <Menu size={22} />
      </button>
      <span className="font-semibold">Sterling Breeze Condos</span>
    </header>
  )
}
