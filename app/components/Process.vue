<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

// Accordion State (Defaults to first item open for Mobile/Tablet)
const activeAccordion = ref(0)

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index
}

// ==========================================
// CENTRAL JSON PAYLOAD (7 Process Steps)
// ==========================================
const processData = {
  header: {
    eyebrow: 'Process',
    titleMain: 'How we craft your',
    titleItalic: 'unforgettable journeys.',
    decorationImage: '/images/logoart.png',
    intro: 'A deliberate, seven-step process designed to turn subtle travel desires into masterfully curated, deeply authentic experiences.'
  },
  steps: [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Initial Alignment',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
      desc: 'We begin by listening to your travel dreams, pace preferences, and core expectations, establishing a shared vision for your upcoming journey.'
    },
    {
      num: '02',
      title: 'Decode',
      tagline: 'Uncovering Nuance',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>`,
      desc: 'We analyze your personal travel style and unspoken desires, translating raw ideas into a structured narrative tailored strictly to you.'
    },
    {
      num: '03',
      title: 'Research',
      tagline: 'Local Intelligence',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/></svg>`,
      desc: 'Our boots-on-the-ground regional experts identify hidden pathways, authentic encounters, and seasonal gems unavailable on public channels.'
    },
    {
      num: '04',
      title: 'Design',
      tagline: 'Architecting Route',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/></svg>`,
      desc: 'We draft a balanced day-by-day blueprint, harmonizing immersive cultural experiences with ample breathing room and luxury stays.'
    },
    {
      num: '05',
      title: 'Refine',
      tagline: 'Collaborative Polish',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      desc: 'Together, we review every single detail, tweaking pacing, dining options, and private transfers until the itinerary feels entirely seamless.'
    },
    {
      num: '06',
      title: 'Connect',
      tagline: 'Human Synergy',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      desc: 'We brief our trusted local hosts, private drivers, and specialist guides to ensure every transition on the ground is warm and effortless.'
    },
    {
      num: '07',
      title: 'Deliver',
      tagline: 'Unfolding Journey',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      desc: 'Your bespoke journey comes alive with 24/7 concierge support, allowing you to completely immerse yourself in every unscripted moment.'
    }
  ]
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        once: true
      }
    })

    // 1. Header Reveal (Instantly hidden by fromTo, slides down staggered)
    tl.fromTo('.process-header-elem', 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
    )
    
    // 2. Center/Side Spine Line (Scales out from top)
    .fromTo('.process-spine',
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power2.inOut', transformOrigin: 'top center' },
      "-=0.2"
    )

    // 3. Hexagons (Slide down rapidly)
    .fromTo('.hex-node',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out' },
      "-=0.3"
    )

    // 4. Icons (Fade + Zoom in from 0)
    .fromTo('.hex-icon',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'back.out(1.5)' },
      "-=0.3"
    )

    // 5. Horizontal Arms (Desktop only)
    .fromTo('.horizontal-arm',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, stagger: 0.06, duration: 0.2, ease: 'power2.out' },
      "-=0.3"
    )

    // 6. Data Cards (Slide down)
    .fromTo('.process-card-bg',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.2, ease: 'power2.out' },
      "-=0.8"
    )

    // 7. Text inside cards (Slide down)
    .fromTo('.card-text-elem',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.2, ease: 'power2.out' },
      "-=1.5"
    )

  }, sectionRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#2a2a2a] flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-14 md:mb-24">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <!-- Element 1: Eyebrow -->
        <h3 class="process-header-elem flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
          <span>{{ processData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
        </h3>

        <!-- Element 2 & 3: Separated Title for individual stagger -->
        <h4 
          class="process-header-elem flex flex-col text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#f9f8f6] capitalize mb-3 md:mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ processData.header.titleMain }}</span>
          <span class="font-normal text-[#C47551] italic">{{ processData.header.titleItalic }}</span>
        </h4>
        
        <!-- Element 4: Intro -->
        <p class="process-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-relaxed text-[#F9F8F6]/80 font-light max-w-2xl">
          {{ processData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= DESKTOP LAYOUT (>= 1024px) ================= -->
    <div class="hidden lg:block relative w-full max-w-[75rem] mx-auto px-12 z-10">
      
      <!-- Thick Central Spine Connecting the Hexagons -->
      <div class="process-spine absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[4px] bg-[#C47551]/50 z-0"></div>

      <div class="flex flex-col w-full relative">
        <div 
          v-for="(step, idx) in processData.steps" 
          :key="`desktop-${step.num}`"
          class="relative flex w-full items-center min-h-[160px] -my-12 pointer-events-none"
        >
          
          <!-- LARGE CENTRAL HEXAGON NODE -->
          <div class="hex-node absolute left-1/2 -translate-x-1/2 w-[88px] h-[101px] flex items-center justify-center z-20 drop-shadow-[0_0_15px_rgba(196, 117, 81,0.3)]">
            <!-- Outer Hexagon Border -->
            <div class="w-full h-full bg-[#C47551]/80 hex-shape flex items-center justify-center p-[2px]">
              <!-- Inner Hexagon Background -->
              <div class="w-full h-full bg-[#121415] hex-shape flex flex-col items-center justify-center gap-1">
                 <div class="hex-icon w-10 h-10 text-[#C47551]" v-html="step.icon"></div>
              </div>
            </div>
          </div>

          <!-- LEFT ALIGNED CARD (Even Index) -->
          <div v-if="idx % 2 === 0" class="group w-1/2 pr-[60px] xl:pr-[80px] flex justify-end relative z-10">
            <!-- Interconnecting Horizontal Arm -->
            <div class="horizontal-arm absolute right-0 top-1/2 -translate-y-1/2 w-[70px] xl:w-[90px] h-[2px] bg-[#C47551]/50 z-0 origin-right"></div>
            
            <div class="process-card-bg pointer-events-auto bg-[#1A1D1E] w-full max-w-[480px] p-8 rounded-2xl border-y border border-[#F9F8F6]/10 border-r-[#C47551] shadow-xl text-right relative overflow-hidden flex flex-col items-end transition-all duration-500 ease-out group-hover:border-[#C47551]">
              <!-- Watermark -->
              <div class="card-text-elem absolute top-1 left-1 w-28 h-28 text-[#C47551]/10 opacity-5 pointer-events-none" v-html="step.icon"></div>
              
              <div class="relative z-10 flex flex-col items-end">
                <span class="card-text-elem text-2xl font-serif text-[#C47551] font-medium opacity-90 mb-2">{{ step.num }}</span>
                <h3 class="card-text-elem text-xl text-[#F9F8F6] font-normal mb-1" style="font-family: 'Playfair Display', serif;">{{ step.title }}</h3>
                <span class="card-text-elem text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C47551] mb-3">{{ step.tagline }}</span>
                <p class="card-text-elem font-sans text-sm text-[#F9F8F6]/80 font-light leading-[1.8]">{{ step.desc }}</p>
              </div>
            </div>
          </div>

          <!-- RIGHT ALIGNED CARD (Odd Index) -->
          <div v-else class="group w-1/2 ml-auto pl-[60px] xl:pl-[80px] flex justify-start relative z-10">
            <!-- Interconnecting Horizontal Arm -->
            <div class="horizontal-arm absolute left-0 top-1/2 -translate-y-1/2 w-[70px] xl:w-[90px] h-[2px] bg-[#C47551]/50 z-0 origin-left"></div>
            
            <div class="process-card-bg pointer-events-auto bg-[#1A1D1E] w-full max-w-[480px] p-8 rounded-2xl border border-[#F9F8F6]/10 border-l-[#C47551] shadow-xl text-left relative overflow-hidden flex flex-col items-start transition-all duration-300 ease-out group-hover:border-[#C47551]">
              <!-- Watermark -->
              <div class="card-text-elem absolute top-1 right-1 w-32 h-32 text-[#C47551]/10 opacity-5 pointer-events-none" v-html="step.icon"></div>
              
              <div class="relative z-10 flex flex-col items-start">
                <span class="card-text-elem text-2xl font-serif text-[#C47551] font-medium opacity-90 mb-2">{{ step.num }}</span>
                <h3 class="card-text-elem text-xl text-[#F9F8F6] font-normal mb-1" style="font-family: 'Playfair Display', serif;">{{ step.title }}</h3>
                <span class="card-text-elem text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C47551] mb-3">{{ step.tagline }}</span>
                <p class="card-text-elem font-sans text-sm text-[#F9F8F6]/80 font-light leading-[1.8]">{{ step.desc }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <!-- ================= TABLET & MOBILE ACCORDION LAYOUT (< 1024px) ================= -->
    <div class="block lg:hidden relative w-full max-w-2xl mx-auto px-6 z-10 pl-[4.5rem]">
      
      <!-- Left Vertical Spine -->
      <div class="process-spine absolute left-[2.25rem] top-6 bottom-6 w-1 bg-gradient-to-b from-[#C47551]/20 via-[#C47551]/40 to-[#C47551]/20 rounded-full z-0"></div>

      <div class="flex flex-col gap-5 relative">
        <div 
          v-for="(step, idx) in processData.steps" 
          :key="`mobile-${step.num}`"
          class="relative flex items-start w-full cursor-pointer group"
          @click="toggleAccordion(idx)"
        >
          
          <!-- LEFT HEXAGON NODE -->
          <div class="hex-node absolute -left-[3.55rem] top-3 w-[46px] h-[54px] flex items-center justify-center z-20 transition-all duration-300 drop-shadow-md" :class="activeAccordion === idx ? 'scale-110 drop-shadow-[0_0_10px_rgba(196, 117, 81,0.5)]' : ''">
            <div class="w-full h-full bg-[#C47551] hex-shape flex items-center justify-center p-[1.5px]">
              <div class="w-full h-full bg-[#121415] hex-shape flex items-center justify-center text-[#C47551]">
                 <div class="hex-icon w-6 h-6" v-html="step.icon"></div>
              </div>
            </div>
          </div>

          <!-- ACCORDION CONTENT CARD -->
          <div 
            class="process-card-bg w-full bg-[#1A1D1E] p-5 md:p-6 rounded-2xl border transition-all duration-300 shadow-lg relative overflow-hidden"
            :class="activeAccordion === idx ? 'border-[#C47551]/60 bg-[#1e2224]' : 'border-white/5'"
          >
            <!-- Watermark -->
            <div class="card-text-elem absolute -bottom-2 -right-2 w-20 h-20 text-[#C47551]/10 opacity-[0.03] pointer-events-none" v-html="step.icon"></div>

            <div class="relative z-10 flex flex-col w-full">
              
              <!-- Header Row -->
              <div class="flex items-center justify-between mb-1.5 w-full">
                <div class="flex items-center gap-3">
                  <span class="card-text-elem text-[#C47551] font-bold font-sans text-sm md:text-base">{{ step.num }}</span>
                  <h3 class="card-text-elem text-[#F9F8F6] text-lg md:text-xl font-normal font-serif">{{ step.title }}</h3>
                </div>
                <!-- Expansion Angle Chevron -->
                <div class="text-[#C47551] transition-transform p-1 duration-300 shrink-0 ml-2 border border-[#C47551] rounded-full" :class="activeAccordion === idx ? 'rotate-180' : 'rotate-0'">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              <!-- Subtitle / Tagline -->
              <p class="card-text-elem text-[9px] md:text-[10px] text-[#C47551] font-bold tracking-[0.2em] uppercase mb-2">
                {{ step.tagline }}
              </p>

              <!-- Description -->
              <p 
                class="card-text-elem font-sans text-[13px] md:text-sm text-[#F9F8F6]/80 font-light transition-all duration-500 ease-in-out"
                :class="activeAccordion === idx ? 'line-clamp-none mt-2 opacity-100 leading-[1.7]' : 'line-clamp-1 opacity-60 leading-[1.5]'"
              >
                {{ step.desc }}
              </p>

            </div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-2 md:mt-6 pt-4 lg:pt-20 flex flex-col items-center gap-8 md:gap-10 relative z-20 services-cta-elem">
      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#C47551]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#f9f8f6] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#C47551]"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Perfect Hexagon CSS Polygon for Nodes */
.hex-shape {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
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