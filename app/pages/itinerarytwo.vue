<script setup>
const heroData = {
  eyebrow: 'Signature Blueprint',
  titleMain: 'Malabar & Nilgiri',
  titleItalic: 'Heritage Route.',
  intro: 'An 11-day immersive journey through ancient spice trails and misty cloud forests.',
  bgImage: '/images/home/itin-3.jpg'
}

const introData = {
  eyebrow: 'Route Architecture',
  titleMain: 'Curated',
  titleHighlight: 'Pacing.',
  paragraph: 'Every day of this route is balanced with deep historical immersion, private estate accommodations, and restorative periods of free time.'
}

const itineraryData = {
  title: 'The Malabar & Nilgiri Heritage Route',
  tagline: 'An 11-Day Immersive Journey Through Ancient Spice Trails and Cloud Forests',
  overview: 'Traverse the legendary spice routes of Kerala and ascend into the misty tea-clad heights of the Nilgiri Biosphere. Designed for travelers who favor deep historical context, private estate stays, and slow, unhurried exploration.',
  duration: '11 Days / 10 Nights',
  pace: 'Slow & Immersive',
  region: 'South India',
  groupSize: 'Private (1 - 4 Guests)',
  heroImg: '/images/home/itin-3.jpg',
  days: [
    { num: '01', title: 'Arrival in Fort Kochi', desc: 'Private transfer from Cochin International Airport to an ancestral colonial bungalow. Evening sunset walk along the cantilevered Chinese fishing nets.' },
    { num: '02', title: 'Maritime History & Spice Trails', desc: 'Guided walking tour through Mattancherry, visiting ancient synagogues, spice warehouses, and antique art galleries.' },
    { num: '03', title: 'Into the Backwater Labyrinth', desc: 'Board a private traditional rice barge for an overnight cruise across Vembanad lake with freshly prepared local meals.' },
    { num: '04', title: 'Ascent to the Cardamom Hills', desc: 'Private chauffeur-driven ascent into the Western Ghats, checking into a secluded plantation bungalow.' },
    { num: '05', title: 'The Art of Tea Cultivation', desc: 'Private estate walk with master tea makers, followed by an exclusive tea-pairing masterclass.' }
  ]
}

const relatedPosts = [
  { id: 'b2', title: 'The Silent Backwaters at Dawn', date: 'August 05, 2026', tags: ['#Photography', '#Kerala'], intro: 'Capturing the golden hour across the serene Vembanad lake.', img: '/images/home/itin-2.jpg', url: '/' },
  { id: 'b10', title: 'Plantation Life in Munnar', date: 'June 18, 2026', tags: ['#Heritage', '#Tea'], intro: 'Discovering tea cultivation in the misty hills of the Western Ghats.', img: '/images/home/stay-2.jpeg', url: '/' },
  { id: 'b14', title: 'The Spice Markets of Fort Kochi', date: 'May 20, 2026', tags: ['#Culinary', '#History'], intro: 'Tracing ancient maritime trade routes through scents of spice.', img: '/images/home/stay-1.jpeg', url: '/' }
]

const bannerData = {
  title: 'Ready to embark on this Malabar & Nilgiri expedition?',
  buttonText: 'Secure Your Dates',
  buttonUrl: '/planyourjourney',
  images: ['/images/home/stay-1.jpeg', '/images/home/stay-2.jpeg', '/images/home/stay-3.jpg']
}
</script>

<template>
  <main class="page-container w-full bg-[#F9F8F6] overflow-hidden">
    <!-- <HeroInner :hero-data="heroData" /> -->
    <!-- <IntroInnerCenter :data="introData" /> -->
    
    <!-- Itinerary Template Component -->
    <ItineraryTemplate :itinerary="itineraryData" />

    <RelatedPosts eyebrow="Complementary Reading" title-main="Related" title-highlight="Stories." :posts="relatedPosts" />
    <Banner :banner-data="bannerData" />
  </main>
</template>