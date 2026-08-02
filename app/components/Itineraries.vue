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
      id: 'signature',
      title: 'Signature Experiences',
      intro: 'Handcrafted journeys curated for profound connections and deep immersion.',
      aspect: '5/4', // Square image requirement
      items: [
        { days: 7, title: 'Malabar Monsoon', tags: ['#Monsoon', '#Nature', '#Heritage'], intro: 'A sensory journey through rain-kissed landscapes and ancient spice routes.', img: '/images/home/itin-1.jpg', url: '/' },
        { days: 5, title: 'Southern Temples', tags: ['#Culture', '#Rituals', '#History'], intro: 'Immerse in the architectural marvels and living spiritual traditions of the deep south.', img: '/images/home/itin-2.jpg', url: '/' },
        { days: 8, title: 'Forgotten Rivers', tags: ['#Rivers', '#Nature', '#Calm'], intro: 'Navigate lush backwaters and discover serene river villages untouched by time.', img: '/images/home/itin-3.jpg', url: '/' },
        { days: 4, title: 'Coastal Whispers', tags: ['#Coastal', '#Relax', '#Ocean'], intro: 'A short, rejuvenating escape to golden sands, quiet shores, and oceanic calm.', img: '/images/home/itin-4.jpg', url: '/' },
        { days: 6, title: 'Highland Trails', tags: ['#Highland', '#Trek', '#Adventure'], intro: 'Trek through mist-covered peaks, sprawling tea gardens, and crisp mountain air.', img: '/images/home/itin-5.jpg', url: '/' },
        { days: 10, title: 'Spice Routes', tags: ['#History', '#Culinary', '#Culture'], intro: 'Trace the historic pathways of flavor that brought the world to the Malabar coast.', img: '/images/home/itin-6.jpg', url: '/' }
      ]
    },
    {
      id: 'collaborated',
      title: 'Collaborated Itineraries',
      intro: 'Unique global routes designed alongside our network of trusted regional experts.',
      aspect: '4/3', // Uniform aspect ratio
      items: [
        { days: 9, title: 'Kyoto Zen Pathways', tags: ['#Japan', '#Culture', '#Zen'], intro: 'Experience the quiet stillness of ancient temples and the vibrant energy of modern Japan.', img: '/images/home/itin-3.jpg', url: '/' },
        { days: 12, title: 'Alpine Serenity', tags: ['#Europe', '#Trekking', '#Alps'], intro: 'Breathe in the crisp air of the Swiss Alps, traversing glacial lakes and peaks.', img: '/images/home/itin-5.jpg', url: '/' },
        { days: 8, title: 'Kathmandu Valley', tags: ['#Nepal', '#Spiritual', '#Himalayas'], intro: 'Journey through the spiritual heart of Nepal, surrounded by Himalayan majesty.', img: '/images/home/itin-2.jpg', url: '/' },
        { days: 6, title: 'Volcanic Shores', tags: ['#Hawaii', '#Nature', '#Remote'], intro: 'Discover the raw, untamed beauty of Hawaii’s dramatic coastlines and craters.', img: '/images/home/itin-4.jpg', url: '/' },
        { days: 14, title: 'Lake Como Retreat', tags: ['#Italy', '#Romantic', '#Luxury'], intro: 'A sophisticated escape into the timeless elegance and romantic vistas of Tuscany.', img: '/images/home/itin-1.jpg', url: '/' },
        { days: 11, title: 'Andean Echoes', tags: ['#Peru', '#History', '#Adventure'], intro: 'Follow the footsteps of the Incas through the breathtaking altitudes of Peru.', img: '/images/home/itin-6.jpg', url: '/' }
      ]
    }
  ],

  travelYourWay: {
    id: 'tyw',
    title: 'Travel Your Way',
    intro: 'Explore by what moves you. Select a path below to begin crafting your bespoke journey.',
    aspect: '4/5', // Portrait uniform aspect for TYW categories
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
  cancelAnimationFrame(rafId) // Stop existing momentum
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
  const walk = (x - startX.value) * 1.5 // Drag speed multiplier
  slider.scrollLeft = scrollLeft.value - walk
  
  // Track velocity for inertia
  velX = lastX - currentX
  lastX = currentX

  if (Math.abs(walk) > 5) {
    dragThresholdMet = true
  }
}

// Smooth deceleration loop
const beginInertia = (slider) => {
  const friction = 0.94 // Adjust for slide glide length
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

    <!-- ================= SECTION HEADER (TOP CENTERED) ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-18 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-5xl flex flex-col items-center text-center">
        
        <!-- Eyebrow -->
        <h3 class="itin-header-elem flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ itineraryData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <!-- Main Title (Added fixed capitalization and NBSP spacing) -->
        <h4 
          class="itin-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-3 md:mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal" v-html="itineraryData.header.titleMain"></span>
          <span class="font-normal leading-normal text-[#196285] italic"><br />{{ itineraryData.header.titleItalic }}</span>
        </h4>
        
        <!-- Subtitles -->
        <div class="itin-header-elem flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-sans tracking-[0.2em] leading-3 text-[#1A1A1A]/80 uppercase w-full mb-4 md:mb-5">
          <template v-for="(subtitle, index) in itineraryData.header.subtitles" :key="index">
            <span>{{ subtitle }}</span>
            <span v-if="index < itineraryData.header.subtitles.length - 1" class="w-[1px] h-3.5 bg-[#1A1A1A]/20"></span>
          </template>
        </div>
        
        <!-- Decorative Lineart -->
        <div class="itin-header-elem flex items-center justify-center gap-5 mb-0 w-full max-w-[200px] md:max-w-[280px]">
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
          <img :src="itineraryData.header.decorationImage" alt="Decoration" class="w-[14px] h-[14px] md:w-[18px] md:h-[18px] opacity-60 brightness-0 pointer-events-none" />
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
        </div>

      </div>
    </div>

    <!-- ================= CATEGORY LISTINGS ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-0 md:px-12 lg:px-18 flex flex-col gap-4 md:gap-6">

      <!-- NATIVE DRAGGABLE X-OVERFLOW BLOCKS (Signature & Collaborated) -->
      <div v-for="catGroup in itineraryData.categoryGroups" :key="catGroup.id" class="itin-group-elem w-full flex flex-col">

        <!-- Category Header (Fully Centered with whitespace) -->
        <div class="flex flex-col items-center text-center px-6 md:px-0 mb-3 md:mb-5">
          <h2 class="text-2xl lg:text-3xl text-[#1A1A1A] mb-3 leading-snug" style="font-family: 'Noto Serif', serif; font-weight: 400;">
            {{ catGroup.title }}
          </h2>
          <p class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-relaxed max-w-2xl">
            {{ catGroup.intro }}
          </p>
        </div>

        <!-- Draggable Overflow Container -->
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
            class="group block relative scroll-snap-align-start shrink-0 rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-500 bg-[#1A1A1A] w-[75vw] sm:w-[48vw] ring-1 ring-black/5"
            :class="catGroup.aspect === '5/4' ? 'lg:w-[320px] xl:w-[360px] aspect-[5/4]' : 'lg:w-[340px] xl:w-[380px] aspect-[4/3]'"
            @dragstart.prevent
          >
            <!-- Main Image -->
            <img :src="itin.img" :alt="itin.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" @dragstart.prevent />
            
            <!-- Base Tint & Bottom Gradient Fade -->
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none"></div>
            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

            <!-- FIXED TOP BADGES -->
            <div class="absolute top-4 md:top-5 left-4 right-4 md:left-5 md:right-5 flex justify-between items-start z-20 pointer-events-none">
              <!-- Reverted to Yellow Background -->
              <span class="bg-[#F6BD03] text-[#1A1A1A] text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">Featured</span>
              <span class="bg-black/60 backdrop-blur-md text-[#F9F8F6] text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">{{ itin.days }} Days</span>
            </div>

            <!-- REVEAL INTRO STRIP -->
            <!-- Mobile: Always fully visible (translate-y-0). Desktop: Translated down 56px, slides to 0 on hover -->
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-30 transition-transform duration-500 ease-out transform translate-y-0 lg:translate-y-[56px] lg:group-hover:translate-y-0 pointer-events-none">
              
              <!-- Title & Arrow Button -->
              <div class="flex items-end justify-between gap-3 mb-2.5">
                <div class="flex flex-col gap-1.5">
                  <h3 class="text-[19px] md:text-xl text-[#F9F8F6] leading-tight drop-shadow-md" style="font-family: 'Noto Serif', serif;">
                    {{ itin.title }}
                  </h3>
                  <!-- Tags (Always Visible) -->
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tag in itin.tags" :key="tag" class="text-[#F9F8F6]/90 text-[8px] md:text-[9px] uppercase tracking-widest font-sans font-medium">{{ tag }}</span>
                  </div>
                </div>
                
                <!-- Fixed Arrow Button: Outline default, Yellow Fill on Hover -->
                <div class="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border-[1.5px] border-[#F6BD03] bg-transparent flex items-center justify-center transition-all duration-500 backdrop-blur-sm group-hover:scale-105 group-hover:bg-[#F6BD03]">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A]"><path d="M5 19L19 5M19 5H10M19 5V14"></path></svg>
                </div>
              </div>

              <!-- Revealed Intro Box -->
              <!-- Mobile: Always visible. Desktop: Opacity 0 to 1 on hover. Fixed height ensures no layout jumps -->
              <div class="h-[40px] mt-3 overflow-hidden transition-opacity duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                <p class="font-sans text-[12px] md:text-[13px] text-[#F9F8F6]/90 font-light leading-[1.6] line-clamp-2">
                  {{ itin.intro }}
                </p>
              </div>
            </div>

          </NuxtLink>
        </div>

      </div>

      <!-- ================= 3. TRAVEL YOUR WAY block ================= -->
      <div :id="itineraryData.travelYourWay.id" class="itin-group-elem w-full flex flex-col mb-2 md:mb-4">

        <!-- Category Header (Centered) -->
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
            <!-- Background Image -->
            <img :src="cat.img" :alt="cat.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" @dragstart.prevent />
            
            <!-- Strong Dark Tint for extreme readability, intensifies on hover -->
            <div class="absolute inset-0 transition-colors duration-500 bg-[#2A2421]/70 group-hover:bg-[#2A2421]/80 z-10 pointer-events-none"></div>

            <!-- Content Container -->
            <div class="absolute inset-0 p-6 md:p-8 flex flex-col z-20 w-full h-full pointer-events-none">
              
              <!-- Flex Center logic for Icon, Title and Intro -->
              <div class="flex-grow flex flex-col items-center justify-center text-center">
                <!-- Sized Icon placed on top of the title -->
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

              <!-- Fixed Bottom Rectangular CTA Button -->
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
      
      <NuxtLink :to="itineraryData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 bg-[#196285] border border-[#196285] hover:bg-[#751600] hover:border-[#751600] transition-colors duration-500 overflow-hidden rounded-sm">
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] font-medium uppercase relative z-10">
          {{ itineraryData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </NuxtLink>

      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#196285]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#196285] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#196285]"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Natively hide scrollbar for fluid Draggable X-Overflow container */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}

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