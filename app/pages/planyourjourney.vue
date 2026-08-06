<script setup>
useHead({
  title: 'Plan Your Journey | Bespoke Experiences'
})
</script>

<template>
  <main class="min-h-screen w-full bg-[#F9F8F6]">
    <div class="w-full bg-[#E2E8F0] pt-32 pb-24 px-4 md:px-8 lg:px-12 min-h-screen flex items-start justify-center">
      
      <!-- Max width wrapper constraints the form cleanly in the center -->
      <div class="w-full max-w-5xl mx-auto">
        <JourneyPlanner />
      </div>
      
    </div>
  </main>
</template>