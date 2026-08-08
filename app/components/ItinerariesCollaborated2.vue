<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const itineraryColData = {
  header: {
    eyebrow: 'Collaborated Itineraries',
    titleMain: 'Co-created Experiences&nbsp;',
    titleItalic: 'Across the globe.',
    decorationImage: '/images/logoart.png',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/>
          </svg>`
  },
  bottomCta: {
    text: 'Explore Collaborations',
    url: '/itineraries/collaborated',
    icon: '/images/logoart.png',
  },
  categoryGroup: {
    id: 'collaborated',
    intro: 'Unique global routes designed alongside our network of trusted regional experts.',
    items: [
      { days: 9, title: 'Kyoto Zen Pathways', tags: ['#Japan', '#Culture', '#Zen'], intro: 'Experience the quiet stillness of ancient temples and the vibrant energy of modern Japan.', img: '/images/home/itin-3.jpg', url: '/' },
      { days: 12, title: 'Alpine Serenity', tags: ['#Europe', '#Trekking', '#Alps'], intro: 'Breathe in the crisp air of the Swiss Alps, traversing glacial lakes and peaks.', img: '/images/home/itin-5.jpg', url: '/' },
      { days: 8, title: 'Kathmandu Valley', tags: ['#Nepal', '#Spiritual', '#Himalayas'], intro: 'Journey through the spiritual heart of Nepal, surrounded by Himalayan majesty.', img: '/images/home/itin-2.jpg', url: '/' },
      { days: 6, title: 'Volcanic Shores', tags: ['#Hawaii', '#Nature', '#Remote'], intro: 'Discover the raw, untamed beauty of Hawaii’s dramatic coastlines and craters.', img: '/images/home/itin-4.jpg', url: '/' },
      { days: 14, title: 'Lake Como Retreat', tags: ['#Italy', '#Romantic', '#Luxury'], intro: 'A sophisticated escape into the timeless elegance and romantic vistas of Tuscany.', img: '/images/home/itin-1.jpg', url: '/' },
      { days: 11, title: 'Andean Echoes', tags: ['#Peru', '#History', '#Adventure'], intro: 'Follow the footsteps of the Incas through the breathtaking altitudes of Peru.', img: '/images/home/stay-3.jpg', url: '/' }
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
  if (window.innerWidth >= 768) return
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
  tl.fromTo('.itin-coll-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  
  // 2. Category Title & Intro
  .fromTo('.itin-coll-group-elem > div:first-child',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: true },
    "-=0.8" 
  )
  
  // 3. Cards Stagger (Revealing one after the other)
  .fromTo('.itin-coll-group-elem a',
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.2)', immediateRender: true },
    "-=0.6" 
  )
  
  // 4. CTA Button & Line
  .fromTo('.itin-coll-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', immediateRender: true },
    "-=0.4" 
  )

  // 5. Mobile Swipe Indicator (Fades in, waits 3s, fades out)
  .fromTo('.mobile-swipe-indicator', 
    { opacity: 0, scale: 0.8, x: 20 },
    { 
      opacity: 1, 
      scale: 1,
      x: 0,
      duration: 0.6, 
      yoyo: true, 
      repeat: 1, 
      repeatDelay: 2,
      ease: 'power2.inOut'
    },
    "-=0.7"
  )
})
</script>

<template>
  <!-- Deep Dark Background Theme -->
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 flex flex-col overflow-hidden bg-[#2a2a2a]">

    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-18 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-5xl flex flex-col items-center text-center">
        <!-- Lightened text for dark mode -->
        <h3 class="itin-coll-header-elem flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/60 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
          <span>{{ itineraryColData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
        </h3>
        <h4 class="itin-coll-header-elem text-3xl lg:text-4xl tracking-normal leading-[1.2] text-[#f9f8f6] capitalize mb-3 md:mb-4" style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;">
          <span class="font-normal" v-html="itineraryColData.header.titleMain"></span>
          <span class="font-normal text-[#C47551] italic"><br />{{ itineraryColData.header.titleItalic }}</span>
        </h4>

        <p class="itin-coll-header-elem font-sans text-sm md:text-[15px] text-[#F9F8F6]/80 font-light leading-relaxed max-w-2xl">
          {{ itineraryColData.categoryGroup.intro }}
        </p>
      </div>
    </div>

    <!-- ================= CATEGORY LISTINGS ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-0 md:px-8 lg:px-12 xl:px-16 flex flex-col gap-4 md:gap-6">
      
      <!-- ADDED 'relative' to this wrapper -->
      <div :id="itineraryColData.categoryGroup.id" class="itin-coll-group-elem w-full flex flex-col mb-2 md:mb-4 relative">

        <!-- Grid Container -->
        <div 
          class="flex sm:grid overflow-x-auto sm:overflow-visible hide-scrollbar snap-x snap-mandatory sm:snap-none sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 px-6 md:px-0 pb-6 pt-2 relative z-10 cursor-grab sm:cursor-auto"
          @mousedown="onMouseDown"
          @mouseleave="onMouseLeave"
          @mouseup="onMouseUpOrLeave"
          @mousemove="onMouseMove"
        >
          <NuxtLink 
            v-for="(itin, idx) in itineraryColData.categoryGroup.items" 
            :key="`${itineraryColData.categoryGroup.id}-${idx}`"
            :to="itin.url" 
            @click="preventClickIfDragged"
            class="group block relative scroll-snap-align-start shrink-0 rounded-3xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 bg-[#1A1A1A] w-[85vw] sm:w-auto aspect-[4/3] ring-1 ring-[#F9F8F6]/10 transform hover:-translate-y-1"
            @dragstart.prevent
          >
            <img :src="itin.img" :alt="itin.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" @dragstart.prevent />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500 z-10 pointer-events-none"></div>
            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
            
            <!-- Badges -->
            <div class="absolute top-4 md:top-5 left-4 right-4 md:left-5 md:right-5 flex justify-between items-start z-20 pointer-events-none">
              <!-- Left Side Badges: Square Collaboration Icon + Featured Label -->
              <div class="flex items-center gap-2">
                <div v-if="itineraryColData.header.icon" class="w-6 h-6 md:w-7 md:h-7 bg-[#673b1c] text-[#F9F8F6] border border-[#C47551]/30 rounded-sm shadow-sm flex items-center justify-center p-1.5 shrink-0" v-html="itineraryColData.header.icon"></div>
                <span class="bg-[#F6BD03] text-[#1A1A1A] text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">Featured</span>
              </div>
              <!-- Right Side Badge: Days -->
              <span class="bg-black/60 backdrop-blur-md text-[#F9F8F6] border border-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">{{ itin.days }} Days</span>
            </div>
            
            <!-- Reveal Strip -->
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-30 transition-transform duration-500 ease-out transform translate-y-0 lg:translate-y-[52px] lg:group-hover:translate-y-0 pointer-events-none">
              <div class="flex items-end justify-between gap-3 mb-2.5">
                <div class="flex flex-col gap-1.5">
                  <h3 class="text-[19px] md:text-xl text-[#F9F8F6] leading-tight drop-shadow-md" style="font-family: 'Noto Serif', serif;">
                    {{ itin.title }}
                  </h3>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tag in itin.tags" :key="tag" class="text-[#F9F8F6]/70 text-[8px] md:text-[9px] uppercase tracking-widest font-sans font-medium">{{ tag }}</span>
                  </div>
                </div>
                <div class="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border-[1.5px] border-[#F6BD03] bg-transparent flex items-center justify-center transition-all duration-500 backdrop-blur-sm group-hover:scale-105 group-hover:bg-[#F6BD03] pointer-events-auto">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A]"><path d="M5 19L19 5M19 5H10M19 5V14"></path></svg>
                </div>
              </div>
              <div class="h-[40px] mt-2 overflow-hidden transition-opacity duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                <p class="font-sans text-[12px] md:text-[13px] text-[#F9F8F6]/80 font-light leading-[1.6] line-clamp-2">
                  {{ itin.intro }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Temporary Swipe Indicator -->
        <div 
          v-if="itineraryColData.categoryGroup.items.length > 1"
          class="mobile-swipe-indicator sm:hidden absolute right-0 top-0 bottom-6 w-24 bg-gradient-to-l from-[#F9F8F6]/30 via-[#F9F8F6]/15 to-transparent pointer-events-none flex items-center justify-end pr-2 md:pr-4 opacity-0 z-20"
        >
          <div class="w-8 h-8 rounded-full bg-[#f9f8f6]/50 backdrop-blur-md flex items-center justify-center animate-swipe-hint shadow-sm border border-[#1A1A1A]/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#703e19] ml-0.5">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </div>
        </div>

      </div>
    </div>

    <!-- ================= BOTTOM CTA BUTTON & DECORATIVE LINE ================= -->
    <div class="itin-coll-cta-elem w-full mt-2 md:mt-6 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-10">
      <NuxtLink :to="itineraryColData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-[#F9F8F6]/30 hover:border-[#C47551] transition-colors duration-500 overflow-hidden">
        <div class="absolute inset-0 bg-[#C47551] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src='itineraryColData.bottomCta.icon' alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ itineraryColData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </NuxtLink>
      
      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#F9F8F6]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#F9F8F6] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#C47551]"></div>
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

@keyframes swipeHint {
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}
.animate-swipe-hint {
  animation: swipeHint 1s ease-in-out infinite;
}
</style>