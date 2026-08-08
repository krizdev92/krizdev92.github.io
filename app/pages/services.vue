<script setup>
// Hero Data
const heroData = {
  eyebrow: 'Comprehensive Solutions',
  titleMain: 'Our Scope Of',
  titleItalic: 'Expertise.',
  intro: 'From deeply personalized private routing to seamless white-label fulfillment for global travel partners.',
  bgImage: '/images/home/itin-2.jpg'
}

// Intro Center Data
const introData = {
  eyebrow: 'Strategic Execution',
  titleMain: 'Beyond',
  titleHighlight: 'Boundaries.',
  paragraph: 'Whether crafting a singular, transformative journey for an individual or acting as the logistical foundation for international lifestyle management firms, our commitment to perfection remains identical.'
}

// Banner Data
const bannerData = {
  title: 'Ready to discuss your specific travel or partnership requirements?',
  buttonText: 'Initiate Contact',
  buttonUrl: '/contact',
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

    <!-- 3. Main Services Component (B2B + Experience Design) -->
    <ServicesInner />

    <!-- 4. Bottom Banner -->
    <Banner :banner-data="bannerData" />

  </main>
</template>