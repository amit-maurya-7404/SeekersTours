'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { Star, MapPin, Clock, DollarSign, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { SAMPLE_TRIPS, type Trip, TripCard } from '@/components/trip-cards'
import { ItineraryModal } from '@/components/itinerary-modal'
import { BookingModal } from '@/components/booking-modal'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { Gallery } from '@/components/gallery'
import { Contact } from '@/components/contact'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Page() {

  const weekendTrips = SAMPLE_TRIPS.filter((t) => t.type === 'weekend')
  const domesticTrips = SAMPLE_TRIPS.filter((t) => t.type === 'domestic')

  const weekendScrollRef = useRef<HTMLDivElement>(null)
  const domesticScrollRef = useRef<HTMLDivElement>(null)

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current
      const firstCard = container.firstElementChild as HTMLElement
      const cardWidth = firstCard ? firstCard.offsetWidth : 350
      const gap = 24 // gap-6 is 24px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap)
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollWeekend = (direction: 'left' | 'right') => {
    scrollContainer(weekendScrollRef, direction)
  }

  const scrollDomestic = (direction: 'left' | 'right') => {
    scrollContainer(domesticScrollRef, direction)
  }

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


  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <Hero />

      {/* Weekend Getaways Section */}
      <section className="py-20 bg-background border-b border-border/40 overflow-visible relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
              Quick Escapes
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Weekend Getaways
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Lush monsoon Sahyadri treks, lakeside camping, and quick weekend getaways in Maharashtra.
            </p>
          </div>

          {/* Cards Carousel on all viewports */}
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollWeekend('left')}
              className="absolute -left-5 lg:-left-14 top-1/2 -translate-y-[calc(50%+12px)] z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-white hover:text-accent dark:hover:bg-white dark:hover:text-accent border border-accent shadow-lg hover:shadow-accent/25 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={24} className="stroke-[2.5]" />
            </button>

            <motion.div
              ref={weekendScrollRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex overflow-x-auto pb-6 gap-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar scroll-smooth md:mx-0 md:px-0"
            >
              {weekendTrips.map((trip) => (
                <div key={trip.id} className="w-[85vw] sm:w-[340px] md:w-[calc((100%-48px)/3)] shrink-0 snap-center">
                  <TripCard trip={trip} />
                </div>
              ))}
            </motion.div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollWeekend('right')}
              className="absolute -right-5 lg:-right-14 top-1/2 -translate-y-[calc(50%+12px)] z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-white hover:text-accent dark:hover:bg-white dark:hover:text-accent border border-accent shadow-lg hover:shadow-accent/25 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight size={24} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Explore All Button */}
          <div className="mt-14 text-center">
            <Link href="/weekend-getaways">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold hover:bg-accent/90 transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.25)] hover:scale-105">
                Explore All Weekend Getaways
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Domestic Trips Section */}
      <section className="py-20 bg-card overflow-visible relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
              Pan-India Expeditions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">
              Domestic Trips
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Explore the magic of India: high Himalayan passes, tropical island escapes, and heritage backpacking tours.
            </p>
          </div>

          {/* Cards Carousel on all viewports */}
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollDomestic('left')}
              className="absolute -left-5 lg:-left-14 top-1/2 -translate-y-[calc(50%+12px)] z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-white hover:text-accent dark:hover:bg-white dark:hover:text-accent border border-accent shadow-lg hover:shadow-accent/25 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={24} className="stroke-[2.5]" />
            </button>

            <motion.div
              ref={domesticScrollRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex overflow-x-auto pb-6 gap-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar scroll-smooth md:mx-0 md:px-0"
            >
              {domesticTrips.map((trip) => (
                <div key={trip.id} className="w-[85vw] sm:w-[340px] md:w-[calc((100%-48px)/3)] shrink-0 snap-center">
                  <TripCard trip={trip} />
                </div>
              ))}
            </motion.div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollDomestic('right')}
              className="absolute -right-5 lg:-right-14 top-1/2 -translate-y-[calc(50%+12px)] z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-white hover:text-accent dark:hover:bg-white dark:hover:text-accent border border-accent shadow-lg hover:shadow-accent/25 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight size={24} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Explore All Button */}
          <div className="mt-14 text-center">
            <Link href="/domestic-trips">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-foreground border-2 border-border hover:border-accent/40 rounded-xl font-bold hover:bg-card transition-all duration-300 hover:scale-105">
                Explore All Domestic Trips
                <ArrowRight size={18} className="text-accent" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section Teaser */}
      {/* <About />
      <div className="bg-card pb-16 text-center">
        <Link href="/about">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105">
            Read Our Full Story
            <ArrowRight size={20} />
          </button>
        </Link>
      </div> */}

      <Testimonials layout="carousel" />

      <Gallery layout="carousel" />

      <CTASection variant="primary" />



      {/* <CTASection variant="secondary" /> */}

      {/* Contact Section Teaser */}
      {/* <Contact /> */}

      <Footer />

    </main>
  )
}
