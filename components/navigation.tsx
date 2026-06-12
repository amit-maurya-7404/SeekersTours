'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    // { label: 'Home', href: '/' },
    { label: 'Weekend Getaways', href: '/weekend-getaways' },
    { label: 'Domestic Trips', href: '/domestic-trips' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group">
            <img src="/images/LOGO2.png" alt="Seekers Tours Logo" className="w-12 md:w-14 h-12 md:h-14 object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className="font-logo font-bold text-lg md:text-xl text-primary tracking-[0.06em] group-hover:text-accent transition-colors duration-300">
              Seekers Tours
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground/90 hover:text-accent transition-colors duration-300 text-sm font-semibold tracking-wide relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/domestic-trips">
              <button className="px-6 py-2.5 bg-accent text-accent-foreground rounded-xl font-bold hover:bg-accent/90 shadow-[0_4px_15px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_25px_rgba(239,68,68,0.25)] hover:scale-[1.03] transition-all duration-300">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 md:hidden border-b border-border/30 bg-card/95 backdrop-blur-lg shadow-2xl rounded-b-2xl"
            >
              <div className="px-6 py-6 space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 text-foreground hover:bg-accent/10 hover:text-accent rounded-xl transition-all duration-200 text-sm font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link href="/domestic-trips" onClick={() => setIsOpen(false)} className="block w-full">
                    <button className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-xl font-bold hover:bg-accent/90 shadow-[0_4px_15px_rgba(239,68,68,0.15)] transition-all duration-200">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
