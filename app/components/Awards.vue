<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const awardsData = {
  header: {
    eyebrow: 'Awards',
    titleMain: 'Recognized for',
    titleItalic: 'uncompromising excellence.',
    decorationImage: '/images/logoart.png',
    intro: 'Our dedication to crafting extraordinary journeys and preserving local heritage has been celebrated by the world\'s leading travel authorities.'
  },
  items: [
    { id: 1, img: '/images/awards/aw1.png', alt: 'Award 1' },
    { id: 2, img: '/images/awards/aw2.png', alt: 'Award 2' },
    { id: 3, img: '/images/awards/aw3.png', alt: 'Award 3' },
    { id: 4, img: '/images/awards/aw4.png', alt: 'Award 4' },
    { id: 5, img: '/images/awards/aw5.png', alt: 'Award 5' },
    { id: 6, img: '/images/awards/aw6.png', alt: 'Award 6' },
    { id: 7, img: '/images/awards/aw7.png', alt: 'Award 7' },
    { id: 8, img: '/images/awards/aw8.png', alt: 'Award 8' }
  ],
  bottomCta: {
    text: 'View Our Accolades',
    url: '/awards',
    icon: '/images/logoart.png'
  }
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

  // Header Reveal
  tl.fromTo('.awards-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  // Flexbox Grid Reveal
  .fromTo('.awards-item-elem',
    { opacity: 0, scale: 0.9, y: 20 },
    { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)' },
    "-=0.6"
  )
  // CTA & Line Reveal
  .fromTo('.awards-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.4"
  )
})
</script>

<template>
  <!-- Dark Grayish Glassmorphic Section -->
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#f9f8f6]/20 backdrop-blur-xl border-y border-[#F9F8F6]/5 flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-6 md:mb-8">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="awards-header-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ awardsData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="awards-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ awardsData.header.titleMain }}</span><br />
          <!-- Ice/Dark Mode equivalent of the cyan blue -->
          <span class="font-normal leading-normal text-[#196285] italic capitalize">{{ awardsData.header.titleItalic }}</span>
        </h4>

        <div class="awards-header-elem flex items-center justify-center gap-5 mb-6 w-full max-w-[200px] md:max-w-[280px]">
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
          <!-- Inverted for dark mode -->
          <img :src="awardsData.header.decorationImage" alt="Decoration" class="w-[14px] h-[14px] md:w-[18px] md:h-[18px] opacity-60 invert pointer-events-none" />
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
        </div>

        <p class="awards-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#1A1A1A]/70 font-light max-w-xl">
          {{ awardsData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= FLEX AWARDS GRID ================= -->
    <div class="relative z-10 w-full max-w-[80rem] mx-auto px-6 md:px-12">
      <!-- Flexbox perfectly centers partly filled rows -->
      <div class="flex flex-wrap justify-center items-center gap-5 md:gap-8 lg:gap-10">
        
        <div 
          v-for="award in awardsData.items" 
          :key="award.id" 
          class="awards-item-elem flex items-center justify-center w-[100px] sm:w-[120px] md:w-[140px] ml-4 mr-4 h-auto cursor-pointer group perspective-1000"
        >
          <img 
            :src="award.img" 
            :alt="award.alt" 
            class="max-w-full h-auto object-contain saturate-50 opacity-80 transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:saturate-150 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-lg" 
          />
        </div>

      </div>
    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-5 md:mt-8 pt-6 flex flex-col items-center gap-8 md:gap-10 relative z-20 awards-cta-elem">
      
      <!-- Button adapted for dark mode -->
      <NuxtLink :to="awardsData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1a1a1a]/20 hover:border-[#196285] transition-colors duration-500 overflow-hidden rounded-sm bg-transparent">
        <div class="absolute inset-0 bg-[#196285] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="awardsData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ awardsData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#1a1a1a] group-hover:text-[#f9f8f6] transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </NuxtLink>

      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#196285]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#196285] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#196285]/80"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Scroll Drop Animation */
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
.animate-scroll-drop {
  animation: scrollDrop 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>