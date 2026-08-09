<script setup>
// The slideshow data is currently centralized inside the BlogTemplateSlideshow component.
// No additional page-level data routing is needed unless you decide to pass it as a prop later.

// Optional: Set page meta for SEO
useHead({
  title: '10 Fruits To Eat During Rainy Season | Sreejith Travel',
  meta: [
    { name: 'description', content: 'Discover the best immunity-boosting fruits to consume during the monsoon season for optimal wellness.' }
  ]
})
</script>

<template>
  <!-- 
    Dark background wrapper ensures seamless blending 
    with the component's ambient gradient 
  -->
  <main>
    
    <!-- Full-Screen Interactive Slideshow Template -->
    <BlogTemplateSlideshow />

  </main>
</template>