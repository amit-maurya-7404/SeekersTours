'use client'

import { useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  rating: number
  text: string
  trip: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aditya Sharma',
    role: 'Trekkaholic',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    rating: 5,
    text: 'I did the Kalsubai Monsoon Trek with Seekers Tours. The organization was top-notch! The local Maharashtrian breakfast at the base village Bari was so authentic, and the guides kept checking on everyone during the steep ladder sections in the heavy rain. Highly recommended!',
    trip: 'Kalsubai Monsoon Trek',
  },
  {
    id: 2,
    name: 'Sneha Kulkarni',
    role: 'Weekend Adventurer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Absolutely loved the Devkund Waterfall Trek! The forest path was super green and beautiful. The coordinators from Seekers Tours were very helpful, keeping us safe while crossing the water streams. We had a great time and made some awesome new friends!',
    trip: 'Devkund Waterfall Trek',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    role: 'Solo Traveler',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 5,
    text: 'As a solo trekker, I was a bit hesitant at first, but the group was extremely welcoming. Walking through the misty paths of Aadrai Jungle was pure magic. The pickup from Thane was perfectly on time, and the price is also very reasonable compared to others.',
    trip: 'Aadrai Jungle Trek',
  },
  {
    id: 4,
    name: 'Priya Patel',
    role: 'Nature Lover',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Seekers Tours made our weekend trek to Kalu Waterfall unforgettable. The valley view was breathtaking, and the guide shared interesting stories about the Malshej Ghat region. Looking forward to booking Andharban with them next month!',
    trip: 'Kalu Waterfall Trek',
  },
]

interface TestimonialsProps {
  layout?: 'grid' | 'carousel'
}

export function Testimonials({ layout = 'grid' }: TestimonialsProps) {
  const isCarousel = layout === 'carousel'
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const firstCard = container.firstElementChild as HTMLElement
      const cardWidth = firstCard ? firstCard.offsetWidth : 380
      const gap = 24 // gap-6 is 24px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap)
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Stories from Our Travelers
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Hear from real adventurers who&apos;ve experienced the magic of traveling with Seekers Tours.
          </p>
        </motion.div>

        {/* Carousel wrapper with navigation */}
        <div className="relative overflow-visible">
          {isCarousel && (
            <>
              {/* Left Scroll Button */}
              <button
                onClick={() => handleScroll('left')}
                className="absolute -left-5 lg:-left-14 top-1/2 -translate-y-[calc(50%+12px)] z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-white hover:text-accent dark:hover:bg-white dark:hover:text-accent border border-accent shadow-lg hover:shadow-accent/25 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={24} className="stroke-[2.5]" />
              </button>
            </>
          )}

          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={
              isCarousel
                ? "flex overflow-x-auto pb-6 gap-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar scroll-smooth md:mx-0 md:px-0"
                : "flex overflow-x-auto pb-6 gap-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar scroll-smooth md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8"
            }
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`bg-card/45 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-border/40 hover:border-accent/40 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(var(--ring),0.06)] transition-all duration-500 flex flex-col justify-between relative group w-[85vw] sm:w-[380px] shrink-0 snap-center ${
                  isCarousel ? 'md:w-[calc((100%-48px)/3)]' : 'md:w-auto'
                }`}
              >
                {/* Star Rating & Quote Accent */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote size={40} className="text-accent/10 group-hover:text-accent/25 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Quote Text */}
                <p className="text-card-foreground text-base leading-relaxed mb-8 italic font-medium">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 border-t border-border/40 pt-6 mt-auto">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 filter blur-sm" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-card shadow-md"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-card-foreground text-sm tracking-tight">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground font-semibold">{testimonial.role}</p>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-accent mt-2 px-2 py-0.5 bg-accent/5 rounded border border-accent/10">
                      <span>{testimonial.trip}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {isCarousel && (
            <>
              {/* Right Scroll Button */}
              <button
                onClick={() => handleScroll('right')}
                className="absolute -right-5 lg:-right-14 top-1/2 -translate-y-[calc(50%+12px)] z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white hover:bg-white hover:text-accent dark:hover:bg-white dark:hover:text-accent border border-accent shadow-lg hover:shadow-accent/25 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
                aria-label="Scroll Right"
              >
                <ChevronRight size={24} className="stroke-[2.5]" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
