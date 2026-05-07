'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Search, Menu, X, User, Ticket, Store, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Button } from './ui/Button'
import { useCartStore } from '@/store/cart'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events', icon: Ticket },
  { href: '/marketplace', label: 'Marketplace', icon: Store },
  { href: '/chat', label: 'Messages', icon: MessageCircle },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const cartCount = useCartStore((state) => state.getItemCount())
  const { user } = useUser()

  const mounted = true

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f23]/95 backdrop-blur-md border-b border-[#2d2d44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e94560] to-[#ff6b8a] flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-heading font-bold text-xl text-white hidden sm:block">
                Dzaleka Business
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-[#e94560] text-white'
                      : 'text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e]'
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/cart" className="relative p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e94560] rounded-full text-xs font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <UserButton />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="hidden sm:block">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="hidden sm:block">Get Started</Button>
                </SignUpButton>
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e] transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="pb-4 animate-slide-up">
            <form action="/search" method="GET" className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search products, events..."
                className="flex-1 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg px-4 py-2.5 text-white placeholder-[#64748b] focus:outline-none focus:border-[#e94560]"
                autoFocus
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-[#e94560] text-white'
                      : 'text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e]'
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e]"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart ({cartCount})
              </Link>
              {user ? (
                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e]">
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <div className="flex gap-2 mt-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="flex-1">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="flex-1">
                      Get Started
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}