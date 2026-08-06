<script setup>
import ItinerariesTravelYourWay2 from '~/components/ItinerariesTravelYourWay2.vue';
import Process from '~/components/Process.vue';

// Setting dynamic SEO meta tags for the Home page
useHead({
  title: 'Home | Sreejith Travels',
  meta: [
    { name: 'description', content: 'Meaningful journeys. Thoughtfully crafted. Deeply connected.' }
  ]
})
</script>

<template>
  <main>
    <HeroVideoMax />
    <AboutSection />
    <!-- <ItinerariesSignature /> -->
    <!-- <ItinerariesCollaborated /> -->
    <!-- <ItinerariesTravelYourWay /> -->
    <ItinerariesSignature2 />
    <ItinerariesCollaborated2 />
    <ItinerariesTravelYourWay2 />
    <!-- <Services /> -->
    <Services2 />
    <Process />
    <Impact />
    <!-- <Testimonials /> -->
    <Testimonials2 />
    <Blog />
    <Community />
    <Banner />
    
    <!-- Future modular sections (like Featured Itineraries or Our Story) will seamlessly stack below here -->
  </main>
</template>