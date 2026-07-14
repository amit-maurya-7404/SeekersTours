export interface Trip {
  id: string
  title: string
  destination: string
  image: string
  rating: number
  reviews: number
  duration: number
  price: number
  basePrice?: number
  mumbaiPrice?: number
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  category: string
  description: string
  highlights: string[]
  type: 'weekend' | 'domestic'
  availableDates: string[]
  departureRule?: 'Fri-Sat' | 'Sun'
  inclusions?: string[]
  exclusions?: string[]
}

export const SAMPLE_TRIPS: Trip[] = [
  // Weekend Getaways (type: 'weekend') - Maharashtra Treks, Camping, Midnight Cycling
  {
    id: 'w1',
    title: 'Aadrai Jungle Trek',
    destination: 'Malshej Ghat, Maharashtra',
    image: '/ST-Aadrai.jpeg',
    rating: 4.8,
    reviews: 142,
    duration: 1,
    price: 699,
    basePrice: 699,
    mumbaiPrice: 1499,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Explore the mystical Aadrai Jungle in the heart of Malshej Ghat. Known for its dense tree canopies, hidden waterfalls, and misty paths, it is a perfect monsoon escape.',
    highlights: ['Trek through dense green canopy', 'Visit hidden Aadrai waterfalls', 'Local Maharashtrian lunch included', 'Expert guides for safety'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w2',
    title: 'Kalu Waterfall Trek',
    destination: 'Malshej Ghat, Maharashtra',
    image: '/ST-Kalu.jpeg',
    rating: 4.9,
    reviews: 205,
    duration: 1,
    price: 699,
    basePrice: 699,
    mumbaiPrice: 1499,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Witness the highest waterfall of Malshej Ghat, Kalu Waterfall, falling from a height of 1200 feet. Experience the sheer force of water and the breath-taking surrounding valley views.',
    highlights: ['Highest waterfall of Malshej', 'Panoramic view of Kalu river valley', 'Riverside trail walk', 'Authentic local breakfast & lunch'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat',
    inclusions: [
      'Travel from Mumbai to Mumbai by Ac Bus',
      'Breakfast & Tea',
      'Lunch (Veg Thali)',
      'Guide Charges',
      'Entry Charges',
      'Expertise Charges',
      'First Aid'
    ],
    exclusions: [
      'Personal travel expenses, shopping, laundry, and tips',
      'Travel medical insurance or emergency evacuation costs',
      'Any meal or activity not mentioned explicitly in inclusions'
    ]
  },
  {
    id: 'w3',
    title: 'Naneghat Trek',
    destination: 'Junnar, Maharashtra',
    image: '/ST-Naneghat.jpeg',
    rating: 4.7,
    reviews: 110,
    duration: 1,
    price: 799,
    basePrice: 799,
    mumbaiPrice: 1499,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Walk through history at the ancient trade route of Naneghat. Used since the Satavahana era, this trail features massive stone inscriptions and the iconic toll pot carved into rock.',
    highlights: ['Ancient Satavahana Trade Route', 'Explore stone carvings and caves', 'Walk the massive rock-cut pass', 'Stunning Western Ghats panorama'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w4',
    title: 'Devkund Waterfall Trek',
    destination: 'Bhira, Maharashtra',
    image: '/ST-Devkund.jpg',
    rating: 4.9,
    reviews: 310,
    duration: 1,
    price: 899,
    basePrice: 899,
    mumbaiPrice: 1599,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Journey to the confluence of three rivers to see the hidden pool of Devkund. Surrounded by high cliffs, this plunge waterfall forms a crystal-clear blue pool at its base.',
    highlights: ['Trek through dense Bhira forest', 'Swim in crystal-clear Devkund pool', 'View beautiful Tamhini Ghat range', 'Delicious home-cooked local meals'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat',
    inclusions: [
      'Transportation from Mumbai to Mumbai by AC bus',
      'Unlimited Breakfast & Lunch (veg / Non-veg / Jain)',
      'Devkund Forest Entry Charges',
      'Representatives',
      'First-aid assistance',
      'New Friends made, new Bonds attached'
    ],
    exclusions: [
      'Personal travel expenses, shopping, laundry, and tips',
      'Travel medical insurance or emergency evacuation costs',
      'Any meal or activity not mentioned explicitly in inclusions'
    ]
  },
  {
    id: 'w5',
    title: 'Kalsubai Monsoon Trek',
    destination: 'Igatpuri, Maharashtra',
    image: '/ST-kalsubai.jpeg',
    rating: 4.9,
    reviews: 380,
    duration: 1,
    price: 699,
    basePrice: 699,
    mumbaiPrice: 1499,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Summit the Everest of Maharashtra during peak monsoon. Climb up steel ladders, traverse mist-covered ridges, and stand at 5400 feet surrounded by a sea of clouds.',
    highlights: ['Climb the highest peak of Maharashtra', 'Kalsubai Devi summit temple', 'Walk amidst heavy monsoon clouds', 'Authentic local breakfast & lunch'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w6',
    title: 'Nanemachi Waterfall Trek',
    destination: 'Mahad, Maharashtra',
    image: '/ST-Nanemachi.jpg',
    rating: 4.6,
    reviews: 85,
    duration: 1,
    price: 799,
    basePrice: 799,
    mumbaiPrice: 1599,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Trek to the newly discovered hidden gem of Mahad. Nanemachi waterfall plunges into a deep turquoise pool, surrounded by ancient forests and cliffs.',
    highlights: ['Turquoise water pool dip', 'Trek through unexplored jungle paths', 'Spectacular vertical cliff views', 'Traditional local village lunch'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w7',
    title: 'Andharban The Dark Forest Trek',
    destination: 'Tamhini Ghat, Maharashtra',
    image: '/ST-Andharban.jpg',
    rating: 4.9,
    reviews: 275,
    duration: 1,
    price: 999,
    basePrice: 999,
    mumbaiPrice: 1699,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Walk through the dark forest where sunlight struggles to reach the ground. Andharban is a complete downhill trek offering spectacular views of Kundalika Valley.',
    highlights: ['Walk in the deep dark forest canopy', 'Splendid Kundalika valley views', 'Cross gushing mountain streams', 'Delicious Maharashtrian meals'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w8',
    title: 'Harishchandragad Fort Monsoon Trek',
    destination: 'Ahmednagar, Maharashtra',
    image: '/ST-Harishchandragad.jpeg',
    rating: 4.8,
    reviews: 198,
    duration: 1,
    price: 699,
    basePrice: 699,
    mumbaiPrice: 1599,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Climb to the historic hill fort of Harishchandragad. Explore ancient caves, Saptatirtha Pushkarni, and walk out to the massive concave cliff of Konkan Kada.',
    highlights: ['Stunning Konkan Kada cliff view', 'Ancient Kedareshwar Cave Shiva Linga', 'Explore Harishchandreshwar Temple', 'Warm local village style meals'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w9',
    title: 'Sondai Fort Trek',
    destination: 'Karjat, Maharashtra',
    image: '/ST-sondai.jpeg',
    rating: 4.7,
    reviews: 112,
    duration: 1,
    price: 699,
    basePrice: 699,
    mumbaiPrice: 1299,
    difficulty: 'Easy',
    category: 'Hiking',
    description: 'A beautiful beginner-friendly trek near Karjat. Walk up rock-cut steps to reach the top where Sondai Devi temple sits, offering views of Morbe Dam.',
    highlights: ['Beginner-friendly scenic climb', 'Sondai Devi temple summit', 'Morbe and Vavarle Dam views', 'Beautiful surrounding green fields'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Fri-Sat'
  },
  {
    id: 'w10',
    title: 'One Day special Visapur Fort Trek',
    destination: 'Lonavala, Maharashtra',
    image: '/ST-Visapur.jpeg',
    rating: 4.8,
    reviews: 164,
    duration: 1,
    price: 699,
    basePrice: 699,
    mumbaiPrice: 1299,
    difficulty: 'Moderate',
    category: 'Hiking',
    description: 'Ascend the historic Visapur Fort through a waterfall trail where water flows down the stairs. Explore ruins, large stone walls, water cisterns, and enjoy the cool weather.',
    highlights: ['Climb through waterfall staircase', 'Explore massive historic fort walls', 'Beautiful view of Lohagad Fort', 'Delicious local breakfast & lunch'],
    type: 'weekend',
    availableDates: [],
    departureRule: 'Sun',
    inclusions: [
      '1 Veg / nonveg / jain lunch',
      '1 Veg breakfast',
      'Transportation from Mumbai to Mumbai by AC bus',
      'Safety & first aid',
      'Fort entry fees',
      'Experienced bhatakna representatives'
    ],
    exclusions: [
      'Personal travel expenses, shopping, laundry, and tips',
      'Travel medical insurance or emergency evacuation costs',
      'Any meal or activity not mentioned explicitly in inclusions'
    ]
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
