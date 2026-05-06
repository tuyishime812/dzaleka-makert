'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone, Globe, Send, MessageCircle } from 'lucide-react'

const footerLinks = {
  marketplace: [
    { href: '/marketplace', label: 'Browse Products' },
    { href: '/events', label: 'Event Tickets' },
    { href: '/search', label: 'Search' },
    { href: '/categories', label: 'Categories' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
  ],
  support: [
    { href: '/help', label: 'Help Center' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
}

const socialLinks = [
  { href: '#', icon: Globe, label: 'Website' },
  { href: '#', icon: Send, label: 'Telegram' },
  { href: '#', icon: MessageCircle, label: 'Discord' },
]

export function Footer() {
  return (
    <footer className="bg-[#0f0f23] border-t border-[#2d2d44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e94560] to-[#ff6b8a] flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Dzaleka Business
              </span>
            </Link>
            <p className="text-[#94a3b8] text-sm mb-4">
              Your premier marketplace for event tickets and unique products.
              Discover, connect, and transact with ease.
            </p>
            <div className="space-y-2 text-sm text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Dzaleka, Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>dzalekabusiness@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+265990342825</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Marketplace</h4>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94a3b8] hover:text-[#e94560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94a3b8] hover:text-[#e94560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94a3b8] hover:text-[#e94560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94a3b8] hover:text-[#e94560] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-[#2d2d44]">
          <p className="text-sm text-[#94a3b8]">
            &copy; {new Date().getFullYear()} Dzaleka Business. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e] transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}