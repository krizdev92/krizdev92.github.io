<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const itineraryData = {
  backgrounds: {
    sectionTint: '#FFF9E0/10'
  },
  header: {
    eyebrow: 'Itineraries',
    titleMain: 'Enriched Experiences&nbsp;',
    titleItalic: 'That moves you.',
    decorationImage: '/images/logoart.png',
    subtitles: [
      'Personally Curated',
      'Designed with Trusted Collaborators',
      'Crafted Around you'
    ]
  },
  bottomCta: {
    text: 'Explore Our Itineraries',
    url: '/itineraries'
  },
  travelYourWay: {
    id: 'tyw',
    title: 'Travel Your Way',
    intro: 'Explore by what moves you. Select a path below to begin crafting your bespoke journey.',
    aspect: '4/5',
    items: [
      {
        title: 'Nature & Wilderness',
        url: '/',
        desc: 'Wander through mountains, rivers, forests and coastlines that inspire and reconnect you.',
        img: '/images/home/itin-4.jpg',
        icon: `<path d="M12 22V3" /><path d="M12 18c-3.5 0-6-2.5-6-5.5 3 1 6 1 6 5.5z" stroke-width="1.2"/><path d="M12 18c3.5 0 6-2.5 6-5.5-3 1-6 1-6 5.5z" stroke-width="1.2"/><path d="M12 11c-2.5 0-4.5-1.5-4.5-4 2 .5 4.5.5 4.5 4z" stroke-width="1.2"/><path d="M12 11c2.5 0 4.5-1.5 4.5-4-2 .5-4.5.5-4.5 4z" stroke-width="1.2"/><path d="M12 5c-1.5 0-3-1-3-3 1.5.5 3 .5 3 3z" stroke-width="1.2"/><path d="M12 5c1.5 0 3-1 3-3-1.5.5-3 .5-3 3z" stroke-width="1.2"/>`
      },
      {
        title: 'Culture & Heritage',
        url: '/',
        desc: 'Step into timeless traditions, ancient stories and living heritage that shape places and people.',
        img: '/images/home/itin-5.jpg',
        icon: `<path d="M12 2L8 6v3H5v3h1v10h12V12h1V9h-3V6L12 2z" stroke-width="1.2"/><path d="M10 22v-6a2 2 0 014 0v6" stroke-width="1.2"/><path d="M7 12h10M8 9h8M9 6h6M4 22h16" stroke-width="1.2"/><path d="M12 6v3M9 9v3M15 9v3M7 12v4M17 12v4M12 2v2" stroke-width="1.2"/>`
      },
      {
        title: 'Nature & Landscapes',
        url: '/',
        desc: 'Savour local flavours, age-old recipes and culinary traditions that reveal the soul of a destination.',
        img: '/images/home/itin-6.jpg',
        icon: `<path d="M3 20h18L15 9l-4 6-3-4-5 9z" stroke-width="1.2"/><circle cx="16" cy="6" r="2" stroke-width="1.2"/>`
      },
      {
        title: 'Offbeat Explorations',
        url: '/',
        desc: 'Venture beyond the usual routes into hidden gems and rare experiences few get to see.',
        img: '/images/home/itin-3.jpg',
        icon: `<path d="M12 2l6 6-6 6-6-6 6-6z" stroke-width="1.2"/><path d="M12 14v8M8 22h8M12 2v12" stroke-width="1.2"/><path d="M9 5l-3 3 3 3M15 5l3 3-3 3" stroke-width="1.2"/><path d="M12 8l2 2-2 2-2-2 2-2z" stroke-width="1.2"/>`
      },
      {
        title: 'Wellness & Spirit',
        url: '/',
        desc: 'Find balance and inner calm through mindful experiences, sacred places and soulful practices.',
        img: '/images/home/itin-1.jpg',
        icon: `<path d="M12 20c0-5-4.5-9-4.5-9S3.5 15 3.5 20h8.5z" stroke-width="1.2"/><path d="M12 20c0-5 4.5-9 4.5-9S20.5 15 20.5 20h-8.5z" stroke-width="1.2"/><path d="M12 20c-4-7-1.5-13-1.5-13S14 11 12 20z" stroke-width="1.2"/><path d="M12 20c4-7 1.5-13 1.5-13S10 11 12 20z" stroke-width="1.2"/><path d="M1 20h22" stroke-width="1.2"/><path d="M12 6V2M10 2h4" stroke-width="1.2"/>`
      }
    ]
  }
}

// ==========================================
// DRAG-TO-SCROLL LOGIC WITH INERTIA
// ==========================================
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
let dragThresholdMet = false
let velX = 0
let lastX = 0
let rafId = null

const onMouseDown = (e) => {
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

  tl.fromTo('.itin-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power3.out' }
  )
  tl.fromTo('.itin-group-elem',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, stagger: 0.25, duration: 1, ease: 'power3.out' },
    "-=0.8" 
  )
  tl.fromTo('.itin-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.6" 
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 flex flex-col overflow-hidden" :style="{ backgroundColor: itineraryData.backgrounds.sectionTint }">

    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-18 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-5xl flex flex-col items-center text-center">
        <h3 class="itin-header-elem flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ itineraryData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h4 class="itin-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-3 md:mb-4" style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;">
          <span class="font-normal" v-html="itineraryData.header.titleMain"></span>
          <span class="font-normal leading-normal text-[#673b1c] italic"><br />{{ itineraryData.header.titleItalic }}</span>
        </h4>
        <div class="itin-header-elem flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-sans tracking-[0.2em] leading-3 text-[#1A1A1A]/80 uppercase w-full mb-4 md:mb-5">
          <template v-for="(subtitle, index) in itineraryData.header.subtitles" :key="index">
            <span>{{ subtitle }}</span>
            <span v-if="index < itineraryData.header.subtitles.length - 1" class="w-[1px] h-3.5 bg-[#1A1A1A]/20"></span>
          </template>
        </div>
      </div>
    </div>

    <!-- ================= CATEGORY LISTINGS ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-0 md:px-12 lg:px-18 flex flex-col gap-4 md:gap-6">
      <!-- TRAVEL YOUR WAY block -->
      <div :id="itineraryData.travelYourWay.id" class="itin-group-elem w-full flex flex-col mb-2 md:mb-4">
        <div class="flex flex-col items-center text-center px-6 md:px-0 mb-3 md:mb-5">
          <h2 class="text-2xl lg:text-3xl text-[#1A1A1A] mb-3 leading-snug" style="font-family: 'Noto Serif', serif; font-weight: 400;">
            {{ itineraryData.travelYourWay.title }}
          </h2>
          <p class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-relaxed max-w-2xl">
            {{ itineraryData.travelYourWay.intro }}
          </p>
        </div>
        <div 
          class="flex overflow-x-auto hide-scrollbar scroll-snap-x mandatory gap-4 md:gap-6 px-6 md:px-0 pb-3 relative z-10 cursor-grab"
          @mousedown="onMouseDown"
          @mouseleave="onMouseLeave"
          @mouseup="onMouseUpOrLeave"
          @mousemove="onMouseMove"
        >
          <NuxtLink 
            v-for="(cat, idx) in itineraryData.travelYourWay.items" 
            :key="`tyw-${idx}`" 
            :to="cat.url" 
            @click="preventClickIfDragged"
            class="group flex relative scroll-snap-align-start shrink-0 rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-shadow duration-500 bg-[#1A1A1A] aspect-[4/5] w-[75vw] sm:w-[40vw] lg:w-[250px] xl:w-[270px] ring-1 ring-black/5"
            @dragstart.prevent
          >
            <img :src="cat.img" :alt="cat.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" @dragstart.prevent />
            <div class="absolute inset-0 transition-colors duration-500 bg-[#2A2421]/70 group-hover:bg-[#2A2421]/80 z-10 pointer-events-none"></div>
            <div class="absolute inset-0 p-6 md:p-8 flex flex-col z-20 w-full h-full pointer-events-none">
              <div class="flex-grow flex flex-col items-center justify-center text-center">
                <div class="w-12 h-12 md:w-15 md:h-15 mb-4 md:mb-5 text-[#F9F8F6] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" v-html="cat.icon" class="w-full h-full"></svg>
                </div>
                <h3 class="text-xl md:text-2xl text-[#F9F8F6] mb-3 leading-tight drop-shadow-md" style="font-family: 'Noto Serif', serif;">
                  {{ cat.title }}
                </h3>
                <p class="font-sans text-[12px] md:text-[13px] text-[#F9F8F6]/90 font-light leading-relaxed line-clamp-3">
                  {{ cat.desc }}
                </p>
              </div>
              <div class="mt-auto flex justify-center shrink-0 w-full pointer-events-auto">
                <div class="flex items-center justify-center gap-3 px-6 py-3 border border-[#F9F8F6] bg-transparent text-[#F9F8F6] stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A] group-hover:text-[#1A1A1A] group-hover:bg-[#F9F8F6] group-hover:border-[#F9F8F6] transition-colors duration-300 rounded-sm shadow-md">
                  <span class="font-sans text-[9px] md:text-[10px] tracking-[0.2em] font-medium uppercase">Discover</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ================= BOTTOM CTA BUTTON & DECORATIVE LINE ================= -->
    <div class="itin-cta-elem w-full mt-2 md:mt-4 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-10">
      <NuxtLink :to="itineraryData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 bg-[#673b1c] border border-[#673b1c] hover:bg-[#673b1b] hover:border-[#673b1b] transition-colors duration-500 overflow-hidden rounded-sm">
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] font-medium uppercase relative z-10">
          {{ itineraryData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
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