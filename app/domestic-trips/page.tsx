'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { TripCards } from '@/components/trip-cards'
import { Footer } from '@/components/footer'

function DomesticTripsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <Navigation />

      {/* Sub-hero page banner */}
      <div className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=400&fit=crop"
            alt="Domestic Trips Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <span className="inline-block px-3 py-1.5 bg-accent/25 backdrop-blur-md text-accent-foreground rounded-full text-xs font-semibold border border-accent/25 mb-4">
            🏔️ Breathtaking Indian Destinations
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">Domestic Trips</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            From snowy Himalayan peaks to golden beach horizons, explore the magical diversity of India.
          </p>
        </div>
      </div>

      {/* Trips Section */}
      <section className="py-16 md:py-24 bg-background flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TripCards 
            selectedCategory="All" 
            selectedDifficulty="All" 
            searchQuery={searchQuery}
            tripType="domestic"
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function DomesticTripsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground font-semibold">
        Loading adventures...
      </div>
    }>
      <DomesticTripsContent />
    </Suspense>
  )
}
