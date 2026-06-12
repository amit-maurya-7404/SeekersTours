'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface CTASectionProps {
  variant?: 'primary' | 'secondary'
}

export function CTASection({ variant = 'primary' }: CTASectionProps) {
  const isPrimary = variant === 'primary'

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.15, duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <motion.section
      className={`py-20 md:py-28 relative overflow-hidden ${
        isPrimary
          ? 'bg-gradient-to-br from-[#c2410c] via-[#852a0c] to-[#360d03] border-y border-white/10 text-white'
          : 'bg-background'
      }`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background Decorative Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full filter blur-[130px] pointer-events-none ${
        isPrimary ? 'bg-white/10' : 'bg-accent/5'
      }`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Floating border container for secondary variant */}
        <div className={!isPrimary ? 'bg-card/45 backdrop-blur-sm border border-border/40 p-10 md:p-16 rounded-3xl shadow-xl' : ''}>
          
          <motion.div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={18} className={`${isPrimary ? 'text-white' : 'text-accent'} animate-pulse`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${isPrimary ? 'text-white/95' : 'text-accent'}`}>
              Ready for your adventure?
            </span>
          </motion.div>

          <h2
            className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight ${
              isPrimary ? 'text-white' : 'text-foreground'
            }`}
          >
            {isPrimary
              ? 'Start Your Journey Today'
              : 'Don\'t Wait. Book Your Dream Adventure.'}
          </h2>

          <p
            className={`text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed ${
              isPrimary ? 'text-white/90 font-medium' : 'text-muted-foreground font-medium'
            }`}
          >
            {isPrimary
              ? 'Explore our curated collection of unforgettable adventures and book your next trip with exclusive offers and expert guidance.'
              : 'Limited spots available for our most popular destinations. Secure your place before they fill up.'}
          </p>

          <motion.div variants={buttonVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/domestic-trips" className="w-full sm:w-auto">
              <button
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  isPrimary
                    ? 'bg-white text-[#852a0c] hover:bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                    : 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_4px_20px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.25)]'
                }`}
              >
                <span>Explore Domestic Trips</span>
                <ArrowRight size={18} />
              </button>
            </Link>
            
            <Link href="/contact" className="w-full sm:w-auto">
              <button
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  isPrimary
                    ? 'bg-transparent text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/5'
                    : 'bg-transparent text-foreground border-2 border-border hover:border-accent/40 hover:bg-card'
                }`}
              >
                <span>Contact Our Experts</span>
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}
