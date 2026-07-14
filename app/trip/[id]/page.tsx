'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Clock, Check, X, Calendar, ChevronRight, ArrowLeft, ChevronUp } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SAMPLE_TRIPS } from '@/lib/trips'
import { BookingModal } from '@/components/booking-modal'
import { getUpcomingDepartures } from '@/lib/date-helper'

const TRIP_ITINERARIES: Record<
  string,
  {
    day: number
    title: string
    description?: string
    activities: string[]
    slots?: { time?: string; text: string }[]
  }[]
> = {
  w1: [
    {
      day: 1,
      title: 'Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'SGNP, Borivali (Meet SEEKERS Team)' },
        { time: '10:15 PM', text: 'Settle down in our private vehicle as we start our journey towards the base Village.' },
        { time: '10:20 PM', text: 'Malad' },
        { time: '10:30 PM', text: 'Goregaon' },
        { time: '10:40 PM', text: 'Gondavali Bus Stop, Andheri' },
        { time: '10:50 PM', text: 'Kalanagar bus stop, Bandra' },
        { time: '11:00 PM', text: 'Sion Circle' },
        { time: '11:10 PM', text: 'Chembur' },
        { time: '11:20 PM', text: 'Ghatkopar' },
        { time: '11:30 PM', text: 'Thane' },
        { time: '12:15 AM', text: 'KALYAN Bypass' }
      ]
    },
    {
      day: 2,
      title: 'Trek to Aadrai Jungle',
      activities: ['Jungle stream crossing', 'Taramathi ghal point', 'Mist and clouds', 'Local village lunch', 'Return to Mumbai'],
      slots: [
        { time: '05:00 AM', text: 'Reach the Base village, from where you can get a glimpse of Harishchandragad peak.' },
        { time: '05:30 AM', text: 'Get freshen up and Have Breakfast & Tea to get ready for this enthralling forest trek.' },
        { time: '07:00 AM', text: 'Gear up, & pack your bags and embark on this trek! For adventure Trek, It’s gonna be a long Walk Trail crossing waterfall stream to the Down. Make a few halts on the way where you can grab your snack or a drink.' },
        { time: '11:00 AM', text: 'Reach Taramathi ghal crossing point half of the jungle where we can enjoy waterfalls/streams. Witness a beautiful view of heaven on earth & foggy clouds. (We will not proceed further as it requires another 5/6 hours)' },
        { time: '11:30 AM', text: 'Take a group picture & then start your descent.' },
        { time: '12:00 PM', text: 'Start your descent. Finally, you get a view of the surroundings you Trail through the Dark Forest in the early morning.' },
        { time: '01:15 PM', text: 'Reach back down and grab a quick home-cooked local village lunch to curb your hunger.' },
        { time: '04:00 PM', text: 'Time to head back to Mumbai.' },
        { time: '10:00 PM', text: 'Adios! Back to the mundane city life. Until next time, SEEKERS!' }
      ]
    }
  ],
  w2: [
    {
      day: 1,
      title: 'Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Borivali National Park (https://goo.gl/maps/qvxmxjK8Tmn5JgScA)' },
        { time: '10:05 PM', text: 'Samta Nagar, Kandivali (https://goo.gl/maps/cSGKQWVSGDhS4qzP9)' },
        { time: '10:15 PM', text: 'Sufi Irani Cafe, Goregaon (https://goo.gl/maps/4ZTNqab65pKPDoNC9)' },
        { time: '10:30 PM', text: 'Hanuman Road Bus Stop Andheri (https://goo.gl/maps/SWKWuGMXSWgajCsSA)' },
        { time: '10:45 PM', text: 'Kalanagar Bust Stop, Bandra (https://goo.gl/maps/jGkGpBZrRto5gRTJ9)' },
        { time: '11:00 PM', text: 'Neeta Volvo, Sion (https://goo.gl/maps/iidWMx1DKGybV9jC9)' },
        { time: '11:10 PM', text: 'Amar Mahal Palace (https://goo.gl/maps/MqiA3pRQvBvwEvVB8)' },
        { time: '11:45 PM', text: 'Teen Hath Naka, Thane. (https://goo.gl/maps/w5xCKv9A7GTXm3Ju9)' }
      ]
    },
    {
      day: 2,
      title: 'Trek to Kalu Waterfall',
      activities: ['Waterfall dip', 'Kalu stream crossing', 'Natural Jacuzzi', 'Local Lunch', 'Return to Mumbai'],
      slots: [
        { time: '12:10 AM', text: 'Kalyan Khadakpada Circle (https://goo.gl/maps/dV5mqoibsB1ihdUo8)' },
        { time: '03:00 AM', text: 'Reach Base village and rest in the bus' },
        { time: '04:30 AM', text: 'Wake-up call. Get freshen up' },
        { time: '05:00 AM', text: 'Have Breakfast and start the bus journey towards the start point of the trek.' },
        { time: '07:00 AM', text: 'Reach the start point' },
        { time: '07:30 AM', text: 'Start trail towards Kalu waterfall. 2 stream crossings on the way. Gods valley trek to the bottom involves walking 6kms from Waghachiwadi base village.' },
        { time: '10:30 AM', text: 'Visit Kalu waterfall. Explore waterfall, click pictures' },
        { time: '11:30 AM', text: 'Start trekking toward the base village. While returning, will take natural jacuzzi.' },
        { time: '02:00 PM', text: 'Reach Base Village, Get freshen up' },
        { time: '02:30 PM', text: 'Have Lunch' },
        { time: '04:00 PM', text: 'Start return journey to Mumbai.' },
        { time: '10:00 PM', text: 'Reach Mumbai. (Arrival time is subjective to the traffic and weather conditions)' }
      ]
    }
  ],
  w3: [
    {
      day: 1,
      title: 'Late Night Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Board the private vehicle from Borivali. Pickup points along Andheri, Sion, and Thane.' },
        { time: '11:00 PM', text: 'Drive towards the Junnar region.' }
      ]
    },
    {
      day: 2,
      title: 'Naneghat Ancient Pass Trek & Return',
      activities: ['Base village arrival', 'Hike up Satavahana trade pass', 'Explore caves', 'Return to Mumbai'],
      slots: [
        { time: '03:30 AM', text: 'Reach the base village and rest.' },
        { time: '05:30 AM', text: 'Wake up, freshen up and have breakfast.' },
        { time: '07:00 AM', text: 'Commence the trek up the ancient Naneghat trade pass.' },
        { time: '10:30 AM', text: 'Reach the top pass, see the giant toll pot and explore the caves.' },
        { time: '11:30 AM', text: 'Start the descent.' },
        { time: '02:30 PM', text: 'Reach the base village and have local lunch.' },
        { time: '04:00 PM', text: 'Depart back to Mumbai.' },
        { time: '10:00 PM', text: 'Arrive in Mumbai.' }
      ]
    }
  ],
  w4: [
    {
      day: 1,
      title: 'Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Travel Games', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Borivali National Park' },
        { time: '10:15 PM', text: 'Malad, Sufi Irani Cafe' },
        { time: '10:20 PM', text: 'Goregaon, Opp Hub Mall' },
        { time: '10:30 PM', text: 'Andheri Hanuman Road' },
        { time: '10:40 PM', text: 'Teachers colony, Khar' },
        { time: '10:50 PM', text: 'Sion Circle' },
        { time: '11:00 PM', text: 'Chembur, Kstar Mall' },
        { time: '11:40 PM', text: 'Vashi Plaza' },
        { time: '11:55 PM', text: 'Nerul LP bus Stop' },
        { time: '12:10 AM', text: 'Kharghar 3 Star hotel' },
        { time: '12:25 AM', text: 'MCD Kalamboli' },
        { time: 'Further', text: 'Depart to base village. Settle down in our transfer vehicle as we start with a few travel games.' }
      ]
    },
    {
      day: 2,
      title: 'Trek to Devkund Waterfall',
      activities: ['Base village arrival', 'Forest trek to Devkund', 'Waterfall pool dip', 'Return to Mumbai'],
      slots: [
        { time: '05:00 AM', text: 'Reach the base village, freshen up and fill in your tummies with some morning breakfast & tea.' },
        { time: '06:30 AM', text: 'With a short introduction and briefing round we start our trek.' },
        { time: '09:00 AM', text: 'As we reach the waterfall, explore the place, take a dip in the water and click pictures to take back home.' },
        { time: '10:30 AM', text: 'After a group picture we start our descend to the base village.' },
        { time: '01:30 PM', text: 'Freshen up on reaching the base village and settle down for some local Maharashtrian lunch.' },
        { time: '03:00 PM', text: 'Settle in our transfer vehicle to start our return journey.' },
        { time: '09:00 PM', text: 'Adios! Back to the mundane city life. Until next time, SEEKERS! (Arrival time is subjective to the Group Speed Traffic and weather conditions)' }
      ]
    }
  ],
  w5: [
    {
      day: 1,
      title: 'Late Night Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey to Igatpuri'],
      slots: [
        { time: '10:00 PM', text: 'Board the private vehicle from Borivali. Pickup points along Andheri, Sion, and Thane.' },
        { time: '11:00 PM', text: 'Drive towards the base village Bari.' }
      ]
    },
    {
      day: 2,
      title: 'Kalsubai Monsoon Ascent & Return',
      activities: ['Bari arrival', 'Everest of Maharashtra climb', 'Summit temple', 'Return to Mumbai'],
      slots: [
        { time: '03:30 AM', text: 'Reach the base village Bari and rest.' },
        { time: '05:30 AM', text: 'Wake up, freshen up and have breakfast.' },
        { time: '07:00 AM', text: 'Start the climb to the Kalsubai Peak under the rain and mist.' },
        { time: '10:30 AM', text: 'Reach the summit temple. Enjoy the breathtaking views above clouds.' },
        { time: '11:30 AM', text: 'Start descending.' },
        { time: '02:30 PM', text: 'Reach base village Bari and have local lunch.' },
        { time: '04:00 PM', text: 'Depart back to Mumbai.' },
        { time: '10:00 PM', text: 'Arrive back in Mumbai.' }
      ]
    }
  ],
  w6: [
    {
      day: 1,
      title: 'Late Night Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Board the private vehicle from Borivali. Pickup points along Andheri, Sion, and Thane.' },
        { time: '11:00 PM', text: 'Drive towards Mahad.' }
      ]
    },
    {
      day: 2,
      title: 'Nanemachi Waterfall Trek & Return',
      activities: ['Base village arrival', 'Turquoise pool trek', 'Return to Mumbai'],
      slots: [
        { time: '03:30 AM', text: 'Reach base village and rest.' },
        { time: '05:30 AM', text: 'Wake up, freshen up and have breakfast.' },
        { time: '07:00 AM', text: 'Start the trek through dense forest paths to Nanemachi.' },
        { time: '10:30 AM', text: 'Reach the waterfall and turquoise pool.' },
        { time: '11:30 AM', text: 'Start the return trek.' },
        { time: '02:30 PM', text: 'Reach base village and have local lunch.' },
        { time: '04:00 PM', text: 'Depart back to Mumbai.' },
        { time: '10:00 PM', text: 'Arrive in Mumbai.' }
      ]
    }
  ],
  w7: [
    {
      day: 1,
      title: 'Late Night Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Board the private vehicle from Borivali. Pickup points along Andheri, Sion, and Thane.' },
        { time: '11:00 PM', text: 'Drive towards Tamhini Ghat.' }
      ]
    },
    {
      day: 2,
      title: 'Andharban Dark Forest Trek & Return',
      activities: ['Base village arrival', 'Downhill forest hike', 'Lunch & return'],
      slots: [
        { time: '03:30 AM', text: 'Reach the base village Pimpri and rest.' },
        { time: '05:30 AM', text: 'Wake up, freshen up and have breakfast.' },
        { time: '07:00 AM', text: 'Enter the dense dark forest of Andharban and start the hike.' },
        { time: '11:30 AM', text: 'Cross mountain streams and reach the valley viewpoint.' },
        { time: '02:30 PM', text: 'Reach the end of the trek (Bhira) and have a hot local lunch.' },
        { time: '04:00 PM', text: 'Depart back to Mumbai.' },
        { time: '10:00 PM', text: 'Arrive in Mumbai.' }
      ]
    }
  ],
  w8: [
    {
      day: 1,
      title: 'Late Night Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Board the private vehicle from Borivali. Pickup points along Andheri, Sion, and Thane.' },
        { time: '11:00 PM', text: 'Drive towards Malshej region.' }
      ]
    },
    {
      day: 2,
      title: 'Harishchandragad Trek & Return',
      activities: ['Base village Pachnai arrival', 'Ascent hike', 'Konkan Kada', 'Return to Mumbai'],
      slots: [
        { time: '04:30 AM', text: 'Reach Pachnai base village, freshen up and have breakfast.' },
        { time: '05:10 AM', text: 'Briefing by leaders and start the trek.' },
        { time: '07:30 AM', text: 'Reach the stunning Konkan Kada cliff, explore, and do photography.' },
        { time: '09:30 AM', text: 'Visit Kedareshwar Cave and Harishchandreshwar Temple.' },
        { time: '10:30 AM', text: 'Start descending back to the base village.' },
        { time: '01:30 PM', text: 'Reach base village and have a warm local lunch.' },
        { time: '02:30 PM', text: 'Depart back to Mumbai.' },
        { time: '09:00 PM', text: 'Arrive in Mumbai.' }
      ]
    }
  ],
  w9: [
    {
      day: 1,
      title: 'Late Night Departure from Mumbai',
      activities: ['Pickups in Mumbai', 'Overnight journey'],
      slots: [
        { time: '10:00 PM', text: 'Board the private vehicle from Borivali. Pickup points along Andheri, Sion, and Thane.' },
        { time: '11:00 PM', text: 'Drive towards Karjat.' }
      ]
    },
    {
      day: 2,
      title: 'Sondai Fort Hike & Return',
      activities: ['Sonewadi arrival', 'Trek to Sondai Devi temple', 'Return to Mumbai'],
      slots: [
        { time: '03:30 AM', text: 'Reach Sonewadi base village and rest.' },
        { time: '05:30 AM', text: 'Wake up, freshen up and have breakfast.' },
        { time: '07:00 AM', text: 'Start the hike to Sondai Fort.' },
        { time: '09:00 AM', text: 'Reach the summit temple. View Morbe and Vavarle dams.' },
        { time: '10:30 AM', text: 'Start descending.' },
        { time: '01:00 PM', text: 'Reach base village and have local lunch.' },
        { time: '02:30 PM', text: 'Depart back to Mumbai.' },
        { time: '08:00 PM', text: 'Arrive back in Mumbai.' }
      ]
    }
  ],
  w10: [
    {
      day: 1,
      title: 'Visapur Fort Sunday Special Day Trek',
      activities: ['Waterfall staircase trail', 'Lonavala trek', 'Historic fort ruins', 'Mumbai to Mumbai'],
      slots: [
        { time: '05:00 AM', text: 'Report to The Trek Leader at Borivali National park (https://goo.gl/maps/qvxmxjK8Tmn5JgScA)' },
        { time: '05:05 AM', text: 'Samta nagar police station, Kandivali (https://goo.gl/maps/kRgGJ9XvYK3d8FWAA)' },
        { time: '05:15 AM', text: 'Sufi Irani Cafe, Goregaon (https://goo.gl/maps/4ZTNqab65pKPDoNC9)' },
        { time: '05:30 AM', text: 'Hanuman Road Bus Stop Andheri (https://goo.gl/maps/SWKWuGMXSWgajCsSA)' },
        { time: '05:45 AM', text: 'Kalanagar Bust Stop, Bandra (https://goo.gl/maps/jGkGpBZrRto5gRTJ9)' },
        { time: '06:00 AM', text: 'Neeta Volvo, Sion (https://goo.gl/maps/iidWMx1DKGybV9jC9)' },
        { time: '06:10 AM', text: 'Ghatkopar Mankhurd Link Road (https://goo.gl/maps/m6TtFVkCkHd6MdKr7)' },
        { time: '06:30 AM', text: 'Vashi (under the bridge) (https://goo.gl/maps/3dpGHKPvf49FgJj6A)' },
        { time: '06:45 AM', text: 'Nerul LP (https://goo.gl/maps/tpntbzeYVijHQieF7)' },
        { time: '06:55 AM', text: 'Kharghar station (https://goo.gl/maps/y7hNW9wxMV7tByPr5)' },
        { time: '07:15 AM', text: 'Kalamboli McD (https://goo.gl/maps/F4bqaobJhjcPQ8zK9)' },
        { time: '09:00 AM', text: 'Participants travelling by their own vehicles gather outside the base village (our trek leader would be waiting for you all).' },
        { time: '09:30 AM', text: 'Reach Base village and Enjoy breakfast.' },
        { time: '10:00 AM', text: 'Post Introduction Start our trek.' },
        { time: '01:00 PM', text: 'We reach the Top. You will get a beautiful view & foggy clouds to capture some pictures to store it as a memory.' },
        { time: '02:00 PM', text: 'We start our descent. Finally, you get a view of the surroundings you climbed through in the morning.' },
        { time: '04:00 PM', text: 'Reach the Base Village and enjoy Local Maharashtrian Lunch.' },
        { time: '05:30 PM', text: 'Leave for Mumbai.' },
        { time: '10:00 PM', text: 'Adios! Back to the mundane city life. (Arrival time is subjective to traffic and weather conditions)' }
      ]
    }
  ],
  d1: [
    { day: 1, title: 'Leh Arrival & Acclimatization', description: 'Arrive at Leh Airport, check-in to your hotel, and spend the day resting to acclimatize to high altitude.', activities: ['Leh airport pick-up', 'Hotel check-in', 'Rest & Acclimatization', 'Light evening walk'] },
    { day: 2, title: 'Leh Local Sightseeing', description: 'Explore Leh local attractions including Hall of Fame, Magnetic Hill, and Sangam (confluence of Indus & Zanskar rivers).', activities: ['Sangam river view', 'Magnetic Hill ride', 'Hall of Fame visit', 'Shanti Stupa sunset'] },
    { day: 3, title: 'Leh to Nubra Valley via Khardung La', description: 'Drive over Khardung La (one of the highest motorable passes). Reach Nubra Valley and check-in to camps.', activities: ['Khardung La pass stop', 'Nubra valley drive', 'Hunder sand dunes', 'Camel ride'] },
    { day: 4, title: 'Nubra Valley to Turtuk & Back', description: 'Explore the last Indian village on the Indo-Pak border, Turtuk. Enjoy its unique Baltic culture and apricot orchards.', activities: ['Turtuk border tour', 'Balti heritage walk', 'Nubra return'] },
    { day: 5, title: 'Nubra to Pangong Lake via Shyok River', description: 'Drive along the scenic Shyok river to reach the iconic blue Pangong Lake. Camp overnight by the lake.', activities: ['Shyok river road', 'Pangong Lake check-in', 'Lake sunset view', 'Overnight lake camping'] },
    { day: 6, title: 'Pangong Lake to Leh', description: 'Witness the sunrise over Pangong Lake. Drive back to Leh crossing Chang La pass.', activities: ['Pangong sunrise', 'Chang La pass crossing', 'Leh return', 'Shopping time'] },
    { day: 7, title: 'Leh Departure', description: 'Transfer to Leh airport for your flight back home.', activities: ['Airport drop'] }
  ],
  d2: [
    { day: 1, title: 'Shimla to Kalpa Drive', description: 'Depart from Shimla, drive along the Sutlej river, and reach Kalpa, a beautiful village overlooking Kinner Kailash.', activities: ['Sutlej river valley', 'Kalpa check-in', 'Kinner Kailash view'] },
    { day: 2, title: 'Kalpa to Kaza (Spiti Entry)', description: 'Enter Spiti valley. Cross Nako village and Tabo Monastery to reach Kaza, the sub-divisional headquarters.', activities: ['Nako Lake stop', 'Tabo Monastery tour', 'Kaza hotel check-in'] },
    { day: 3, title: 'Key Monastery & Kibber Village', description: 'Visit the stunning Key Monastery, perched on a hilltop, and explore Kibber, one of the highest villages.', activities: ['Key Monastery visit', 'Kibber village walk', 'Chicham Bridge (highest)'] },
    { day: 4, title: 'Hikkim, Langza & Komic Tour', description: 'Send postcards from the highest post office in the world at Hikkim. Explore marine fossils at Langza.', activities: ['Hikkim Post Office', 'Komic highest village', 'Langza Buddha statue'] },
    { day: 5, title: 'Kaza to Chandratal Lake', description: 'Drive over Kunzum Pass to reach the crescent-shaped Chandratal Lake. Camp in tents near the lake.', activities: ['Kunzum Pass trek', 'Chandratal Lake walk', 'Tent camping'] },
    { day: 6, title: 'Chandratal to Manali Drive', description: 'Drive back to Manali crossing Rohtang Pass / Atal Tunnel. Check-in to hotel.', activities: ['Rohtang pass views', 'Atal Tunnel drive', 'Manali check-in'] },
    { day: 7, title: 'Manali Departure', description: 'Say goodbye to Spiti & return home.', activities: ['Departure'] }
  ],
  d3: [
    { day: 1, title: 'Srinagar Houseboat Check-in', description: 'Arrive in Srinagar. Check-in to a luxury wooden houseboat on Dal Lake and enjoy a Shikara ride at sunset.', activities: ['Srinagar airport pick-up', 'Houseboat check-in', 'Shikara ride on Dal Lake', 'Sunset views'] },
    { day: 2, title: 'Srinagar to Gulmarg Day Trip', description: 'Drive to Gulmarg, ride the famous Gondola cable car to Phase 1 & 2 for snow adventure.', activities: ['Gulmarg mountain drive', 'Gondola ride', 'Snow skiing', 'Return to Srinagar'] },
    { day: 3, title: 'Srinagar to Pahalgam', description: 'Drive to Pahalgam (Valley of Shepherds). Enroute visit saffron fields and Avantipura ruins. Check-in to hotel.', activities: ['Saffron fields stop', 'Lidder river walk', 'Pahalgam check-in'] },
    { day: 4, title: 'Pahalgam local valleys', description: 'Visit Betaab Valley, Aru Valley, and Chandanwari by local jeep.', activities: ['Betaab valley tour', 'Aru valley trek', 'Local sightseeing'] },
    { day: 5, title: 'Pahalgam to Srinagar (Mughal Gardens)', description: 'Drive back to Srinagar, explore the beautiful Shalimar and Nishat Mughal Gardens.', activities: ['Mughal gardens tour', 'Local market shopping', 'Srinagar hotel check-in'] },
    { day: 6, title: 'Srinagar Departure', description: 'Transfer to Srinagar airport for departure.', activities: ['Airport drop'] }
  ],
  d4: [
    { day: 1, title: 'Guwahati to Shillong', description: 'Pick up from Guwahati, drive to Shillong, stopping by the vast Umiam Lake.', activities: ['Guwahati pick-up', 'Umiam Lake view', 'Shillong hotel check-in'] },
    { day: 2, title: 'Cherrapunji drive', description: 'Drive to Cherrapunji, visiting Elephant Falls and Mawkdok Dympep Valley bridge.', activities: ['Elephant falls', 'Mawkdok valley viewpoint', 'Cherrapunji check-in'] },
    { day: 3, title: 'Double Decker Living Root Bridge Trek', description: 'Trek down 3,000 steps to reach the legendary Double Decker Living Root Bridge at Nongriat.', activities: ['Nongriat valley trek', 'Double Decker Bridge walk', 'Rainbow falls hike'] },
    { day: 4, title: 'Cherrapunji to Shnongpdeng (Dawki)', description: 'Drive to Dawki, take a boat ride on the crystal clear Umngot River in Shnongpdeng village.', activities: ['Umngot River boating', 'Dawki border check', 'Riverside camping'] },
    { day: 5, title: 'Shnongpdeng to Mawlynnong (Cleanest Village)', description: 'Visit Mawlynnong, voted the cleanest village in Asia, and walk on a single-decker root bridge.', activities: ['Cleanest village walk', 'Single root bridge', 'Return to Shillong'] },
    { day: 6, title: 'Shillong to Laitlum Canyons & Guwahati', description: 'Visit the jaw-dropping Laitlum Canyons, then drive back to Guwahati.', activities: ['Laitlum canyon view', 'Guwahati return', 'Guwahati check-in'] },
    { day: 7, title: 'Guwahati Departure', description: 'Depart from Guwahati airport.', activities: ['Airport transfer'] }
  ],
  d5: [
    { day: 1, title: 'Kochi Arrival & Munnar Drive', description: 'Arrive in Kochi, drive through scenic Cheeyappara and Valara waterfalls to Munnar.', activities: ['Kochi pick-up', 'Waterfall stops', 'Munnar resort check-in'] },
    { day: 2, title: 'Munnar Tea Fields Exploration', description: 'Explore Munnar tea estates, Eravikulam National Park (Nilgiri Tahr), and Mattupetty Dam.', activities: ['Tea estate walk', 'National park safari', 'Mattupetty dam boating'] },
    { day: 3, title: 'Munnar to Thekkady Wilds', description: 'Drive to Thekkady, visit spice plantations and take a boat safari on Periyar Lake.', activities: ['Thekkady drive', 'Spice garden tour', 'Periyar lake boat safari'] },
    { day: 4, title: 'Thekkady to Alleppey Houseboat', description: 'Drive to Alleppey, board a traditional Kettuvallam (houseboat) for a backwater cruise.', activities: [' Alleppey check-in', 'Overnight houseboat stay', 'Backwater canal cruise', 'Traditional meals'] },
    { day: 5, title: 'Alleppey to Fort Kochi Heritage', description: 'Drive to Kochi, see Chinese fishing nets, St. Francis Church, and Jew Town.', activities: ['Chinese fishing nets', 'Jew town shopping', 'Fort Kochi heritage walk'] },
    { day: 6, title: 'Kochi Departure', description: 'Airport drop for departure.', activities: ['Airport drop'] }
  ],
  d6: [
    { day: 1, title: 'Port Blair Arrival', description: 'Arrive at Port Blair, visit Cellular Jail and watch the evening Light & Sound show.', activities: ['Port Blair pick-up', 'Cellular jail tour', 'Light & Sound show'] },
    { day: 2, title: 'Port Blair to Havelock Island', description: 'Take a cruise ship to Havelock Island, spend the evening at the famous Radhanagar Beach.', activities: ['Havelock cruise ride', 'Radhanagar beach sunset', 'Resort check-in'] },
    { day: 3, title: 'Scuba Diving & Elephant Beach', description: 'Embark on a scuba diving session and visit Elephant Beach for water sports like snorkeling.', activities: ['Scuba diving', 'Elephant beach boat', 'Snorkeling & jet ski'] },
    { day: 4, title: 'Havelock to Neil Island', description: 'Cruise to Neil Island, visit Bharatpur Beach and the Natural Bridge formation.', activities: ['Neil island cruise', 'Natural bridge trek', 'Sunset at Laxmanpur beach'] },
    { day: 5, title: 'Neil Island to Port Blair', description: 'Cruise back to Port Blair, visit Ross Island (Netaji Subhash Chandra Bose Island).', activities: ['Port Blair cruise return', 'Ross Island history tour', 'Local shopping'] },
    { day: 6, title: 'Port Blair Departure', description: 'Depart from Port Blair airport.', activities: ['Airport drop'] }
  ]
};

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      const label = part.includes('maps') ? 'Google Maps' : 'Link';
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline font-bold inline-flex items-center"
        >
          {label}
        </a>
      );
    }
    return part;
  });
};

export default function TripDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const trip = SAMPLE_TRIPS.find((t) => t.id === id)
  const itinerary = TRIP_ITINERARIES[id] || []

  // Pre-selected batch date
  const [selectedDate, setSelectedDate] = useState('')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const [dates, setDates] = useState<string[]>([])
  useEffect(() => {
    if (trip) {
      if (trip.type === 'weekend' && trip.departureRule) {
        setDates(getUpcomingDepartures(trip.departureRule))
      } else {
        setDates(trip.availableDates || [])
      }
    }
  }, [trip])

  const [activeMonth, setActiveMonth] = useState('July')
  useEffect(() => {
    if (dates.length > 0) {
      const firstAvailableMonth = ['July', 'August', 'September'].find(m => 
        dates.some(d => d.includes(m.substring(0, 3)))
      )
      if (firstAvailableMonth) {
        setActiveMonth(firstAvailableMonth)
      }
    }
  }, [dates])

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-8">
        <Navigation />
        <MapPin size={64} className="text-accent mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Trip Not Found</h1>
        <p className="text-muted-foreground mb-6">We could not find the trip you are looking for.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    )
  }

  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col relative pb-32 lg:pb-20">
      <Navigation />

      {/* Hero Banner Section */}
      <div className="relative h-[60vh] min-h-[450px] overflow-hidden flex items-end">
        <div className="absolute inset-0 select-none">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-95" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </div>

        {/* Back Link */}
        <div className="absolute top-28 left-4 sm:left-8 lg:left-12 z-20">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/45 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors text-sm font-medium border border-white/10 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Trips
          </button>
        </div>

        {/* Title Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-accent-foreground font-semibold uppercase tracking-wider mb-4">
              <span>Home</span>
              <ChevronRight size={14} className="text-white/40" />
              <span>{trip.type === 'weekend' ? 'Weekend Getaways' : 'Domestic Trips'}</span>
              <ChevronRight size={14} className="text-white/40" />
              <span className="text-white/80 line-clamp-1">{trip.title}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white text-sm sm:text-base font-semibold">
              <span className="flex items-center gap-1.5 bg-accent/25 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent/20">
                <MapPin size={16} className="text-accent" />
                {trip.destination}
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Clock size={16} className="text-accent" />
                {trip.duration} {trip.duration === 1 ? 'Day' : 'Days'}
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Star size={16} className="fill-accent text-accent" />
                {trip.rating} ({trip.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Trip Details */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Section */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Trip Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {trip.description}
              </p>
            </div>

            {/* Highlights Section */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Adventure Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border/60 hover:border-accent/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Check size={18} className="text-accent" />
                    </div>
                    <span className="text-card-foreground font-semibold text-sm sm:text-base">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Batch Departures Section */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                <Calendar className="text-accent" />
                Upcoming Batch Departures
              </h2>

              {/* Month Selector Tabs */}
              {dates.length > 0 && (
                <div className="flex border-b border-border/40 mb-6 overflow-x-auto gap-2 scrollbar-none">
                  {['July', 'August', 'September'].map(month => {
                    const hasDates = dates.some(d => d.includes(month.substring(0, 3)))
                    if (!hasDates) return null
                    const isActive = activeMonth === month
                    return (
                      <button
                        key={month}
                        type="button"
                        onClick={() => setActiveMonth(month)}
                        className={`pb-3 px-4 font-bold text-sm transition-all relative whitespace-nowrap cursor-pointer ${
                          isActive 
                            ? 'text-accent border-b-2 border-accent' 
                            : 'text-muted-foreground hover:text-card-foreground'
                        }`}
                      >
                        {month}
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dates
                  .filter(d => d.includes(activeMonth.substring(0, 3)))
                  .map((date, idx) => {
                    const isSelected = selectedDate === date
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDate(date)}
                        className={`p-4 rounded-xl flex items-center justify-between border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-accent/15 border-accent shadow-md scale-[1.02]'
                            : 'bg-background border-border hover:border-accent/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Batch Date</p>
                            <p className="text-card-foreground font-bold text-sm sm:text-base">{date}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-accent bg-accent text-white scale-110'
                            : 'border-border bg-background text-transparent'
                        }`}>
                          <Check size={12} className="stroke-[3]" />
                        </div>
                      </div>
                    )
                  })}
                {dates.filter(d => d.includes(activeMonth.substring(0, 3))).length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-2 text-center py-4">No batches available for {activeMonth}.</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                * Select a batch date above to automatically fill the booking form.
              </p>
            </div>

            {/* Itinerary Timeline */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-8">Trip Itinerary</h2>
              <div className="relative border-l border-border pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">
                {itinerary.map((day, idx) => (
                  <div key={day.day} className="relative">
                    {/* Day number dot */}
                    <div className="absolute -left-[45px] sm:-left-[53px] top-1.5 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm border-4 border-card shadow-md">
                      {day.day}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-card-foreground">
                        {day.title}
                      </h3>

                      {day.slots && day.slots.length > 0 ? (
                        <div className="relative border-l border-border/80 pl-4 sm:pl-6 ml-2 space-y-6 mt-6 pb-2">
                          {day.slots.map((slot, sIdx) => (
                            <div key={sIdx} className="relative group">
                              {/* Sub-timeline dot */}
                              <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-secondary border-2 border-card shadow-sm transition-transform group-hover:scale-125 duration-200" />
                              
                              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                                {slot.time && (
                                  <span className="inline-flex items-center shrink-0 px-2.5 py-1 text-xs font-bold rounded-md bg-secondary/15 text-secondary border border-secondary/20 shadow-sm w-fit uppercase tracking-wider">
                                    {slot.time}
                                  </span>
                                )}
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                  {renderTextWithLinks(slot.text)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                          {day.description}
                        </p>
                      )}
                      
                      {/* Activities badges */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {day.activities.map((activity, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-8">Inclusions & Exclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Included */}
                <div>
                  <h3 className="font-bold text-card-foreground mb-4 flex items-center gap-2.5 text-lg">
                    <Check size={20} className="text-secondary" />
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {trip.inclusions && trip.inclusions.length > 0 ? (
                      trip.inclusions.map((inc, index) => (
                        <li key={index} className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <Check size={16} className="text-secondary mt-1 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <Check size={16} className="text-secondary mt-1 flex-shrink-0" />
                          <span>Comfortable standard accommodations (double/triple sharing)</span>
                        </li>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <Check size={16} className="text-secondary mt-1 flex-shrink-0" />
                          <span>Buffet meals (Healthy local breakfast & dinner daily)</span>
                        </li>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <Check size={16} className="text-secondary mt-1 flex-shrink-0" />
                          <span>Certified expert guides, coordinators, and local support</span>
                        </li>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <Check size={16} className="text-secondary mt-1 flex-shrink-0" />
                          <span>Sightseeing entry permits, adventure gear, and activities fees</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Exclusions */}
                <div>
                  <h3 className="font-bold text-card-foreground mb-4 flex items-center gap-2.5 text-lg">
                    <X size={20} className="text-muted-foreground" />
                    What&apos;s Excluded
                  </h3>
                  <ul className="space-y-3">
                    {trip.exclusions && trip.exclusions.length > 0 ? (
                      trip.exclusions.map((exc, index) => (
                        <li key={index} className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <X size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span>{exc}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <X size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span>Personal travel expenses, shopping, laundry, and tips</span>
                        </li>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <X size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span>Flights or transport to the starting base city</span>
                        </li>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <X size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span>Travel medical insurance or emergency evacuation costs</span>
                        </li>
                        <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                          <X size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span>Any meal or activity not mentioned explicitly in inclusions</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Sticky Booking Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            {/* Booking Summary Widget */}
            <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground text-center">
                <span className="text-xs uppercase tracking-wider text-primary-foreground/75 font-semibold block mb-1">Guaranteed Departure</span>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-extrabold text-accent">₹{trip.price}</span>
                  <span className="text-sm text-primary-foreground/70">/ per person</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Active Selected Date Box */}
                {selectedDate ? (
                  <div className="bg-accent/10 border border-accent/30 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Selected Batch Date</p>
                      <p className="text-accent font-bold text-sm sm:text-base">{selectedDate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted border border-border p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background text-muted-foreground flex items-center justify-center flex-shrink-0 border border-border">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">No Batch Selected</p>
                      <p className="text-muted-foreground font-semibold text-xs sm:text-sm">Pick a departure date to book</p>
                    </div>
                  </div>
                )}

                {/* Quick Inclusions */}
                <div className="space-y-3.5 border-t border-border/40 pt-4 text-sm">
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span className="font-semibold text-card-foreground/90">Instant Slot Booking</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span className="font-semibold text-card-foreground/90">Certified Coordinators</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span className="font-semibold text-card-foreground/90">Double/Triple Sharing Stay</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span className="font-semibold text-card-foreground/90">100% Secure Checkout</span>
                  </div>
                </div>

                {/* Big Booking Button */}
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95"
                >
                  Book Tour Now
                  <ChevronRight size={18} className="stroke-[2.5]" />
                </button>
              </div>

              <div className="bg-muted px-6 py-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                <span>⚡ 2 Hours Response Guarantee</span>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-lg text-center space-y-4">
              <h4 className="font-bold text-card-foreground text-lg">Still got questions?</h4>
              <p className="text-xs text-muted-foreground">
                Get in touch with our trip experts directly on WhatsApp for customized itineraries or group discounts.
              </p>
              <a
                href="https://wa.me/918369218944"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors text-sm cursor-pointer"
              >
                <Calendar size={16} />
                Chat with Tour Expert
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/60 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] lg:hidden">
        {/* Price Breakdown Drawer Panel */}
        <AnimatePresence>
          {showBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-b border-border/40 bg-muted/50"
            >
              <div className="p-4 space-y-3 text-sm">
                <h4 className="font-bold text-card-foreground text-xs uppercase tracking-wider mb-2">Price Breakdown</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Base Package Cost</span>
                  <span className="font-semibold text-card-foreground">₹{trip.price}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Local Stays & Camps</span>
                  <span className="font-semibold text-secondary">Included</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Trek Guide & Permits</span>
                  <span className="font-semibold text-secondary">Included</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Meals (Breakfast/Dinner)</span>
                  <span className="font-semibold text-secondary">Included</span>
                </div>
                <div className="pt-2 border-t border-border/40 flex justify-between items-center text-xs font-bold">
                  <span className="text-card-foreground">Net Package Cost</span>
                  <span className="text-accent">₹{trip.price}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Sticky Row */}
        <div className="flex items-center justify-between px-5 py-3.5 relative">
          {/* Toggle Button / Arrow wrapper */}
          <div 
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex flex-col cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Price per person</span>
              <motion.div
                animate={{ rotate: showBreakdown ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-accent flex items-center"
              >
                <ChevronUp size={16} className="stroke-[2.5]" />
              </motion.div>
            </div>
            <span className="text-2xl font-extrabold text-accent">₹{trip.price}</span>
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-accent/25 hover:scale-105 active:scale-95 text-sm cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingModal
        trip={trip}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDate={selectedDate}
        availableDates={dates}
      />

      <Footer />
    </main>
  )
}
