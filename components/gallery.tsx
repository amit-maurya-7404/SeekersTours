'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  location: string
  image: string
  category: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Himalayan High Passes',
    location: 'Leh-Ladakh',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1000&h=800&fit=crop',
    category: 'Road Trip'
  },
  {
    id: 2,
    title: 'Pawna Lakeside Camp',
    location: 'Lonavala, Maharashtra',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1000&h=800&fit=crop',
    category: 'Camping'
  },
  {
    id: 3,
    title: 'Munnar Tea Estates',
    location: 'Munnar, Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1000&h=800&fit=crop',
    category: 'Nature'
  },
  {
    id: 4,
    title: 'Konkan Kada Sunset',
    location: 'Harishchandragad fort, Maharashtra',
    image: '/ST-Harishchandragad.jpeg',
    category: 'Trekking'
  },
  {
    id: 5,
    title: 'Radhanagar Beach',
    location: 'Andaman Islands',
    image: 'https://images.unsplash.com/photo-1589982441113-642137951a87?w=1000&h=800&fit=crop',
    category: 'Beach'
  },
  {
    id: 6,
    title: 'Monsoon Forest Trails',
    location: 'Rajmachi fort, Maharashtra',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&h=800&fit=crop',
    category: 'Trekking'
  }
]

interface GalleryProps {
  layout?: 'grid' | 'carousel'
}

export function Gallery({ layout = 'grid' }: GalleryProps) {
  const isCarousel = layout === 'carousel'
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const firstCard = container.firstElementChild as HTMLElement
      const cardWidth = firstCard ? firstCard.offsetWidth : 350
      const gap = 24 // gap-6 is 24px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap)
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIdx])

  const handleNext = () => {
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null))
  }

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null))
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="gallery" className="py-20 md:py-28 bg-card border-t border-border/30 relative overflow-hidden">
      {/* Background light glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
            Visual Journeys
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground tracking-tight mb-4">
            Moments Captured
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Take a visual tour through our trail snapshots. Authentic, unfiltered moments from real explorations.
          </p>
        </div>

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
                : "flex overflow-x-auto pb-6 gap-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar scroll-smooth md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
            }
          >
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={() => setSelectedIdx(idx)}
              className={`group relative h-80 rounded-2xl overflow-hidden border border-border/40 hover:border-accent/40 shadow-md hover:shadow-xl cursor-pointer transition-all duration-500 bg-muted w-[85vw] sm:w-[350px] shrink-0 snap-center ${
                isCarousel ? 'md:w-[calc((100%-48px)/3)]' : 'md:w-auto'
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Corner Action Tag */}
              <div className="absolute top-4 right-4 h-9 w-9 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-xl text-white opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Maximize2 size={16} />
              </div>

              {/* Text Information bottom left */}
              <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1.5 block">
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 font-medium">
                  {item.location}
                </p>
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

      {/* Lightbox Pop-up Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Top Bar with title & close button */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10 pt-2" onClick={(e) => e.stopPropagation()}>
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-0.5">
                  {GALLERY_ITEMS[selectedIdx].category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {GALLERY_ITEMS[selectedIdx].title}
                </h3>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="h-10 sm:h-12 w-10 sm:w-12 bg-white/5 border border-white/10 hover:border-accent flex items-center justify-center rounded-xl text-white/80 hover:text-accent-foreground hover:bg-accent transition-all duration-300 cursor-pointer shadow-lg"
                aria-label="Close Gallery"
              >
                <X size={20} />
              </button>
            </div>

            {/* Middle Container for image & slider controls */}
            <div className="flex-grow flex items-center justify-center relative w-full max-w-7xl mx-auto my-6">
              
              {/* Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-0 sm:left-4 h-12 w-12 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center rounded-xl text-white transition-all z-10 cursor-pointer shadow-md hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Image View */}
              <div 
                className="relative max-w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={selectedIdx}
                  src={GALLERY_ITEMS[selectedIdx].image}
                  alt={GALLERY_ITEMS[selectedIdx].title}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain select-none"
                />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-0 sm:right-4 h-12 w-12 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center rounded-xl text-white transition-all z-10 cursor-pointer shadow-md hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Bar indicators */}
            <div className="w-full text-center pb-2 z-10" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs text-white/50 font-bold uppercase tracking-wider">
                Image {selectedIdx + 1} of {GALLERY_ITEMS.length}
              </p>
              <p className="text-xs text-white/40 font-medium mt-1">
                {GALLERY_ITEMS[selectedIdx].location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
