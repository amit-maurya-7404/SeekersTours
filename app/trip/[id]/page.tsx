'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Clock, Check, X, Calendar, ChevronRight, ArrowLeft, ChevronUp } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SAMPLE_TRIPS } from '@/components/trip-cards'
import { BookingModal } from '@/components/booking-modal'

const TRIP_ITINERARIES: Record<string, { day: number; title: string; description: string; activities: string[] }[]> = {
  w1: [
    { day: 1, title: 'Assembly & Ascent to Harihar Summit', description: 'Assemble at Kasara railway station early morning. Board private vehicles to Nirgudpada base village. After breakfast, begin the trek through forest trails to reach the base of the iconic near-vertical 117 rock-cut steps. Climb with safety guidance, explore the historical water tanks and temple at the summit, descend safely, and enjoy a traditional village lunch.', activities: ['Kasara assembly', 'Vertical Rock Steps climb', 'Summit exploration', 'Traditional base lunch'] }
  ],
  w2: [
    { day: 1, title: 'Ascend to the Plateau & Sunset', description: 'Start the trek from Pachnai base village. Reach the plateau, explore ancient caves, and witness a legendary sunset from Konkan Kada.', activities: ['Scenic Pachnai trek', 'Temple exploration', 'Konkan Kada Sunset', 'Tent camping & Dinner'] },
    { day: 2, title: 'Taramati Peak Sunrise & Descend', description: 'Wake up early to catch the sunrise from Taramati Peak. Have breakfast and descend back to the base village.', activities: ['Taramati sunrise climb', 'Plateau breakfast', 'Descend to base', 'Return journey'] }
  ],
  w3: [
    { day: 1, title: 'Pawna Lakeside Check-in', description: 'Arrive at the campsite by evening. Enjoy welcome drinks, watch the sunset, and dig into barbecue and live acoustic music by the bonfire.', activities: ['Lakeside check-in', 'Evening high tea', 'Live music & BBQ', 'Cozy Bonfire'] },
    { day: 2, title: 'Sunrise & Boating', description: 'Wake up to the mist over the lake, enjoy breakfast, go for a quick boat ride, and check out with memories.', activities: ['Mist sunrise watch', 'Breakfast', 'Boating in Pawna', 'Check-out'] }
  ],
  w4: [
    { day: 1, title: 'Trek to Rajmachi Village', description: 'Trek through the lush green forests from Lonavala. Reach the village, enjoy a village home-cooked dinner, and spot glowing fireflies.', activities: ['Forest trek trail', 'Village check-in', 'Traditional dinner', 'Fireflies sighting'] },
    { day: 2, title: 'Shrivardhan Fort Summit', description: 'Climb the historic Shrivardhan Fort early morning for panoramic views of Sahyadri peaks. Return for breakfast and descend.', activities: ['Fort summit climb', 'Valley viewing', 'Local breakfast', 'Descend trek'] }
  ],
  w5: [
    { day: 1, title: 'Forest Trail to Turquoise Pool', description: 'Embark on a one-day trek through the dense forests of Bhira. Reach the breathtaking Devkund waterfall, swim in the turquoise pool, and head back.', activities: ['Bhira Dam trail walk', 'Dense forest hiking', 'Waterfall dip', 'Local lunch at base'] }
  ],
  w6: [
    { day: 1, title: 'Night Trek Ascent', description: 'Start the trek from Bari village at night. Climb the iron ladders and reach the summit under the starlit sky to pitch camps.', activities: [' Bari village assembly', 'Night ladder climbing', 'Summit camping', 'Stargazing'] },
    { day: 2, title: 'Highest Peak Sunrise', description: 'Watch the sunrise from Kalsubai temple (highest point in Maharashtra). Descend to the base village for hot breakfast.', activities: ['Sunrise over clouds', 'Kalsubai temple visit', 'Descend trek', 'Maharashtrian breakfast'] }
  ],
  w7: [
    { day: 1, title: 'Bhandardara Lakeside Camping', description: 'Camp beside Arthur Lake in Bhandardara. Explore the grand Wilson Dam and Randha falls, followed by an evening stargazing session.', activities: [' Arthur Lake camping', 'Wilson Dam sightseeing', 'Stargazing session', 'Lakeside BBQ'] },
    { day: 2, title: 'Lakeside Boating & Departure', description: 'Enjoy boating on Arthur Lake in the morning. Have breakfast and drive back.', activities: ['Lake boat ride', 'Local breakfast', 'Departure'] }
  ],
  w8: [
    { day: 1, title: 'Samrad Base Village & Giant Rappelling', description: 'Arrive at Samrad base village, freshen up, and have breakfast. Enter Sandhan Valley (Valley of Shadows). Trek through massive boulder paths, complete the thrilling 45ft rappelling patch, and pitch tents for lakeside camping under starlit skies.', activities: ['Samrad village arrival', 'Valley of Shadows trek', '45ft Rappelling patch', 'Lakeside tent camping'] },
    { day: 2, title: 'Trek to Dehne & Return', description: 'Wake up early, enjoy breakfast by the campsite, trek towards Dehne base village. Board vehicles back to Kasara station and return to Mumbai.', activities: ['Campsite sunrise', 'Dehne village descent', 'Local Maharashtrian breakfast', 'Kasara return journey'] }
  ],
  w9: [
    { day: 1, title: 'Andharban Deep Forest Trek', description: 'Reach Pimpri base village in Tamhini Ghat. Begin the 13km descend trek through Andharban forest. Walk under dark canopy cover, enjoy Kundalika Valley viewpoints, take dips in waterfall streams, and enjoy hot local lunch at the end point before departure.', activities: ['Pimpri base arrival', '13km Forest canopy walk', 'Kundalika valley view', 'Monsoon waterfall dips'] }
  ],
  w10: [
    { day: 1, title: 'Aadrai Jungle & Kalu Waterfall View', description: 'Arrive at Malshej Ghat base. Trek through the dense and muddy paths of Aadrai jungle. Spot local flora/fauna, visit the ancient caves & Nageshwar Temple, and reach the viewpoint for the spectacular Kalu Waterfall. Return to base for hot lunch and return drive.', activities: ['Malshej Ghat drive', 'Dense Aadrai jungle hike', 'Kalu waterfall view', 'Village lunch & Return'] }
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
              <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
                <Calendar className="text-accent" />
                Upcoming Batch Departures
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.availableDates?.map((date, idx) => {
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
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                * Select a batch date above to automatically fill the booking form.
              </p>
            </div>

            {/* Itinerary Timeline */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-card-foreground mb-8">Day-by-Day Itinerary</h2>
              <div className="relative border-l border-border pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-10">
                {itinerary.map((day, idx) => (
                  <div key={day.day} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[45px] sm:-left-[53px] top-1.5 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm border-4 border-card shadow-md">
                      {day.day}
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">
                        {day.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                        {day.description}
                      </p>
                      
                      {/* Activities badges */}
                      <div className="flex flex-wrap gap-2">
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
                  </ul>
                </div>

                {/* Exclusions */}
                <div>
                  <h3 className="font-bold text-card-foreground mb-4 flex items-center gap-2.5 text-lg">
                    <X size={20} className="text-muted-foreground" />
                    What&apos;s Excluded
                  </h3>
                  <ul className="space-y-3">
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
      />

      <Footer />
    </main>
  )
}
