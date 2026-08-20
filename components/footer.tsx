'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer className="bg-gradient-to-b from-primary via-primary/95 to-primary/90 text-primary-foreground pt-24 pb-12 border-t border-border/10 relative overflow-hidden">
      {/* Footer background glows */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand Column */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img src="/images/LOGO2.png" alt="Seekers Tours Logo" className="w-12 h-12 object-contain" />
              <h3 className="text-2xl font-bold font-logo tracking-[0.06em] text-white">Seekers Tours</h3>
            </div>
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-sm">
              We design and curate unforgettable adventures across India&apos;s most beautiful landscapes, from pristine lakes to high mountain passes.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {[
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Instagram, href: 'https://instagram.com/seekers_tours', label: 'Instagram' },
                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-white/5 hover:bg-accent border border-white/10 hover:border-accent flex items-center justify-center rounded-xl text-primary-foreground/80 hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:col-start-6 text-center md:text-left">
            <h4 className="text-[6vw] md:text-[1.5vw] font-bold uppercase tracking-wider text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Weekend Getaways', href: '/weekend-getaways' },
                { label: 'Domestic Trips', href: '/domestic-trips' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-block text-primary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-300 text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Destinations */}
          <motion.div variants={itemVariants} className="md:col-span-2 text-center md:text-left">
            <h4 className="text-[6vw] md:text-[1.5vw] font-bold uppercase tracking-wider text-white mb-6">Popular</h4>
            <ul className="space-y-3">
              {[
                'Himalayan Road Trips',
                'Mountain Trekking',
                'Beach Getaways',
                'Cultural Tours',
                'Adventure Sports'
              ].map((dest) => (
                <li key={dest}>
                  <a href="#" className="inline-block text-primary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-300 text-sm font-medium">
                    {dest}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-3 text-center md:text-left">
            <h4 className="text-[6vw] md:text-[1.5vw] font-bold uppercase tracking-wider text-white mb-6">Contact Us</h4>
            <ul className="inline-flex flex-col space-y-4 text-left">
              <li className="flex flex-row items-center gap-3.5 text-sm justify-start">
                <div className="h-10 w-10 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent border border-accent/30 flex items-center justify-center rounded-xl text-accent flex-shrink-0 shadow-md shadow-black/10">
                  <Phone size={18} className="text-white" />
                </div>
                <div className="pt-1">
                  <p className="text-[10px] text-primary-foreground/50 font-bold uppercase tracking-wider">Call</p>
                  <span className="font-semibold text-primary-foreground/85">+91 83692 18944</span>
                </div>
              </li>
              <li className="flex flex-row items-center gap-3.5 text-sm justify-start">
                <div className="h-10 w-10 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent border border-accent/30 flex items-center justify-center rounded-xl text-accent flex-shrink-0 shadow-md shadow-black/10">
                  <Mail size={18} className="text-white" />
                </div>
                <div className="pt-1">
                  <p className="text-[10px] text-primary-foreground/50 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:info@seekerstours.com" className="font-semibold text-primary-foreground/85 hover:text-accent transition-colors">
                    info@seekerstours.com
                  </a>
                </div>
              </li>
              <li className="flex flex-row items-start gap-3.5 text-sm justify-start">
                <div className="h-10 w-10 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent border border-accent/30 flex items-center justify-center rounded-xl text-accent flex-shrink-0 mt-1 shadow-md shadow-black/10">
                  <MapPin size={18} className="text-white" />
                </div>
                <div className="pt-1 max-w-[220px] sm:max-w-xs md:max-w-none">
                  <p className="text-[10px] text-primary-foreground/50 font-bold uppercase tracking-wider">Visit</p>
                  <span className="font-semibold text-primary-foreground/85">123 Adventure Lane, Fort, Mumbai, MH 400001</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="border-t border-white/10 my-8" />

        {/* Bottom Footer */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
        >
          <p className="text-primary-foreground/60 font-medium order-2 md:order-1">
            © {new Date().getFullYear()} Seekers Tours. All rights reserved.
          </p>
          <div className="flex gap-6 font-medium order-1 md:order-2">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Cookies
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground/60 font-medium order-3">
            <span>Made with</span>
            <Heart size={14} className="text-accent fill-accent animate-pulse" />
            <span>
              by{' '}
              <a
                href="https://wa.me/919137290903"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors underline underline-offset-2 decoration-dotted cursor-pointer"
              >
                Amit Maurya (+91 91372 90903)
              </a>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
