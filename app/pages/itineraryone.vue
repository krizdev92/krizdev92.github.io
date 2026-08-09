<script setup>
const itineraryData = {
  header: {
    eyebrow: 'Signature Blueprint',
    titleMain: 'Malabar & Nilgiri',
    titleHighlight: 'Heritage Route.',
    price: 'From $4,200',
    coverImg: '/images/home/itin-3.jpg'
  },
  stats: [
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', label: 'Duration', value: '11 Days / 10 Nights' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', label: 'Journey Focus', value: 'Culture & Estates' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>', label: 'Total Distance', value: '450 km' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>', label: 'Travel Style', value: 'Slow & Immersive' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>', label: 'Region', value: 'Kerala & Tamil Nadu' },
    { icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>', label: 'Ideal For', value: 'Couples & Families' }
  ],
  toc: [
    { id: 'overview', label: 'Route Overview' },
    { id: 'details', label: 'Detailed Progression' },
    { id: 'essentials', label: 'Travel Essentials' },
    { id: 'philosophy', label: 'Designer Philosophy' }
  ],
  contentBlocks: [
    {
      type: 'intro',
      sectionId: 'overview',
      text: 'Traverse the legendary spice routes of Kerala and ascend into the misty tea-clad heights of the Nilgiri Biosphere. Designed for travelers who favor deep historical context, private estate stays, and slow, unhurried exploration. This is not a vacation; it is a profound regional immersion.'
    },
    {
      type: 'highlights-route',
      highlightsTitle: 'Highlights of the Journey',
      items: [
        'Stay in a 200-year-old restored colonial mansion in Fort Kochi.',
        'Overnight cruise on a private, non-motorized traditional rice barge.',
        'Exclusive tea-tasting masterclass with a regional estate manager.',
        'Guided night-walks in the Periyar Tiger Reserve with indigenous trackers.'
      ],
      routeImg: '/images/home/itin-2.jpg',
      routeText: 'Cochin → Alleppey → Periyar → Munnar → Nilgiris'
    },
    {
      type: 'subtitle',
      text: 'The Pace & Flow'
    },
    {
      type: 'paragraph',
      text: 'Before diving into the daily progression, it is important to note that this blueprint relies heavily on the concept of slow travel. We ensure you spend at least two to three nights at each sanctuary, eliminating the exhaustion of constant repacking and driving.'
    },
    {
      type: 'journey-details',
      sectionId: 'details',
      title: 'Detailed Progression',
      accordions: [
        {
          title: 'Phase 01: The Maritime History',
          subtitle: 'Days 1-3 | Fort Kochi & Mattancherry',
          text: 'Arrive at Cochin International Airport where your private chauffeur awaits. Check into an ancestral home turned boutique sanctuary.\n\nSpend the next two days walking through ancient spice warehouses, visiting the 16th-century Jewish Synagogue, and dining on fresh pearl-spot fish beneath the cantilevered Chinese fishing nets.',
          img: '/images/home/stay-1.jpeg'
        },
        {
          title: 'Phase 02: Labyrinths of Vembanad',
          subtitle: 'Days 4-5 | Alleppey Backwaters',
          text: 'Leave the coastal heat and board your private Kettuvallam (rice barge). Disconnect entirely as your private chef prepares traditional Syrian Christian delicacies while you glide past emerald paddy fields, ancient churches, and village children returning from school via canoe.',
          img: '/images/home/itin-1.jpg'
        },
        {
          title: 'Phase 03: The Cardamom Ascent',
          subtitle: 'Days 6-8 | Periyar & Munnar',
          text: 'Ascend the winding roads into the Western Ghats. The air cools and the scent of wild cardamom takes over. Participate in an ethical elephant observation trek in Periyar before driving higher into the meticulously manicured tea slopes of Munnar, staying in an isolated British-era planter’s bungalow.',
          img: '/images/home/stay-2.jpeg'
        },
        {
          title: 'Phase 04: The Cloud Forests',
          subtitle: 'Days 9-11 | The Nilgiri Biosphere',
          text: 'Cross into Tamil Nadu and enter the ancient Shola forests. Spend your final days undertaking silent forest-bathing walks, encountering endemic bird species, and enjoying high-tea overlooking valleys that drop thousands of feet into the plains below before your final departure.',
          img: '/images/home/stay-4.jpg'
        }
      ]
    },
    {
      type: 'split-list',
      sectionId: 'essentials',
      title: 'Our Lodging Standards',
      img: '/images/home/stay-3.jpg',
      items: [
        'Restored colonial mansions honoring local heritage.',
        'Eco-lodges built without felling a single native tree.',
        'Working tea estates prioritizing organic cultivation.',
        'Absolute privacy with dedicated on-site concierges.'
      ]
    },
    {
      type: 'list-ordered-regular',
      title: 'Suggested Packing List',
      items: [
        'Lightweight, breathable linen or cotton clothing for coastal humidity.',
        'A warm fleece jacket or heavy sweater for the high-altitude tea estates.',
        'Sturdy, enclosed walking boots for plantation and jungle treks.',
        'Eco-friendly, reef-safe sunscreen and DEET-free mosquito repellent.'
      ]
    },
    {
      type: 'tip-box',
      title: 'Seasonal Climate Note',
      text: 'While the winter months (November to February) offer crisp, dry weather, the monsoon (June to August) transforms Kerala into a vivid, washed-green paradise, highly recommended for profound Ayurvedic wellness retreats.'
    },
    {
      type: 'quote-a',
      text: "To truly understand the Malabar coast, one must look beyond the postcard perfection of the palm fringes and listen to the murmurs of its ancient trading courtyards.",
      author: "The Designer's Notebook"
    },
    {
      type: 'idea-behind',
      sectionId: 'philosophy',
      subtitle: 'The Philosophy of Slow',
      text: 'This itinerary was born from a desire to counteract the frantic pacing of modern tourism. We noticed travelers returning from India exhausted by the logistics. Here, we prioritize depth over distance.',
      items: [
        'A maximum of 3 hotel changes over 11 days to minimize packing fatigue.',
        'At least two unstructured half-days built in for serendipity.',
        'Direct economic contribution to indigenous tracking guides.'
      ]
    },
    {
      type: 'creator-profile',
      name: 'Sreejith Raghavan',
      role: 'Lead Route Architect',
      location: 'Kerala, India',
      text: 'Having traversed the Western Ghats for over a decade, Sreejith designed this blueprint to showcase the hidden, delicate balance between Kerala’s colonial trading history and its profound ecological biodiversity.',
      avatar: '/images/home/itin-1.jpg'
    }
  ]
}
</script>

<template>
  <main class="w-full bg-[#F9F8F6] overflow-x-clip">
    
    <!-- Dynamic Engine handles the entire robust layout -->
    <ItineraryTemplateDynamic :itinerary="itineraryData" />

    <!-- Related Footer -->
    <RelatedItineraries eyebrow="Expand Your Horizons" title-main="Similar" title-highlight="Routes." />

  </main>
</template>