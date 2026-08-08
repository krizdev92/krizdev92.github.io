<script setup>
// Page Meta & Data
const heroData = {
  eyebrow: 'Here To Help',
  titleMain: 'Frequently Asked',
  titleItalic: 'Questions.',
  intro: 'Everything you need to know before initiating your journey with us.',
  bgImage: '/images/home/itin-2.jpg'
}

const introData = {
  eyebrow: 'Clarifications',
  titleMain: 'Questions,',
  titleHighlight: 'Answered.',
  paragraph: 'Find quick answers regarding our handcrafted itineraries, regional hosts, booking protocols, and bespoke travel philosophy.'
}

const bannerData = {
  title: 'Still have unanswered questions or specific requirements?',
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

    <!-- 2. Intro Left -->
    <IntroInnerCenter :data="introData" />

    <!-- 3. Main Accordion + Tabs Component -->
    <FaqInner />

    <!-- 4. Bottom Banner -->
    <Banner :banner-data="bannerData" />
  </main>
</template>