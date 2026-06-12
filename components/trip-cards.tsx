'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Star, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export interface Trip {
  id: string
  title: string
  destination: string
  image: string
  rating: number
  reviews: number
  duration: number
  price: number
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  category: string
  description: string
  highlights: string[]
  type: 'weekend' | 'domestic'
  availableDates: string[]
}

export const SAMPLE_TRIPS: Trip[] = [
  // Weekend Getaways (type: 'weekend') - Maharashtra Treks, Camping, Midnight Cycling
  {
    id: 'w1',
    title: 'Harihar Fort Trek',
    destination: 'Nashik, Maharashtra',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 154,
    duration: 1,
    price: 1399,
    difficulty: 'Challenging',
    category: 'Hiking',
    description: 'Experience the thrill of climbing the near-vertical 117 rock-cut steps of Harihar Fort in Nashik. Witness historic caves, a summit temple, and spectacular surrounding views of the Sahyadri mountains.',
    highlights: ['Iconic 117 Rock-cut Steps', 'Hanuman Temple Summit', 'Kasara Station pick-up', 'Local village lunch'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '21 Jun 2026', '27 Jun 2026', '28 Jun 2026']
  },
  {
    id: 'w2',
    title: 'Harishchandragad Peak Trek & Camp',
    destination: 'Ahmednagar, Maharashtra',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 210,
    duration: 2,
    price: 2499,
    difficulty: 'Challenging',
    category: 'Hiking',
    description: 'Trek to the ancient Harishchandragad fort, camp on the scenic plateau, and witness the awe-inspiring circular sunset view from Konkan Kada cliff.',
    highlights: ['Konkan Kada Sunset', 'Kedareshwar Cave', 'Plateau Tent Camping', 'Authentic Maharashtrian meals'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w3',
    title: 'Pawna Lake Stargazing Camping',
    destination: 'Lonavala, Maharashtra',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
    rating: 4.7,
    reviews: 98,
    duration: 2,
    price: 1799,
    difficulty: 'Easy',
    category: 'Nature',
    description: 'Relax by the scenic Pawna Lake. Enjoy cozy lakeside tents, live acoustic guitar music, barbecue, and stargazing sessions under a clear sky.',
    highlights: ['Lakeside Tent Stay', 'Live Acoustic Music', 'BBQ & Bonfire Night', 'Stargazing session'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '21 Jun 2026', '27 Jun 2026', '28 Jun 2026']
  },
  {
    id: 'w4',
    title: 'Rajmachi Fort Monsoon Trek',
    destination: 'Lonavala, Maharashtra',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop',
    rating: 4.6,
    reviews: 120,
    duration: 2,
    price: 1999,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Embark on a lush green monsoon trail to the historic twin forts of Shrivardhan and Manaranjan, surrounded by misty mountains and waterfalls.',
    highlights: ['Misty Waterfall Trails', 'Shrivardhan Fort Climb', 'Fireflies Sightseeing', 'Village Home-stay Dinner'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w5',
    title: 'Devkund Secret Waterfall Trek',
    destination: 'Bhira, Maharashtra',
    image: 'https://images.unsplash.com/photo-1596701062351-8a29937a8944?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 180,
    duration: 1,
    price: 1399,
    difficulty: 'Moderate',
    category: 'Nature',
    description: 'Hike through the dense green forests of Bhira Dam to find Devkund, a stunning hidden waterfall plunging into a turquoise blue pool.',
    highlights: ['Bhira Dam Trail walk', 'Dense Forest Hike', 'Turquoise Waterfall Pool', 'Local village breakfast'],
    type: 'weekend',
    availableDates: ['21 Jun 2026', '28 Jun 2026', '05 Jul 2026', '12 Jul 2026']
  },
  {
    id: 'w6',
    title: 'Kalsubai Peak Sunrise Trek',
    destination: 'Igatpuri, Maharashtra',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&h=400&fit=crop',
    reviews: 240,
    duration: 2,
    price: 1599,
    difficulty: 'Challenging',
    category: 'Hiking',
    description: 'Summit the Kalsubai Peak, the highest point in Maharashtra at 5,400 feet, and witness a magical sunrise above a thick blanket of clouds.',
    highlights: ['Highest Peak in Maharashtra', 'Summit Kalsubai Sunrise', 'Ladder Section climbing', 'Post-trek local breakfast'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w7',
    title: 'Bhandardara Lakeside Camping',
    destination: 'Igatpuri, Maharashtra',
    image: 'https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=600&h=400&fit=crop',
    rating: 4.5,
    reviews: 85,
    duration: 2,
    price: 1899,
    difficulty: 'Easy',
    category: 'Nature',
    description: 'Camp beside Arthur Lake in Bhandardara. Explore the grand Wilson Dam, ride boats in clear waters, and capture stargazing star trails.',
    highlights: ['Arthur Lake Camp Stay', 'Wilson Dam & Randha Falls', 'Lakeside Boating ride', 'Star Trails Photography'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w8',
    title: 'Sandhan Valley Trek & Camp',
    destination: 'Bhandardara, Maharashtra',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 165,
    duration: 2,
    price: 2499,
    difficulty: 'Challenging',
    category: 'Adventure',
    description: 'Explore the deep "Valley of Shadows" at Sandhan. Navigate massive boulder paths, experience rock rappelling, and camp overnight under starry skies.',
    highlights: ['45ft Rappelling Action', 'Valley of Shadows Hike', 'Lakeside Base Camping', 'Traditional Maharashtrian Lunch'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w9',
    title: 'Andharban Forest Monsoon Trek',
    destination: 'Tamhini Ghat, Maharashtra',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&h=400&fit=crop',
    rating: 4.7,
    reviews: 142,
    duration: 1,
    price: 1499,
    difficulty: 'Moderate',
    category: 'Nature',
    description: 'Hike 13km through Andharban, a dense forest trail in Tamhini Ghat. Experience beautiful Kundalika Valley views, deep dark canopy walks, and waterfalls.',
    highlights: ['13km Dense Canopy Trek', 'Kundalika Valley views', 'Lush Waterfall Showers', 'Traditional Base Meals'],
    type: 'weekend',
    availableDates: ['21 Jun 2026', '28 Jun 2026', '05 Jul 2026', '12 Jul 2026']
  },
  {
    id: 'w10',
    title: 'Aadrai Jungle & Waterfall Trek',
    destination: 'Malshej Ghat, Maharashtra',
    image: 'https://images.unsplash.com/photo-1596701062351-8a29937a8944?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 115,
    duration: 1,
    price: 1299,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Journey through the ancient forests of Malshej Ghat. Trail through lush Aadrai jungle, visit Nageshwar Temple, and witness the breathtaking Kalu Waterfall.',
    highlights: ['Kalu Waterfall View', 'Dense Jungle Trails', 'Ancient Cave Exploration', 'Hot Local Lunch'],
    type: 'weekend',
    availableDates: ['21 Jun 2026', '28 Jun 2026', '05 Jul 2026', '12 Jul 2026']
  },

  // Domestic Trips (type: 'domestic')
  {
    id: 'd1',
    title: 'Ladakh Highway Road Trip',
    destination: 'Leh-Ladakh',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 340,
    duration: 8,
    price: 24999,
    difficulty: 'Challenging',
    category: 'Adventure',
    description: 'The ultimate Himalayan road trip. Cross high-altitude passes, camp by the mesmerizing blue Pangong Lake, and ride double-humped camels in Nubra.',
    highlights: ['Pangong Lake Camp', 'Khardung La Pass', 'Nubra Camel Safari', 'Magnetic Hill Ride'],
    type: 'domestic',
    availableDates: ['20 Jun - 27 Jun 2026', '11 Jul - 18 Jul 2026', '08 Aug - 15 Aug 2026']
  },
  {
    id: 'd2',
    title: 'Spiti Valley Explorer',
    destination: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621340156-b0e5e9b9d3ff?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 195,
    duration: 7,
    price: 19999,
    difficulty: 'Challenging',
    category: 'Adventure',
    description: 'Explore the rugged high-altitude cold desert of Spiti. Visit the iconic Key Monastery, send mail from Hikkim, and camp near Chandratal Lake.',
    highlights: ['Key Monastery Tour', 'Hikkim Post Office', 'Chandratal Lake Camp', 'Langza Fossil Walk'],
    type: 'domestic',
    availableDates: ['21 Jun - 27 Jun 2026', '12 Jul - 18 Jul 2026', '09 Aug - 15 Aug 2026']
  },
  {
    id: 'd3',
    title: 'Kashmir Paradise Tour',
    destination: 'Jammu & Kashmir',
    image: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 290,
    duration: 6,
    price: 18999,
    difficulty: 'Easy',
    category: 'Nature',
    description: 'Experience Kashmir\'s magic. Stay in an ornate traditional wooden houseboat on Dal Lake, ride a Gondola in Gulmarg, and hike Pahalgam.',
    highlights: ['Houseboat Stay', 'Shikara Ride', 'Gulmarg Gondola', 'Aru Valley Trek'],
    type: 'domestic',
    availableDates: ['20 Jun - 25 Jun 2026', '11 Jul - 16 Jul 2026', '08 Aug - 13 Aug 2026']
  },
  {
    id: 'd4',
    title: 'Meghalaya Backpacking Tour',
    destination: 'Northeast India',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 165,
    duration: 7,
    price: 22999,
    difficulty: 'Moderate',
    category: 'Nature',
    description: 'Trek to the famous Double Decker Living Root Bridge, boat on the crystal-clear waters of Dawki River, and explore stunning limestone caves.',
    highlights: ['Double Decker Bridge', 'Dawki River Boating', 'Mawsmai Caves', 'Krishnasari Falls'],
    type: 'domestic',
    availableDates: ['20 Jun - 26 Jun 2026', '11 Jul - 17 Jul 2026', '08 Aug - 14 Aug 2026']
  },
  {
    id: 'd5',
    title: 'Kerala Backwaters & Hills',
    destination: 'Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=400&fit=crop',
    rating: 4.7,
    reviews: 180,
    duration: 6,
    price: 15999,
    difficulty: 'Easy',
    category: 'Culture',
    description: 'Relax in Munnar\'s rolling tea plantations, drift along the tranquil Alleppey backwaters in a private houseboat, and explore spices.',
    highlights: ['Munnar Tea Fields', 'Houseboat Overnight', 'Spice Garden Walk', 'Kochi Fort Tour'],
    type: 'domestic',
    availableDates: ['20 Jun - 25 Jun 2026', '11 Jul - 16 Jul 2026', '08 Aug - 13 Aug 2026']
  },
  {
    id: 'd6',
    title: 'Andaman Islands Beach Escape',
    destination: 'Andaman Islands',
    image: 'https://images.unsplash.com/photo-1589982441113-642137951a87?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 140,
    duration: 6,
    price: 26999,
    difficulty: 'Easy',
    category: 'Nature',
    description: 'Sunbathe on Havelock Island\'s Radhanagar Beach, dive into colorful coral reef systems, and learn the history of cellular jail.',
    highlights: ['Radhanagar Beach', 'Scuba & Snorkeling', 'Cellular Jail Show', 'Ross Island Tour'],
    type: 'domestic',
    availableDates: ['20 Jun - 25 Jun 2026', '11 Jul - 16 Jul 2026', '08 Aug - 13 Aug 2026']
  }
]

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
