'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface TripFiltersProps {
  searchQuery: string
  selectedCategory: string
  selectedDifficulty: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
}

const CATEGORIES = ['All', 'Wildlife', 'Hiking', 'Nature', 'Culture', 'Adventure']
const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Challenging']

export function TripFilters({
  searchQuery,
  selectedCategory,
  selectedDifficulty,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
}: TripFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 md:p-8 shadow-lg mb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-card-foreground mb-3">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-card-foreground mb-3">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-card-foreground mb-3">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="text-sm font-semibold text-muted-foreground">Quick filters:</span>
        {CATEGORIES.slice(1, 4).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
