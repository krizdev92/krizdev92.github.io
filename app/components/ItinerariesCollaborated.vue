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
  categoryGroups: [
    {
      id: 'collaborated',
      title: 'Collaborated Itineraries',
      intro: 'Unique global routes designed alongside our network of trusted regional experts.',
      aspect: '4/3',
      items: [
        { days: 9, title: 'Kyoto Zen Pathways', tags: ['#Japan', '#Culture', '#Zen'], intro: 'Experience the quiet stillness of ancient temples and the vibrant energy of modern Japan.', img: '/images/home/itin-3.jpg', url: '/' },
        { days: 12, title: 'Alpine Serenity', tags: ['#Europe', '#Trekking', '#Alps'], intro: 'Breathe in the crisp air of the Swiss Alps, traversing glacial lakes and peaks.', img: '/images/home/itin-5.jpg', url: '/' },
        { days: 8, title: 'Kathmandu Valley', tags: ['#Nepal', '#Spiritual', '#Himalayas'], intro: 'Journey through the spiritual heart of Nepal, surrounded by Himalayan majesty.', img: '/images/home/itin-2.jpg', url: '/' },
        { days: 6, title: 'Volcanic Shores', tags: ['#Hawaii', '#Nature', '#Remote'], intro: 'Discover the raw, untamed beauty of Hawaii’s dramatic coastlines and craters.', img: '/images/home/itin-4.jpg', url: '/' },
        { days: 14, title: 'Lake Como Retreat', tags: ['#Italy', '#Romantic', '#Luxury'], intro: 'A sophisticated escape into the timeless elegance and romantic vistas of Tuscany.', img: '/images/home/itin-1.jpg', url: '/' },
        { days: 11, title: 'Andean Echoes', tags: ['#Peru', '#History', '#Adventure'], intro: 'Follow the footsteps of the Incas through the breathtaking altitudes of Peru.', img: '/images/home/itin-6.jpg', url: '/' }
      ]
    }
  ]
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
      <div v-for="catGroup in itineraryData.categoryGroups" :key="catGroup.id" class="itin-group-elem w-full flex flex-col">
        <div class="flex flex-col items-center text-center px-6 md:px-0 mb-3 md:mb-5">
          <h2 class="text-2xl lg:text-3xl text-[#1A1A1A] mb-3 leading-snug" style="font-family: 'Noto Serif', serif; font-weight: 400;">
            {{ catGroup.title }}
          </h2>
          <p class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-relaxed max-w-2xl">
            {{ catGroup.intro }}
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
            v-for="(itin, idx) in catGroup.items" 
            :key="`${catGroup.id}-${idx}`"
            :to="itin.url" 
            @click="preventClickIfDragged"
            class="group block relative scroll-snap-align-start shrink-0 rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-500 bg-[#1A1A1A] w-[75vw] sm:w-[48vw] ring-1 ring-black/5 lg:w-[340px] xl:w-[380px] aspect-[4/3]"
            @dragstart.prevent
          >
            <img :src="itin.img" :alt="itin.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" @dragstart.prevent />
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none"></div>
            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
            <div class="absolute top-4 md:top-5 left-4 right-4 md:left-5 md:right-5 flex justify-between items-start z-20 pointer-events-none">
              <span class="bg-[#F6BD03] text-[#1A1A1A] text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">Featured</span>
              <span class="bg-black/60 backdrop-blur-md text-[#F9F8F6] text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">{{ itin.days }} Days</span>
            </div>
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-30 transition-transform duration-500 ease-out transform translate-y-0 lg:translate-y-[56px] lg:group-hover:translate-y-0 pointer-events-none">
              <div class="flex items-end justify-between gap-3 mb-2.5">
                <div class="flex flex-col gap-1.5">
                  <h3 class="text-[19px] md:text-xl text-[#F9F8F6] leading-tight drop-shadow-md" style="font-family: 'Noto Serif', serif;">
                    {{ itin.title }}
                  </h3>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tag in itin.tags" :key="tag" class="text-[#F9F8F6]/90 text-[8px] md:text-[9px] uppercase tracking-widest font-sans font-medium">{{ tag }}</span>
                  </div>
                </div>
                <div class="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border-[1.5px] border-[#F6BD03] bg-transparent flex items-center justify-center transition-all duration-500 backdrop-blur-sm group-hover:scale-105 group-hover:bg-[#F6BD03]">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A]"><path d="M5 19L19 5M19 5H10M19 5V14"></path></svg>
                </div>
              </div>
              <div class="h-[40px] mt-3 overflow-hidden transition-opacity duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                <p class="font-sans text-[12px] md:text-[13px] text-[#F9F8F6]/90 font-light leading-[1.6] line-clamp-2">
                  {{ itin.intro }}
                </p>
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