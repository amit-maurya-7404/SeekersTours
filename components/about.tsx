'use client'

import { motion, Variants } from 'framer-motion'
import { Award, Heart, Globe, Users, Landmark, Compass } from 'lucide-react'

export function About() {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We create custom travel experiences that leave lasting marks on your soul.',
    },
    {
      icon: Globe,
      title: 'Expertise',
      description: 'With over 12 years of exploring, we know the secret paths of every destination.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We design sustainable travel programs that directly support local communities.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Award-winning local experts and meticulously planned itineraries for your peace of mind.',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-28 bg-card border-y border-border/40 relative overflow-hidden">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Collage Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            {/* Background design layer */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/10 to-secondary/10 filter blur-lg opacity-80" />
            
            {/* Main Image Frame */}
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&h=800&fit=crop"
                alt="About Seekers Tours"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Glassmorphic Widget */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-card/75 backdrop-blur-md border border-border/60 p-5 rounded-2xl shadow-xl max-w-[200px] flex items-center gap-4 animate-float">
              <div className="h-12 w-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Est.</p>
                <p className="text-lg font-bold text-foreground">Since 2012</p>
              </div>
            </div>
          </motion.div>

          {/* Editorial Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
              Who We Are
            </span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-card-foreground tracking-tight mb-6 leading-tight">
              Crafting Stories, <br />
              <span className="text-accent bg-clip-text">Not Just Trips.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
            >
              Seekers Tours was born in 2012 from a simple, burning desire: to bridge the gap between sightseeing and soul-searching. We don&apos;t build regular sight-seeing itineraries; we curate journeys that shake you out of comfort, inspire deep connections, and create permanent core memories.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-muted-foreground/90 leading-relaxed mb-8"
            >
              Whether climbing high Himalayan passes or biking heritage South Mumbai lanes under the stars, our experienced travel designers ensure everything runs with seamless precision.
            </motion.p>

            {/* Stats Dashboard Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              <div className="bg-card/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors duration-300">
                <div className="text-4xl font-extrabold text-accent mb-1">12+</div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Years of Adventure</p>
              </div>
              <div className="bg-card/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors duration-300">
                <div className="text-4xl font-extrabold text-accent mb-1">5K+</div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Happy Adventurers</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 md:mt-32 border-t border-border/40 pt-20"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
              How We Work
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-card-foreground tracking-tight">
              Our Pillars of Exploration
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-card/30 backdrop-blur-sm p-8 rounded-2xl border border-border/40 hover:border-accent/30 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(239,68,68,0.05)] transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-card-foreground mb-3 tracking-tight">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
