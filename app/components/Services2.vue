<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

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
      title: 'Experience Design',
      icon: `<svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><circle cx="128" cy="128" r="96"></circle><polygon points="160 96 144 144 96 160 112 112 160 96" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></polygon><line x1="160" y1="96" x2="112" y2="112" stroke-width="8"></line><line x1="96" y1="160" x2="144" y2="144" stroke-width="8"></line></svg>`,
      description: 'End-to-end itinerary design tailored meticulously to your specific pace, preferences, and cultural interests. We craft immersive journeys that transcend the ordinary, blending luxurious comfort with profound local connections to ensure every moment resonates with your personal travel philosophy.'
    },
    {
      id: 'b2b',
      title: 'B2B Partnerships',
      icon: `<svg viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M88,168l-32,32a24,24,0,0,1-34-34l32-32"></path><path d="M168,88l32-32a24,24,0,0,1,34,34l-32,32"></path><polygon points="168 88 120 40 40 120 88 168 168 88" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"></polygon><line x1="88" y1="168" x2="136" y2="216" stroke-width="8"></line><line x1="120" y1="136" x2="152" y2="104" stroke-width="8"></line></svg>`,
      description: 'Exclusive collaborations for boutique agencies, luxury concierges, and corporate retreats seeking authentic, on-ground local expertise. We operate as your seamless local extension, guaranteeing impeccable execution, privileged access, and unparalleled white-label service for your discerning clientele.'
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

  // 1. Reveal Header Elements
  tl.fromTo('.services-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power3.out' }
  )
  // 2. Reveal Card Backgrounds
  .fromTo('.services-card-bg',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out', immediateRender: true },
    "-=0.8"
  )
  // 3. Stagger Card Contents inside the visible cards
  .fromTo('.services-card-content > *',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', immediateRender: true },
    "-=0.6"
  )
  // 4. Reveal Bottom CTA
  .fromTo('.services-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', immediateRender: true },
    "-=0.4"
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#f9f8f6] flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-10 md:mb-14">
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
          <span class="font-normal leading-tight text-[#673b1c] italic capitalize">{{ servicesData.header.titleItalic }}</span>
        </h4>

        <p class="services-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#1A1A1A]/80 font-light max-w-xl">
          {{ servicesData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= 2-COLUMN SERVICES LAYOUT ================= -->
    <div class="w-full max-w-[75rem] mx-auto px-6 sm:px-20 lg:px-12">
      <!-- Flex layout: Stacked < 1024px (lg breakpoint), Side-by-side >= 1024px -->
      <div class="flex flex-col lg:flex-row items-stretch justify-center gap-8 md:gap-10 lg:gap-14">
        
        <div 
          v-for="(service, idx) in servicesData.services" 
          :key="service.id" 
          class="services-card-bg group relative flex-1 flex flex-col bg-gradient-to-br from-[#301706] to-[#361e0d] rounded-3xl md:rounded-[2.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-[#F9F8F6]/10 cursor-pointer hover:-translate-y-2 overflow-hidden"
        >
          
          <!-- Subtle Top Gradient Highlight on Hover -->
          <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F9F8F6]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"></div>

          <!-- Strict Z-Index 0 Watermark Icon (Moved outside content wrapper to prevent FOUC and ensure it stays behind text) -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 opacity-5 text-[#F9F8F6] pointer-events-none transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-6 z-0" v-html="service.icon"></div>

          <!-- Card Inner Content (Z-Index 10 ensures it stays above watermark) -->
          <div class="services-card-content flex flex-col items-center text-center p-8 md:p-12 lg:p-16 h-full w-full relative z-10">
            
            <!-- Primary Icon -->
            <div class="w-16 h-16 md:w-20 md:h-20 mb-6 lg:mb-8 text-[#F9F8F6] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 group-hover:scale-110 drop-shadow-sm shrink-0" v-html="service.icon"></div>
            
            <!-- Title -->
            <h3 class="text-[26px] md:text-3xl lg:text-[34px] leading-tight text-[#F9F8F6] mb-5 shrink-0" style="font-family: 'Noto Serif', serif; font-weight: 400;">
              {{ service.title }}
            </h3>
            
            <!-- Expanding Decorative Divider -->
            <div class="w-12 h-[1px] bg-[#F9F8F6]/20 mb-6 transition-all duration-700 ease-out group-hover:w-24 group-hover:bg-[#F9F8F6]/50 shrink-0"></div>
            
            <!-- Expanded Description (Flex-grow ensures identical bottom spacing) -->
            <p class="font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] text-[#F9F8F6]/80 font-light flex-grow max-w-[28rem]">
              {{ service.description }}
            </p>

            <!-- Subtle "Learn More" Arrow -->
            <div class="mt-8 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-[#F9F8F6] transform transition-transform duration-500 group-hover:translate-y-1"><path d="M12 5v14m0 0l-6-6m6 6l6-6"></path></svg>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-10 md:mt-14 pt-4 flex flex-col items-center gap-8 md:gap-10 relative z-20 services-cta-elem">
      
      <NuxtLink :to="servicesData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1A1A1A]/20 hover:border-[#673b1c] transition-colors duration-500 overflow-hidden rounded-sm">
        <div class="absolute inset-0 bg-[#673b1c] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="servicesData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
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
/* Ensure clean anti-aliasing for the elegant font */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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