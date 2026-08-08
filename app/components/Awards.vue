<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const awardsData = {

  items: [
    { id: 2, img: '/images/awards/aw2.png', alt: 'Award 2' },
    { id: 3, img: '/images/awards/aw3.png', alt: 'Award 3' },
    { id: 5, img: '/images/awards/aw5.png', alt: 'Award 5' },
    { id: 6, img: '/images/awards/aw6.png', alt: 'Award 6' },
    { id: 8, img: '/images/awards/aw8.png', alt: 'Award 8' }
  ]
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true
    }
  })

  // Flexbox Grid Reveal
  tl.fromTo('.awards-item-elem',
    { opacity: 0, scale: 0.9, y: 20 },
    { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)' },
    "-=0.6"
  )

})
</script>

<template>
  <!-- Dark Styled Section (Consistent with Collaborated Itineraries) -->
  <section ref="sectionRef" class="relative w-full pt-4 md:pt-8 pb-4 md:pb-8 bg-[#f9f8f6] flex flex-col overflow-hidden">

    <!-- ================= FLEX AWARDS GRID ================= -->
    <div class="relative z-10 w-full max-w-[80rem] mx-auto px-6 md:px-12">
      <!-- Flexbox perfectly centers partly filled rows -->
      <div class="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
        
        <div 
          v-for="award in awardsData.items" 
          :key="award.id" 
          class="awards-item-elem flex items-center justify-center w-[70px] sm:w-[90px] lg:w-[110px] mx-3 my-2 h-auto cursor-pointer group perspective-1000"
        >
          <img 
            :src="award.img" 
            :alt="award.alt" 
            class="max-w-full h-auto object-contain opacity-80 grayscale sepia brightness-[0.65] contrast-[1.1] transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-[1.5] transform ease-[cubic-bezier(0.25,1,0.5,1)] drop-shadow-sm group-hover:drop-shadow-[0_10px_20px_rgba(112,62,25,0.2)]" 
          />
        </div>

      </div>
    </div>


  </section>
</template>

<style scoped>
/* Scroll Drop Animation */
.perspective-1000 {
  perspective: 1000px;
}
</style>