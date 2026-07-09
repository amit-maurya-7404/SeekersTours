'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Star, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SAMPLE_TRIPS, type Trip } from '@/lib/trips'

interface TripCardsProps {
  selectedCategory: string
  selectedDifficulty: string
  searchQuery: string
  tripType?: 'weekend' | 'domestic'
}

export function TripCards({ selectedCategory, selectedDifficulty, searchQuery, tripType }: TripCardsProps) {
  const filteredTrips = SAMPLE_TRIPS.filter((trip) => {
    const typeMatch = !tripType || trip.type === tripType
    const categoryMatch = selectedCategory === 'All' || trip.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'All' || trip.difficulty === selectedDifficulty
    const searchMatch = !searchQuery || 
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase())
    return typeMatch && categoryMatch && difficultyMatch && searchMatch
  })

  const containerVariants: Variants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex overflow-x-auto pb-6 gap-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
    >
      {filteredTrips.map((trip) => (
        <div key={trip.id} className="w-[85vw] sm:w-[350px] md:w-auto shrink-0 snap-center">
          <TripCard trip={trip} />
        </div>
      ))}
    </motion.div>
  )
}

export function TripCard({ trip }: { trip: Trip }) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <Link href={`/trip/${trip.id}`} className="block no-underline h-full">
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -6 }}
        className="group bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-accent/40 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(239,68,68,0.12)] transition-all duration-300 cursor-pointer h-full flex flex-col justify-between"
        role="article"
      >
        <div>
          {/* Image Container */}
          <div className="relative h-52 overflow-hidden bg-muted">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-85" />
            
            {/* Category Badge */}
            <span className="absolute top-3.5 left-3.5 bg-black/45 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest">
              {trip.category}
            </span>

            {/* Difficulty Badge */}
            <span className="absolute top-3.5 right-3.5 bg-accent/90 text-accent-foreground px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
              {trip.difficulty}
            </span>

            {/* Price Tag Overlay */}
            <div className="absolute bottom-3.5 right-3.5 bg-black/60 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
              <span className="text-[9px] font-normal text-white/60">From</span>
              <span className="text-accent">₹{trip.price}</span>
            </div>
          </div>

          {/* Card Details */}
          <div className="p-5">
            <div className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-wider mb-1.5">
              <MapPin size={10} />
              <span>{trip.destination}</span>
            </div>

            <h3 className="text-base font-bold text-card-foreground tracking-tight line-clamp-1 group-hover:text-accent transition-colors duration-300">
              {trip.title}
            </h3>

            {/* Short description snippet */}
            <p className="text-xs text-muted-foreground/85 line-clamp-2 mt-2 leading-relaxed font-medium">
              {trip.description}
            </p>
          </div>
        </div>

        {/* Footer row (Rating & Duration metadata) */}
        <div className="px-5 pb-5 pt-0">
          <div className="flex items-center justify-between border-t border-border/40 pt-4 text-xs">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-accent text-accent" />
              <span className="font-bold text-card-foreground">{trip.rating}</span>
              <span className="text-muted-foreground text-[10px] font-medium ml-0.5">({trip.reviews})</span>
            </div>

            {/* Duration & CTA Trigger */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground/90 bg-muted/65 px-2 py-0.5 rounded-md border border-border/20">{trip.duration} Days</span>
              <div className="flex items-center text-accent font-bold gap-0.5 group-hover:translate-x-1 transition-transform duration-300">
                <span className="text-[10px] uppercase tracking-wider ml-1">Explore</span>
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
