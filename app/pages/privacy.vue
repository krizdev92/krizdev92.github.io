<script setup>

const heroData = {
  eyebrow: 'Legal & Safeguards',
  titleMain: 'Digital Privacy',
  titleItalic: 'With Intent.',
  intro: 'Transparent practices regarding how we gather, protect, and handle your travel preferences.',
  bgImage: '/images/home/itin-3.jpg'
}

const privacyIntroData = {
  paragraph: 'Your trust is the foundation of every route we design. We handle your personal details with absolute discretion and technical rigor, ensuring your digital privacy is held to the exact same standard as your physical comfort on the ground.'
}

const bannerData = {
  title: 'Have questions about your data or travel arrangements?',
  buttonText: 'Get In Touch',
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
    <HeroInner :hero-data="heroData" />
    <IntroInnerLeft :data="privacyIntroData" />
    <PrivacyPolicyInner />
    <Banner :banner-data="bannerData" />
  </main>
</template>