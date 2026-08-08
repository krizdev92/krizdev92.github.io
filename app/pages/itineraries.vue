<script setup>

// Custom data payload for Itineraries page
const itineraryBanner = {
  title: 'Tailor-made journeys designed specifically around your pace.',
  buttonText: 'Explore Destinations',
  buttonUrl: '/Itineraries',
  images: [
    '/images/home/stay-1.jpeg',
    '/images/home/stay-2.jpeg',
    '/images/home/stay-3.jpg'
  ]
}
</script>

<template>
  <main class="page-container">
    <Banner :banner-data="itineraryBanner" />
  </main>
</template>