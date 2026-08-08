<script setup>
// Hero Data
const heroData = {
  eyebrow: 'Our Journal',
  titleMain: 'Stories from the',
  titleItalic: 'road less traveled.',
  intro: 'Immerse yourself in our latest explorations, travel guides, and cultural insights from across the subcontinent and beyond.',
  bgImage: '/images/home/itin-1.jpg' // Use your cinematic blog hero image
}

// Intro Center Data
const introData = {
  eyebrow: 'Chronicles',
  titleMain: 'Curated',
  titleHighlight: 'Insights.',
  paragraph: 'From hidden sanctuaries to ancient culinary traditions, explore our firsthand accounts and deep-dives into the nuances of conscious, slow travel.'
}

// Banner Data
const bannerData = {
  title: 'Ready to turn these stories into your own personal journey?',
  buttonText: 'Plan Your Route',
  buttonUrl: '/planyourjourney',
  images: [
    '/images/home/stay-1.jpeg',
    '/images/home/stay-2.jpeg',
    '/images/home/stay-3.jpg'
  ]
}
</script>

<template>
  <main>
    <!-- 1. Hero Header -->
    <HeroInner :hero-data="heroData" />

    <!-- 2. Intro Center -->
    <IntroInnerCenter :data="introData" />

    <!-- 3. Blog Listing Component -->
    <BlogInner />

    <!-- 4. Bottom Banner -->
    <Banner :banner-data="bannerData" />
  </main>
</template>