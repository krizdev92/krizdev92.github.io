<script setup>

const heroData = {
  eyebrow: 'Guest Guidelines',
  titleMain: 'Terms of',
  titleItalic: 'Engagement.',
  intro: 'Clear terms and mutual understandings for all our handcrafted subcontinental routes.',
  bgImage: '/images/home/itin-4.jpg'
}
const termsIntroData = {
  paragraph: 'By confirming a handcrafted journey or engaging our private concierge services, you enter into a mutual understanding built on complete operational clarity, respect for regional ecosystems, and shared travel responsibility.'
}

const bannerData = {
  title: 'Ready to design a deliberate, handcrafted journey?',
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
    <HeroInner :hero-data="heroData" />
    <IntroInnerLeft :data="termsIntroData" />
    <TermsAndConditionsInner />
    <Banner :banner-data="bannerData" />
  </main>
</template>