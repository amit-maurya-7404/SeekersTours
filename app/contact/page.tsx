'use client'

import { Navigation } from '@/components/navigation'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <Navigation />

      {/* Sub-hero page banner */}
      <div className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=400&fit=crop"
            alt="Contact Us Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Have questions or want to plan a custom adventure? We are here to help you every step of the way.
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
