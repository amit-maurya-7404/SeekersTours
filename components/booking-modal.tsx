'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { X, Check, Calendar, Users, Mail, Phone, MessageSquare } from 'lucide-react'
import type { Trip } from './trip-cards'

interface BookingModalProps {
  trip: Trip | null
  isOpen: boolean
  onClose: () => void
  initialDate?: string
  availableDates?: string[]
}

type FormData = {
  fullName: string
  email: string
  whatsapp: string
  travelers: string
  travelDate: string
  notes: string
}

export function BookingModal({ trip, isOpen, onClose, initialDate, availableDates }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    travelers: '1',
    travelDate: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [baseCount, setBaseCount] = useState(1)
  const [mumbaiCount, setMumbaiCount] = useState(0)
  const [standardCount, setStandardCount] = useState(1)

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        travelDate: initialDate || '',
      }))
      if (trip) {
        if (trip.basePrice !== undefined && trip.mumbaiPrice !== undefined) {
          setBaseCount(1)
          setMumbaiCount(0)
        } else {
          setStandardCount(1)
        }
      }
    }
  }, [isOpen, initialDate, trip])

  if (!trip) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setBaseCount(1)
      setMumbaiCount(0)
      setStandardCount(1)
      setFormData({
        fullName: '',
        email: '',
        whatsapp: '',
        travelers: '1',
        travelDate: '',
        notes: '',
      })
    }, 300)
  }

  const hasOptions = trip.basePrice !== undefined && trip.mumbaiPrice !== undefined
  const totalTravelers = hasOptions ? baseCount + mumbaiCount : standardCount
  const totalCost = hasOptions
    ? (baseCount * trip.basePrice!) + (mumbaiCount * trip.mumbaiPrice!)
    : (standardCount * trip.price)

  const bookingOption = hasOptions
    ? `${baseCount > 0 ? `${baseCount}x Base Village` : ''}${baseCount > 0 && mumbaiCount > 0 ? ', ' : ''}${mumbaiCount > 0 ? `${mumbaiCount}x Mumbai to Mumbai` : ''}`
    : 'Standard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (totalTravelers === 0) return
    setIsLoading(true)

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          travelers: String(totalTravelers),
          travelDate: formData.travelDate,
          notes: formData.notes,
          tripTitle: trip.title,
          tripPrice: totalTravelers > 0 ? totalCost / totalTravelers : 0,
          bookingOption: bookingOption,
          tripId: trip.id,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setIsLoading(false)
        setSubmitted(true)
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Network error. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-card border border-border shadow-2xl transition-all">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-card-foreground transition-colors z-10 cursor-pointer"
                >
                  <X size={24} />
                </button>

                {!submitted ? (
                  <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 p-6 md:p-8 text-primary-foreground text-center relative">
                      <span className="text-[10px] uppercase tracking-widest text-accent font-bold block mb-1">Adventure Awaits</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">Book Your Escape</h2>
                      <p className="text-primary-foreground/90 font-medium text-sm md:text-base mb-1 line-clamp-1">{trip.title}</p>
                      <p className="text-xs text-primary-foreground/70">
                        Price: {hasOptions ? 'From ' : ''}<span className="font-extrabold text-accent">₹{hasOptions ? trip.basePrice : trip.price}</span> / person
                      </p>
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-card-foreground mb-1.5 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-card-foreground mb-1.5 uppercase tracking-wider">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-card-foreground mb-1.5 uppercase tracking-wider">
                            WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            required
                            placeholder="Number with code"
                            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                      </div>

                      {hasOptions ? (
                        <div className="space-y-3">
                          <label className="block text-xs font-bold text-card-foreground uppercase tracking-wider">
                            Pricing Options & Travelers
                          </label>
                          <div className="space-y-2.5">
                            {/* Option 1: Base Village */}
                            <div className="flex items-center justify-between p-4 bg-muted/40 border border-border/80 rounded-xl">
                              <div>
                                <span className="block font-bold text-sm text-foreground">Base Village (Self Travel)</span>
                                <span className="block text-xs font-semibold text-accent mt-0.5">₹{trip.basePrice} per person</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setBaseCount(prev => Math.max(0, prev - 1))}
                                  className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-muted select-none active:scale-90 transition-all cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center font-bold text-foreground text-sm">{baseCount}</span>
                                <button
                                  type="button"
                                  onClick={() => setBaseCount(prev => prev + 1)}
                                  className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-muted select-none active:scale-90 transition-all cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Option 2: Mumbai to Mumbai */}
                            <div className="flex items-center justify-between p-4 bg-muted/40 border border-border/80 rounded-xl">
                              <div>
                                <span className="block font-bold text-sm text-foreground">Mumbai to Mumbai (With Travel)</span>
                                <span className="block text-xs font-semibold text-accent mt-0.5">₹{trip.mumbaiPrice} per person</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setMumbaiCount(prev => Math.max(0, prev - 1))}
                                  className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-muted select-none active:scale-90 transition-all cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center font-bold text-foreground text-sm">{mumbaiCount}</span>
                                <button
                                  type="button"
                                  onClick={() => setMumbaiCount(prev => prev + 1)}
                                  className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-muted select-none active:scale-90 transition-all cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <label className="block text-xs font-bold text-card-foreground uppercase tracking-wider">
                            Travelers Count
                          </label>
                          <div className="flex items-center justify-between p-4 bg-muted/40 border border-border/80 rounded-xl">
                            <div>
                              <span className="block font-bold text-sm text-foreground">Standard Package</span>
                              <span className="block text-xs font-semibold text-accent mt-0.5">₹{trip.price} per person</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setStandardCount(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-muted select-none active:scale-90 transition-all cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-bold text-foreground text-sm">{standardCount}</span>
                              <button
                                type="button"
                                onClick={() => setStandardCount(prev => prev + 1)}
                                className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center font-bold text-foreground hover:bg-muted select-none active:scale-90 transition-all cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-card-foreground mb-1.5 uppercase tracking-wider">
                          Departure Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                          <select
                            name="travelDate"
                            value={formData.travelDate}
                            onChange={handleChange}
                            required
                            className="w-full pl-3.5 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Choose a batch</option>
                            {(availableDates || trip.availableDates || []).map((date) => (
                              <option key={date} value={date}>
                                {date}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-card-foreground mb-1.5 uppercase tracking-wider">
                          Special Inquiries (Optional)
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Medical history, food preference, etc."
                          rows={2}
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        />
                      </div>

                      {/* Price Summary */}
                      <div className="bg-muted p-4 rounded-lg border border-border/80">
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span className="text-muted-foreground">Total Cost ({totalTravelers} pax):</span>
                          <span className="text-xl font-bold text-accent">
                            ₹{totalCost}
                          </span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={isLoading || totalTravelers === 0}
                          className="flex-1 py-3 bg-accent text-accent-foreground rounded-lg font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-md text-sm sm:text-base"
                        >
                          {isLoading ? 'Processing Request...' : totalTravelers === 0 ? 'Select Travelers' : 'Confirm Booking'}
                        </button>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-bold hover:bg-muted/80 transition-all duration-200 cursor-pointer text-sm sm:text-base border border-border/30"
                        >
                          Cancel
                        </button>
                      </div>

                      <p className="text-[10px] text-muted-foreground text-center font-medium">
                        * Clicking confirm will trigger booking confirmation requests to both your email and our coordinators.
                      </p>
                    </div>
                  </form>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 md:p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check size={32} className="text-secondary" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-card-foreground mb-3 tracking-tight">
                      Booking Confirmed!
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      Your booking request has been successfully recorded. Emails have been dispatched to both you and our coordinators to finalize the slots.
                    </p>

                    <div className="bg-muted p-4 rounded-lg mb-6 text-left border border-border space-y-3">
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5 font-bold uppercase tracking-wider">
                          Confirmation Email Sent
                        </p>
                        <p className="text-card-foreground font-semibold text-sm">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-0.5 font-bold uppercase tracking-wider">
                          Selected Departure Batch
                        </p>
                        <p className="text-accent font-bold text-sm">{formData.travelDate}</p>
                      </div>
                      <div className="pt-2 border-t border-border flex items-center gap-1.5 text-xs text-secondary font-bold">
                        <Check size={14} />
                        <span>Emails successfully generated</span>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-bold hover:bg-accent/90 transition-all duration-200 cursor-pointer shadow-md"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
