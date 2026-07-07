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
    title: 'Kalsubai Night Trek',
    destination: 'Igatpuri, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/641/748/0c5519266c5dfb92d0fc435424966655/original/5_20220402_021829_0004_d9vkZ93.jpg',
    rating: 4.9,
    reviews: 240,
    duration: 1,
    price: 499,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Go where you feel most alive. It’s time to upgrade the level of your adventure and feel the real thrill! Summit the Kalsubai Peak, the highest point in Maharashtra at 5,400 feet, and witness a magical sunrise above a thick blanket of clouds.',
    highlights: ['Climb the Everest of Maharashtra', 'Witness Sunrise from Kalsubai Temple', 'Steel railings and ladders sections', 'Enjoy authentic local breakfast & lunch'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w2',
    title: 'Kalsubai Trekking & Camping',
    destination: 'Igatpuri, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/645/654/59e46287ddd317d4daf4586681d4520a/original/1F65375A-D516-49CE-A40B-31A44FFFF586.jpeg',
    rating: 4.8,
    reviews: 115,
    duration: 2,
    price: 999,
    difficulty: 'Moderate',
    category: 'Adventure',
    description: 'Camp on top of the Everest of Maharashtra and spend a memorable weekend. Trek to Kalsubai Peak, watch a beautiful sunrise from your tent, and enjoy bonfire night under a starlit sky.',
    highlights: ['Top of Maharashtra Tent Stay', 'Sunrise from Kalsubai Temple', 'Bonfire Night & Stargazing', 'Local Maharashtrian meals'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w3',
    title: 'Harishchandragad Trek',
    destination: 'Ahmednagar, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/682/938/3a8ccc421ea43da274cbb0317343999c/original/harishchandragad-trek.jpg',
    rating: 4.7,
    reviews: 156,
    duration: 1,
    price: 699,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Embark on a fun-filled trek to Harishchandragad fort in the Malshej region. Visit the ancient Kedareshwar Cave with its massive water-surrounded Shiva Linga, Harishchandreshwar Temple, and the standing concave cliff of Konkan Kada.',
    highlights: ['Walk on Konkan Kada Cliff', 'Kedareshwar Cave Shiva Linga', 'Harishchandreshwar Temple', 'Village style breakfast & lunch'],
    type: 'weekend',
    availableDates: ['21 Jun 2026', '28 Jun 2026', '05 Jul 2026', '12 Jul 2026']
  },
  {
    id: 'w4',
    title: 'Harishchandragad Kokankada Trek & Camping',
    destination: 'Ahmednagar, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/796/590/09786353b04a73cf17192a117f426f22/original/178195178_803345776959276_229043733439237994_n.jpg',
    rating: 4.9,
    reviews: 185,
    duration: 2,
    price: 999,
    difficulty: 'Moderate',
    category: 'Adventure',
    description: 'Camp under the stars on the edge of the breathtaking Konkan Kada cliff at Harishchandragad Fort. Witness legendary sunrises and sunsets, explore ancient temples, and trek to Taramati Peak, the topmost point on the fort.',
    highlights: ['Climbing to Taramati Peak', 'Lakeside Tent Stay on Konkan Kada', 'Kedareshwar Cave Exploration', 'Authentic local cuisine dinners'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w5',
    title: 'Harihar Fort Night Trek',
    destination: 'Nashik, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/641/217/f9fb9f9138f4a9b7f8c85ed2c3211e70/original/vpehzlwshbgnzw9cj04pk90sia73_shutterstock_1573930555.jpg',
    rating: 4.8,
    reviews: 210,
    duration: 1,
    price: 499,
    difficulty: 'Challenging',
    category: 'Hiking',
    description: 'Test your limits on the famous vertically inclined 80-degree rock-cut steps of Harihar Fort. Ascend this triangular prism-shaped rock hill, see the beautiful Hanuman and Shiva temples at the summit, and capture spectacular panoramic views of the Sahyadri mountains.',
    highlights: ['Iconic 80-degree Vertical Steps', 'Hanuman Temple Summit', 'Kasara Station pick-up', 'Local village breakfast'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w6',
    title: 'Sondai Night Trek',
    destination: 'Karjat, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/660/333/0cedf36eb425d76a2a28f5e5b818ab1f/original/33B08A60-FF63-4F20-AC07-690E8ADABABD.jpeg',
    rating: 4.6,
    reviews: 98,
    duration: 1,
    price: 499,
    difficulty: 'Easy',
    category: 'Hiking',
    description: 'Sondai fort is a hidden beauty of Karjat. Climb the carved stone steps and ladders to reach the Sondai Devi Temple summit. Witness the breathtaking views of Morbe Dam, Vavarle Dam, and the surrounding Matheran mountain range.',
    highlights: ['Hidden beauty of Karjat', 'Sondai Devi temple summit', 'Enormous Matheran range views', 'Morbe & Vavarle Dam views'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },
  {
    id: 'w7',
    title: 'Kalavantin Camping & Trekking',
    destination: 'Panvel, Maharashtra',
    image: 'https://vl-prod-static.b-cdn.net/system/images/000/664/070/9e88a47a6a2ffc0b082d00ed1a5c87e9/original/3ky6bu4rx6zvvyk97tf1fjpq5mtc_243201383_4968883836474155_6086931411514245199_n.jpg',
    rating: 4.9,
    reviews: 190,
    duration: 2,
    price: 999,
    difficulty: 'Moderate',
    category: 'Adventure',
    description: 'Trek to the thrilling Kalavantin Durg, listed among the world\'s most beautiful abandoned places. Walk up the narrow zigzag rock-cut steps to the pinnacle at 2,300 feet, camp overnight at Prabalmachi, and enjoy stargazing and local cuisine.',
    highlights: ['Zigzag rock-cut steps climb', 'Overnight tent stay at Prabalmachi', 'Spectacular Irshalgad & Morbe Dam views', 'Campfire night and stargazing'],
    type: 'weekend',
    availableDates: ['20 Jun 2026', '27 Jun 2026', '04 Jul 2026', '11 Jul 2026']
  },

  // Domestic Trips (type: 'domestic')
  {
    id: 'd1',
    title: 'Ladakh Highway Road Trip',
    destination: 'Leh-Ladakh',
    image: 'https://images.unsplash.com/photo-1581793745862-99f579662e7b?w=600&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1611001716885-b3402558a62b?w=600&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1625123627242-97ef1000c6d1?w=600&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1540206395-68808572332f?w=600&h=400&fit=crop',
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
