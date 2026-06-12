'use client'

import { Navigation } from '@/components/navigation'
import { About } from '@/components/about'
import { CTASection } from '@/components/cta-section'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <Navigation />

      {/* Sub-hero page banner */}
      <div className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=400&fit=crop"
            alt="About Us Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">About Seekers Tours</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Discover our story, our team, and the core values that guide our unforgettable journeys.
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <About />
        <CTASection variant="primary" />
        <Testimonials />
      </div>

      <Footer />
    </main>
  )
}
