<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const itineraryCatData = {
  backgrounds: {
    sectionTint: '#FFF9E0/10'
  },
  header: {
    eyebrow: 'Categorized Itineraries',
    titleMain: 'Travel your way&nbsp;',
    titleItalic: 'Discover Your Style.',
    subtitles: [
      'Crafted Around you'
    ]
  },
  bottomCta: {
    text: 'Explore Categories',
    url: '/itineraries',
    icon: '/images/logoart.png',
  },
  travelYourWay: {
    id: 'tyw',
    intro: 'Explore by what moves you. Select a path below to begin crafting your bespoke journey.',
    items: [
      {
        title: 'Nature & Wilderness',
        url: '/',
        // Exactly 99 chars for perfect uniform 3-line layouts
        desc: 'Wander pristine landscapes, ancient forests, and rugged coastlines that inspire deep reconnection.',
        // Mid-tone Emerald/Sage
        bgGradient: 'linear-gradient(135deg, #6B8E7B 0%, #527361 100%)',
        baseBorder: '#88A896',
        hoverBorder: '#A5C7B3',
        icon: `<path d="M12 22V3" /><path d="M12 18c-3.5 0-6-2.5-6-5.5 3 1 6 1 6 5.5z" stroke-width="1.5"/><path d="M12 18c3.5 0 6-2.5 6-5.5-3 1-6 1-6 5.5z" stroke-width="1.5"/><path d="M12 11c-2.5 0-4.5-1.5-4.5-4 2 .5 4.5.5 4.5 4z" stroke-width="1.5"/><path d="M12 11c2.5 0 4.5-1.5 4.5-4-2 .5-4.5.5-4.5 4z" stroke-width="1.5"/><path d="M12 5c-1.5 0-3-1-3-3 1.5.5 3 .5 3 3z" stroke-width="1.5"/><path d="M12 5c1.5 0 3-1 3-3-1.5.5-3 .5-3 3z" stroke-width="1.5"/>`
      },
      {
        title: 'Culture & Heritage',
        url: '/',
        // Exactly 99 chars
        desc: 'Step into timeless traditions, storied monuments, and living heritage that shape the region\'s soul.',
        // Mid-tone Terracotta
        bgGradient: 'linear-gradient(135deg, #A86A51 0%, #8C533D 100%)',
        baseBorder: '#C78870',
        hoverBorder: '#E0A38B',
        icon: `<path d="M12 2L8 6v3H5v3h1v10h12V12h1V9h-3V6L12 2z" stroke-width="1.5"/><path d="M10 22v-6a2 2 0 014 0v6" stroke-width="1.5"/><path d="M7 12h10M8 9h8M9 6h6M4 22h16" stroke-width="1.5"/><path d="M12 6v3M9 9v3M15 9v3M7 12v4M17 12v4M12 2v2" stroke-width="1.5"/>`
      },
      {
        title: 'Places to Stay',
        url: '/',
        // Exactly 99 chars
        desc: 'Explore carefully curated stays that complement your journey with comfort, culture, and hospitality.',
        // Mid-tone Slate Blue
        bgGradient: 'linear-gradient(135deg, #5C768D 0%, #465E73 100%)',
        baseBorder: '#7A95AD',
        hoverBorder: '#94B0C7',
        icon: `<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8.5Z" stroke-width="1.5"/><path d="M9 21v-6h6v6M8 11h2M14 11h2" stroke-width="1.5"/>`,      
      },
      {
        title: 'Offbeat Explorations',
        url: '/',
        // Exactly 99 chars
        desc: 'Venture beyond familiar routes into hidden sanctuaries and rare experiences few travelers ever see.',
        // Mid-tone Amethyst
        bgGradient: 'linear-gradient(135deg, #826285 0%, #694C6B 100%)',
        baseBorder: '#A182A3',
        hoverBorder: '#BA9DBF',
        icon: `<path d="M12 2l6 6-6 6-6-6 6-6z" stroke-width="1.5"/><path d="M12 14v8M8 22h8M12 2v12" stroke-width="1.5"/><path d="M9 5l-3 3 3 3M15 5l3 3-3 3" stroke-width="1.5"/><path d="M12 8l2 2-2 2-2-2 2-2z" stroke-width="1.5"/>`
      },
      {
        title: 'Wellness & Spirit',
        url: '/',
        // Exactly 100 chars
        desc: 'Find absolute balance and inner calm through mindful practices, sacred spaces, and holistic healing.',
        // Mid-tone Antique Gold
        bgGradient: 'linear-gradient(135deg, #9C8356 0%, #806A42 100%)',
        baseBorder: '#BFA575',
        hoverBorder: '#D9BF8F',
        icon: `<path d="M12 20c0-5-4.5-9-4.5-9S3.5 15 3.5 20h8.5z" stroke-width="1.5"/><path d="M12 20c0-5-4.5-9-4.5-9S20.5 15 20.5 20h-8.5z" stroke-width="1.5"/><path d="M12 20c-4-7-1.5-13-1.5-13S14 11 12 20z" stroke-width="1.5"/><path d="M12 20c4-7 1.5-13 1.5-13S10 11 12 20z" stroke-width="1.5"/><path d="M1 20h22" stroke-width="1.5"/><path d="M12 6V2M10 2h4" stroke-width="1.5"/>`
      },
      {
        title: 'Bespoke Luxury',
        url: '/',
        // Exactly 99 chars
        desc: 'Indulge in carefully curated luxury, exclusive retreats, and sophisticated comfort at every moment.',
        // Mid-tone Oceanic Teal
        bgGradient: 'linear-gradient(135deg, #578587 0%, #436B6D 100%)',
        baseBorder: '#76A6A8',
        hoverBorder: '#92C1C4',
        icon: `<path d="M2 12l5.25-5 2.625 3 2.625-3L17.75 12 22 8v12H2V8z" stroke-width="1.5"/><circle cx="12" cy="7" r="2" stroke-width="1.5"/>`
      }
    ]
  }
}

// ==========================================
// DRAG-TO-SCROLL LOGIC WITH INERTIA (Mobile)
// ==========================================
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
let dragThresholdMet = false
let velX = 0
let lastX = 0
let rafId = null

const onMouseDown = (e) => {
  if (window.innerWidth >= 768) return // Only for mobile horizontal view
  isDragging.value = true
  dragThresholdMet = false
  const slider = e.currentTarget
  slider.classList.add('cursor-grabbing')
  slider.classList.remove('cursor-grab')
  startX.value = e.pageX - slider.offsetLeft
  scrollLeft.value = slider.scrollLeft
  cancelAnimationFrame(rafId)
  lastX = e.pageX
  velX = 0
}

const onMouseLeave = (e) => {
  if (!isDragging.value) return
  onMouseUpOrLeave(e)
}

const onMouseUpOrLeave = (e) => {
  if (!isDragging.value) return
  isDragging.value = false
  const slider = e.currentTarget
  slider.classList.remove('cursor-grabbing')
  slider.classList.add('cursor-grab')
  
  if (dragThresholdMet) {
    beginInertia(slider)
  }
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  const slider = e.currentTarget
  const currentX = e.pageX
  const x = currentX - slider.offsetLeft
  const walk = (x - startX.value) * 1.5
  slider.scrollLeft = scrollLeft.value - walk
  
  velX = lastX - currentX
  lastX = currentX

  if (Math.abs(walk) > 5) {
    dragThresholdMet = true
  }
}

const beginInertia = (slider) => {
  const friction = 0.94
  const step = () => {
    if (Math.abs(velX) > 0.5 && !isDragging.value) {
      slider.scrollLeft += velX
      velX *= friction
      rafId = requestAnimationFrame(step)
    }
  }
  rafId = requestAnimationFrame(step)
}

const preventClickIfDragged = (e) => {
  if (dragThresholdMet) {
    e.preventDefault()
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

  // 1. Header Elements
  tl.fromTo('.itin-tra-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  
  // 2. Category Title & Intro
  .fromTo('.itin-tra-group-elem > div:first-child',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: true },
    "-=0.8" 
  )
  
  // 3. Cards Stagger (Revealing one after the other)
  .fromTo('.itin-tra-group-elem a',
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.2)', immediateRender: true },
    "-=0.6" 
  )
  
  // 4. CTA Button & Line
  .fromTo('.itin-tra-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', immediateRender: true },
    "-=0.4" 
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 flex flex-col overflow-hidden" :style="{ backgroundColor: itineraryCatData.backgrounds.sectionTint }">

    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-18 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-5xl flex flex-col items-center text-center">
        <h3 class="itin-tra-header-elem flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ itineraryCatData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h4 class="itin-tra-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-3 md:mb-4" style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;">
          <span class="font-normal" v-html="itineraryCatData.header.titleMain"></span>
          <span class="font-normal leading-tight text-[#673b1c] italic"><br />{{ itineraryCatData.header.titleItalic }}</span>
        </h4>
        <p class="itin-tra-header-elem font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-relaxed max-w-2xl">
          {{ itineraryCatData.travelYourWay.intro }}
        </p>
      </div>
    </div>

    <!-- ================= CATEGORY LISTINGS ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-0 md:px-8 lg:px-12 xl:px-16 flex flex-col gap-4 md:gap-6">
      
      <!-- TRAVEL YOUR WAY block -->
      <div :id="itineraryCatData.travelYourWay.id" class="itin-tra-group-elem w-full flex flex-col mb-2 md:mb-4">

        <!-- 
          Responsive Wrapper: 
          Mobile: Horizontal Swipe
          Tablet (md): 2-Column Grid
          Desktop (lg): 3-Column Grid 
        -->
        <div 
          class="flex md:grid overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 px-6 md:px-0 pb-6 pt-2 relative z-10 cursor-grab md:cursor-auto"
          @mousedown="onMouseDown"
          @mouseleave="onMouseLeave"
          @mouseup="onMouseUpOrLeave"
          @mousemove="onMouseMove"
        >
          <!-- Landscape Custom Colored Card -->
          <NuxtLink 
            v-for="(cat, idx) in itineraryCatData.travelYourWay.items" 
            :key="`tyw-${idx}`" 
            :to="cat.url" 
            @click="preventClickIfDragged"
            class="custom-tyw-card group flex flex-col relative shrink-0 scroll-snap-align-start rounded-[1.25rem] overflow-hidden w-[85vw] md:w-auto h-full border border-transparent"
            :style="{
              background: cat.bgGradient,
              borderColor: cat.baseBorder,
              '--hover-border': cat.hoverBorder
            }"
            @dragstart.prevent
          >
            
            <!-- Faint Background Watermark Icon -->
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              v-html="cat.icon" 
              class="absolute -bottom-6 -right-6 w-36 h-36 md:w-40 md:h-40 opacity-[0.06] text-[#F9F8F6] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-[1.5s] pointer-events-none"
            ></svg>

            <!-- Card Content (Internal Layout structured for Landscape width) -->
            <div class="relative p-6 lg:p-7 flex flex-col h-full z-20 w-full">
              
              <!-- Fixed Top Row: Icon + Title -->
              <div class="flex items-center gap-4 mb-4">
                <!-- Strict Icon Container to guarantee alignment -->
                <div class="w-12 h-12 shrink-0 flex items-center justify-center text-[#F9F8F6] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" v-html="cat.icon" class="w-8 h-8"></svg>
                </div>
                <h3 class="text-[19px] lg:text-[21px] text-[#F9F8F6] leading-tight drop-shadow-sm" style="font-family: 'Noto Serif', serif; font-weight: 500;">
                  {{ cat.title }}
                </h3>
              </div>

              <!-- Decorative Divider -->
              <div class="w-full h-[1px] bg-[#F9F8F6]/10 mb-4 transition-all duration-500 group-hover:bg-[#F9F8F6]/20"></div>

              <!-- Description Body (Fixed char count naturally aligns rows) -->
              <div class="flex-grow flex flex-col justify-start mb-6">
                <p class="font-sans text-[13px] lg:text-[14px] text-[#F9F8F6]/90 font-light leading-[1.6]">
                  {{ cat.desc }}
                </p>
              </div>

              <!-- Aligned Discover Button -->
              <div class="mt-auto w-full flex justify-end">
                <div class="flex items-center justify-center gap-2.5 px-5 py-2.5 border border-[#F9F8F6]/30 bg-transparent text-[#F9F8F6] stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A] group-hover:text-[#1A1A1A] group-hover:bg-[#F9F8F6] group-hover:border-[#F9F8F6] transition-all duration-500 rounded-sm">
                  <span class="font-sans text-[9px] tracking-[0.2em] font-bold uppercase mt-[1px]">Discover</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-500 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </div>
              </div>

            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ================= BOTTOM CTA BUTTON & DECORATIVE LINE ================= -->
    <div class="itin-tra-cta-elem w-full mt-2 md:mt-6 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-10">
      <NuxtLink :to="itineraryCatData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1A1A1A]/20 hover:border-[#673b1c] transition-colors duration-500 overflow-hidden rounded-sm">
        <div class="absolute inset-0 bg-[#673b1c] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="itineraryCatData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ itineraryCatData.bottomCta.text }}
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
/* 
  Custom Refined Shadows
  Noticeably reduced spread for a neater look
*/
.custom-tyw-card {
  transition: border-color 0.5s ease, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.custom-tyw-card:hover {
  border-color: var(--hover-border) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
  transform: translateY(-4px);
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
.animate-scroll-drop {
  animation: scrollDrop 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}
</style>