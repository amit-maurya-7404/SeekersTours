'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { X, Check, Clock, MapPin } from 'lucide-react'
import type { Trip } from './trip-cards'

interface ItineraryModalProps {
  trip: Trip | null
  isOpen: boolean
  onClose: () => void
  onBook: (trip: Trip) => void
}

const SAMPLE_ITINERARY = [
  {
    day: 1,
    title: 'Arrival & Orientation',
    description: 'Arrive at the destination and settle into your accommodation. Evening welcome dinner with the team.',
    activities: ['Airport transfer', 'Hotel check-in', 'Welcome dinner', 'Trip briefing'],
  },
  {
    day: 2,
    title: 'First Adventure',
    description: 'Start your adventure with guided exploration of the main attractions in the area.',
    activities: ['Morning hike', 'Local guide tour', 'Lunch with locals', 'Photography session'],
  },
  {
    day: 3,
    title: 'Deep Exploration',
    description: 'Venture deeper into the wilderness or cultural sites with expert guides.',
    activities: ['Full day expedition', 'Wildlife spotting', 'Traditional crafts', 'Evening bonfire'],
  },
  {
    day: 4,
    title: 'Cultural Immersion',
    description: 'Immerse yourself in local culture and traditions through hands-on experiences.',
    activities: ['Village visit', 'Cultural workshop', 'Local market tour', 'Cooking class'],
  },
]

export function ItineraryModal({ trip, isOpen, onClose, onBook }: ItineraryModalProps) {
  if (!trip) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-card shadow-2xl transition-all">
                {/* Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors z-10"
                  >
                    <X size={24} className="text-white" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">{trip.title}</h2>
                    <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                      <MapPin size={18} className="flex-shrink-0" />
                      <span>{trip.destination}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Trip Info */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 pb-8 border-b border-border text-center sm:text-left">
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">Duration</div>
                      <div className="text-base sm:text-2xl font-bold text-card-foreground">{trip.duration} days</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">Difficulty</div>
                      <div className="text-base sm:text-2xl font-bold text-accent truncate">{trip.difficulty}</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1">Price</div>
                      <div className="text-base sm:text-2xl font-bold text-accent">${trip.price}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-card-foreground mb-3">About this trip</h3>
                    <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-card-foreground mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {trip.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-background rounded-lg"
                        >
                          <Check size={18} className="text-accent flex-shrink-0" />
                          <span className="text-card-foreground">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-card-foreground mb-6">Itinerary</h3>
                    <div className="space-y-6">
                      {SAMPLE_ITINERARY.map((item, idx) => (
                        <motion.div
                          key={item.day}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-4"
                        >
                          {/* Timeline line */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                              {item.day}
                            </div>
                            {idx < SAMPLE_ITINERARY.length - 1 && (
                              <div className="w-0.5 h-16 bg-border mt-2" />
                            )}
                          </div>
                          {/* Content */}
                          <div className="pb-6">
                            <h4 className="font-bold text-card-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {item.activities.map((activity, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 pb-8 border-b border-border">
                    <div>
                      <h4 className="font-bold text-card-foreground mb-4 flex items-center gap-2">
                        <Check size={18} className="text-secondary" />
                        Included
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-secondary" />
                          All meals & accommodation
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-secondary" />
                          Expert guides
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-secondary" />
                          Activities & entrance fees
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground mb-4 flex items-center gap-2">
                        <X size={18} className="text-muted-foreground" />
                        Not Included
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <X size={14} className="text-muted-foreground" />
                          International flights
                        </li>
                        <li className="flex items-center gap-2">
                          <X size={14} className="text-muted-foreground" />
                          Travel insurance
                        </li>
                        <li className="flex items-center gap-2">
                          <X size={14} className="text-muted-foreground" />
                          Personal items
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onBook(trip)}
                      className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-200"
                    >
                      Book This Trip
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 bg-muted text-muted-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
