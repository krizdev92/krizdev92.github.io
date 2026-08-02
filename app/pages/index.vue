<script setup>
// Setting dynamic SEO meta tags for the Home page
useHead({
  title: 'Home | Sreejith Travels',
  meta: [
    { name: 'description', content: 'Meaningful journeys. Thoughtfully crafted. Deeply connected.' }
  ]
})
</script>

<template>
  <div>
    <!-- Your Dynamic, WordPress-Connected Hero Component -->
    <HeroVideoMax />
    <AboutSection />
    <Itineraries />
    <Services />
    <Impact />
    <Awards />
    <Testimonials />
    <Blog />
    <Community />
    <Banner />
    
    <!-- Future modular sections (like Featured Itineraries or Our Story) will seamlessly stack below here -->
  </div>
</template>