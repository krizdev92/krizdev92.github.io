<script setup>
// Hero Data
const heroData = {
  eyebrow: 'Get In Touch',
  titleMain: 'Begin Your',
  titleItalic: 'Conversation.',
  intro: 'Connect with our concierge team to design your next handcrafted subcontinental journey.',
  bgImage: '/images/home/itin-1.jpg'
}

// Intro Left Data
const introData = {
  eyebrow: 'Personal Concierge',
  titleMain: 'We Are Here To',
  titleHighlight: 'Assist.',
  paragraph: 'Whether you prefer a direct phone dialogue, a WhatsApp message, or an email exchange—our travel designers respond thoughtfully to every inquiry.'
}

// Banner Data
const bannerData = {
  title: 'Tailor-made journeys designed specifically around your pace.',
  buttonText: 'Explore Destinations',
  buttonUrl: '/itineraries',
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
    <IntroInnerLeft :data="introData" />

    <!-- 3. Contact Component -->
    <ContactInner />

    <!-- 4. Bottom Banner -->
    <Banner :banner-data="bannerData" />
  </main>
</template>