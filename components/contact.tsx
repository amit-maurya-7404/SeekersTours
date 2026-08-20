'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, CheckCircle2, MapPin, Compass } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Clear form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 500)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-card border-t border-border/40 relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground tracking-tight mb-4">
            Start Your Adventure
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Have questions about our tours? Want to customize a special trip? Drop us a line and let our specialists build your dream journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">

          {/* Contact Info Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div variants={itemVariants} className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
              Contact Channels
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="group flex gap-4 p-5 bg-background/45 backdrop-blur-sm border border-border/40 hover:border-accent/40 rounded-2xl transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-1">Email Support</h3>
                <p className="text-base text-muted-foreground font-semibold">info@seekerstours.com</p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="group flex gap-4 p-5 bg-background/45 backdrop-blur-sm border border-border/40 hover:border-accent/40 rounded-2xl transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-1">Direct Call</h3>
                <p className="text-base text-muted-foreground font-semibold">+91 83692 18944</p>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="group flex gap-4 p-5 bg-background/45 backdrop-blur-sm border border-border/40 hover:border-accent/40 rounded-2xl transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wider mb-1">WhatsApp Chat</h3>
                <p className="text-base text-muted-foreground font-semibold">+91 83692 18944</p>
              </div>
            </motion.div>

            {/* Mock Vector Map Visual Placeholder */}
            <motion.div
              variants={itemVariants}
              className="bg-background/45 backdrop-blur-sm border border-border/40 p-6 rounded-2xl relative overflow-hidden h-64 flex flex-col justify-between"
            >
              {/* Graphic Map Design */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M0,120 Q80,50 160,150 T320,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                  <circle cx="160" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Glowing pulsating pin */}
              <div className="absolute top-[60%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="absolute w-8 h-8 rounded-full bg-accent/30 animate-ping" />
                <div className="absolute w-4 h-4 rounded-full bg-accent/60 filter blur-xs" />
                <MapPin className="h-6 w-6 text-accent relative z-10 animate-bounce" />
              </div>

              <div className="relative z-10 flex gap-3 items-center">
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Compass className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-card-foreground tracking-tight">Our Base camp</h4>
              </div>

              <div className="relative z-10 bg-card/65 backdrop-blur-sm p-3 border border-border/50 rounded-xl max-w-[240px]">
                <p className="text-xs font-semibold text-card-foreground">Seekers Tours HQ</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">123 Adventure Lane, Mumbai, MH 400001</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 h-full"
          >
            <div className="bg-card/45 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border/40 shadow-xl min-h-[520px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-card-foreground mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="E.g. Rohan Sharma"
                          className="w-full px-4 py-3 bg-background/50 border border-border/50 focus:border-accent rounded-xl text-sm placeholder-muted-foreground/60 text-foreground transition-all duration-300 outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-card-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@domain.com"
                          className="w-full px-4 py-3 bg-background/50 border border-border/50 focus:border-accent rounded-xl text-sm placeholder-muted-foreground/60 text-foreground transition-all duration-300 outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-card-foreground mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="E.g. Customize Spiti road trip"
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 focus:border-accent rounded-xl text-sm placeholder-muted-foreground/60 text-foreground transition-all duration-300 outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-card-foreground mb-2">
                        Message Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about group size, travel dates, and customizations..."
                        rows={5}
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 focus:border-accent rounded-xl text-sm placeholder-muted-foreground/60 text-foreground transition-all duration-300 outline-none resize-none focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent/95 text-accent-foreground rounded-xl font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.25)] hover:scale-[1.01]"
                    >
                      <span>Send Message</span>
                      <Send size={16} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-accent/10 border border-accent/20 text-accent mb-2 animate-bounce">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-card-foreground tracking-tight mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. A Seekers Tours travel specialist will review your details and email you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-secondary/10 hover:bg-secondary/15 text-secondary border border-secondary/25 rounded-xl text-xs font-bold transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
