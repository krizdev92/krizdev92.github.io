<script setup>
const heroData = {
  eyebrow: 'Photo Journal',
  titleMain: 'The Silent',
  titleItalic: 'Backwaters.',
  intro: 'A visual exploration of dawn across the serene Vembanad lake.',
  bgImage: '/images/home/itin-2.jpg'
}

const introData = {
  eyebrow: 'Visual Essay',
  titleMain: 'Mirrors Of',
  titleHighlight: 'Morning.',
  paragraph: 'Experience the misty, unhurried waking hours of Kerala’s legendary inland waterways through our lens.'
}

const postData = {
  title: 'The Silent Backwaters at Dawn',
  category: '#Photography & Landscapes',
  date: 'August 05, 2026',
  readTime: '4 min read',
  heroImg: '/images/home/itin-2.jpg',
  secondaryImg: '/images/home/stay-2.jpeg',
  intro: 'Capturing the golden hour across the serene Vembanad lake, where life moves at the gentle pace of a wooden canoe.',
  body: 'Long before the motorized houseboats churn the emerald waters of Vembanad, the dawn belongs entirely to the local punter-boat operators and migratory waterfowl. There is a precise hour just as the sun clears the coconut palms when the water turns into a seamless mirror, reflecting the bruised violet and gold of the tropical sky.'
}

const relatedPosts = [
  { id: 'b1', title: 'Tracking the Elusive Snow Leopard', date: 'August 12, 2026', tags: ['#Wildlife', '#Himalayas'], intro: 'Journey deep into the high-altitude deserts of Spiti Valley.', img: '/images/home/itin-1.jpg', url: '/blog/snow-leopard' },
  { id: 'b14', title: 'The Spice Markets of Fort Kochi', date: 'May 20, 2026', tags: ['#Culinary', '#History'], intro: 'Tracing ancient maritime trade routes through scents of spice.', img: '/images/home/stay-1.jpeg', url: '/blog/kochi-spices' },
  { id: 'b25', title: 'Bespoke Flavors of Chettinad', date: 'March 01, 2026', tags: ['#Culinary', '#Heritage'], intro: 'Tasting traditional cuisine within grand Tamil mansions.', img: '/images/home/itin-1.jpg', url: '/blog/chettinad-flavors' }
]

const bannerData = {
  title: 'Immerse yourself in the unhurried grace of the backwaters.',
  buttonText: 'Plan Your Route',
  buttonUrl: '/planyourjourney',
  images: ['/images/home/stay-1.jpeg', '/images/home/stay-2.jpeg', '/images/home/stay-3.jpg']
}
</script>

<template>
  <main class="page-container w-full bg-[#F9F8F6] overflow-hidden">
    <!-- <HeroInner :hero-data="heroData" /> -->
    <!-- <IntroInnerCenter :data="introData" /> -->
    
    <!-- Template Split Component -->
    <BlogTemplateSplit :post="postData" />

    <RelatedPosts eyebrow="Visual Journals" title-main="Related" title-highlight="Journals." :posts="relatedPosts" />
    <Banner :banner-data="bannerData" />
  </main>
</template>