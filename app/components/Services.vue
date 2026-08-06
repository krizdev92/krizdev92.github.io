<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// --- Bulletproof Flip State for Touch Devices ---
const flippedCard = ref(null)
const toggleFlip = (index) => {
  // Only apply JS flip state if the device does NOT support hover
  if (window.matchMedia("(hover: none)").matches) {
    flippedCard.value = flippedCard.value === index ? null : index
  }
}
const clearFlip = () => {
  flippedCard.value = null
}

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const servicesData = {
  header: {
    eyebrow: 'Services',
    titleMain: 'Crafting Your',
    titleItalic: 'Perfect Journey.',
    decorationImage: '/images/logoart.png',
    intro: 'Beyond pre-planned routes, we offer comprehensive travel solutions to ensure every aspect of your exploration is flawlessly executed.'
  },
  services: [
    {
      id: 'bespoke',
      title: 'Bespoke Curation',
      icon: `<svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"></circle><polygon points="160 96 144 144 96 160 112 112 160 96"></polygon></svg>`,
      description: 'End-to-end itinerary design tailored meticulously to your specific pace, preferences, and cultural interests.'
    },
    {
      id: 'b2b',
      title: 'B2B Trade Partnerships',
      icon: `<svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><path d="M88,168l-32,32a24,24,0,0,1-34-34l32-32"></path><path d="M168,88l32-32a24,24,0,0,1,34,34l-32,32"></path><polygon points="168 88 120 40 40 120 88 168 168 88"></polygon><line x1="88" y1="168" x2="136" y2="216"></line><line x1="120" y1="136" x2="152" y2="104"></line></svg>`,
      description: 'Exclusive collaborations for boutique agencies and corporate retreats seeking authentic, on-ground local expertise.'
    },
    {
      id: 'culture',
      title: 'Cultural Immersions',
      icon: `<svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><path d="M96,40V216M160,40V216M32,72l64-32l64,32l64-32v144l-64,32l-64-32l-64,32Z"></path></svg>`,
      description: 'Hands-on workshops, village walks, and interactions connecting you directly with artisans and local historians.'
    },
    {
      id: 'sustainability',
      title: 'Sustainable Impact',
      icon: `<svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><path d="M216,40C216,40,168,32,120,80C72,128,72,216,72,216S120,224,168,176C216,128,216,40,216,40Z"></path><line x1="120" y1="80" x2="72" y2="216"></line></svg>`,
      description: 'Journeys designed to leave a lighter footprint, directly supporting conservation efforts and community economies.'
    }
  ],
  bottomCta: {
    text: 'Explore All Services',
    url: '/services',
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

  tl.fromTo('.services-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  tl.fromTo('.services-card-elem',
    { opacity: 0, y: 30, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, ease: 'power3.out' },
    "-=0.6"
  )
  tl.fromTo('.services-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.4"
  )
})
</script>

<template>
  <!-- <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-gradient-to-b from-[#fff9e0]/10 via-[#c97856]/20 to-[#f9f8f6]/20 flex flex-col overflow-hidden"> -->
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#f9f8f6]/20 flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-6 md:mb-8">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="services-header-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ servicesData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="services-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ servicesData.header.titleMain }}</span><br />
          <span class="font-normal leading-normal text-[#673b1c] italic capitalize">{{ servicesData.header.titleItalic }}</span>
        </h4>

        <div class="services-header-elem flex items-center justify-center gap-5 mb-6 w-full max-w-[200px] md:max-w-[280px]">
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
          <img :src="servicesData.header.decorationImage" alt="Decoration" class="w-[14px] h-[14px] md:w-[18px] md:h-[18px] opacity-60 brightness-0 pointer-events-none" />
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
        </div>

        <p class="services-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#1A1A1A]/80 font-light max-w-xl">
          {{ servicesData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= 3D FLIP CARDS LAYOUT ================= -->
    <!-- Max width tightened to perfectly frame the cards -->
    <div class="w-full max-w-[56rem] mx-auto px-4 md:px-12">
      <!-- Flex layout ensures exact equal horizontal and vertical gaps -->
      <div class="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
        
        <div 
          v-for="(service, idx) in servicesData.services" 
          :key="service.id" 
          class="services-card-elem group relative w-full max-w-[250px] sm:max-w-[280px] lg:max-w-[320px] aspect-square cursor-pointer perspective-1000"
          @click="toggleFlip(idx)"
          @mouseleave="clearFlip"
        >
          <!-- 3D Transform Wrapper -->
          <!-- .flip-inner is hooked up to pure CSS in <style scoped> for bulletproof desktop hovers -->
          <div 
            class="flip-inner relative w-full h-full transition-transform duration-[800ms] transform-style-3d shadow-sm group-hover:shadow-xl rounded-2xl"
            :class="{'rotate-y-180': flippedCard === idx}"
            style="transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);"
          >
            
            <!-- FRONT FACE (Dark Glassy Gradient + Visible Inner Border) -->
            <div class="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-gradient-to-br from-[#673b1c] to-[#08374d] flex flex-col items-center justify-center p-6 text-center text-[#F9F8F6]">
              
              <!-- Refined, more visible Inner Border -->
              <div class="absolute inset-3 md:inset-4 border border-white/30 rounded-xl pointer-events-none"></div>

              <div class="w-14 h-14 md:w-16 md:h-16 mb-5 text-[#F9F8F6]/90 transition-transform duration-500 group-hover:scale-110" v-html="service.icon"></div>
              <h3 class="text-2xl md:text-[28px] leading-tight drop-shadow-md px-2" style="font-family: 'Noto Serif', serif; font-weight: 400;">
                {{ service.title }}
              </h3>
            </div>
            
            <!-- BACK FACE (Soft Tinted Background & Description) -->
            <div class="absolute inset-0 backface-hidden rotate-y-180 border border-[#673b1c]/10 rounded-2xl overflow-hidden bg-[#ebf1f4] flex flex-col items-center justify-center p-6 md:p-8 lg:p-10 text-center">
              
              <!-- Subtle watermark icon -->
              <div class="absolute -bottom-6 -right-6 w-40 h-40 opacity-[0.03] text-[#673b1c] pointer-events-none" v-html="service.icon"></div>

              <div class="w-8 h-8 md:w-10 md:h-10 mb-3 text-[#673b1c]" v-html="service.icon"></div>
              <h3 class="text-lg md:text-xl lg:text-[22px] text-[#673b1c] mb-2 leading-tight" style="font-family: 'Noto Serif', serif;">
                {{ service.title }}
              </h3>
              <div class="w-6 h-[1.5px] bg-[#673b1c]/20 mb-3"></div>
              <p class="font-sans text-[13px] lg:text-[14px] leading-[1.6] text-[#1A1A1A]/90 font-light relative z-10">
                {{ service.description }}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-5 md:mt-8 pt-4 flex flex-col items-center gap-8 md:gap-10 relative z-20 services-cta-elem">
      
      <NuxtLink :to="servicesData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1A1A1A]/20 hover:border-[#673b1c] transition-colors duration-500 overflow-hidden rounded-sm">
        <div class="absolute inset-0 bg-[#673b1c] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="servicesData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase from-neutral-500">
          {{ servicesData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#1A1A1A] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </NuxtLink>

      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#673b1c]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#673b1c] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#673b1c]"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* 3D Transform Utilities */
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Bulletproof Desktop Hover Logic via Pure CSS Media Queries */
/* Only applies to devices with a primary fine pointer (mouse) */
@media (hover: hover) and (pointer: fine) {
  .group:hover .flip-inner {
    transform: rotateY(180deg);
  }
}

/* Scroll Drop Animation */
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
.animate-scroll-drop {
  animation: scrollDrop 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}
</style>