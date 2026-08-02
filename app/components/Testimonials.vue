<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const testimonialsData = {
  header: {
    eyebrow: 'Testimonials',
    titleMain: 'Moments captured',
    titleItalic: 'along the way.',
    decorationImage: '/images/logoart.png',
    intro: 'Glimpses of unscripted moments, breathtaking landscapes, and meaningful connections. See the world through the eyes of those who travel with us.'
  },
  items: [
    { id: 1, img: '/images/testimonials/te1.png' },
    { id: 2, img: '/images/testimonials/te2.png' },
    { id: 3, img: '/images/testimonials/te3.png' }
  ],
  bottomCta: {
    text: 'Explore All Testimonials',
    url: '/testimonials',
    icon: '/images/logoart.png'
  }
}

// Swiper Configuration
const swiperModules = [Navigation, Pagination, Autoplay]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true
    }
  })

  // Header Animation
  tl.fromTo('.testi-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  // Slider Fade In
  .fromTo('.testi-slider-wrapper',
    { opacity: 0, y: 30, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
    "-=0.6"
  )
  // CTA Animation
  .fromTo('.testi-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.6"
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-16 pb-6 md:pb-10 bg-[#fff9e0]/10 flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="testi-header-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ testimonialsData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="testi-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ testimonialsData.header.titleMain }}</span><br />
          <span class="font-normal leading-normal text-[#196285] italic capitalize">{{ testimonialsData.header.titleItalic }}</span>
        </h4>

        <div class="testi-header-elem flex items-center justify-center gap-5 mb-6 w-full max-w-[200px] md:max-w-[280px]">
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
          <img :src="testimonialsData.header.decorationImage" alt="Decoration" class="w-[14px] h-[14px] md:w-[18px] md:h-[18px] opacity-60 brightness-0 pointer-events-none" />
          <span class="h-[1px] flex-grow bg-[#1A1A1A]/20"></span>
        </div>

        <p class="testi-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#1A1A1A]/80 font-light max-w-xl">
          {{ testimonialsData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= SINGLE SLIDE SWIPER ================= -->
    <div class="testi-slider-wrapper w-full max-w-[60rem] mx-auto px-4 md:px-12 flex flex-col items-center overflow-hidden">
      
      <Swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :space-between="30"
        :loop="false"
        :autoplay="{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :pagination="{ clickable: true, el: '.testi-pagination' }"
        :navigation="{ prevEl: '.testi-prev', nextEl: '.testi-next' }"
        class="w-full custom-swiper py-6 overflow-visible"
      >
        <SwiperSlide v-for="item in testimonialsData.items" :key="item.id">
          <!-- Slide Container -->
          <div class="relative w-full aspect-[3/2] overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-[#1A1A1A]/10 cursor-grab active:cursor-grabbing">
            <img :src="item.img" alt="Testimonial Moment" class="w-full h-full object-cover" />
            <!-- Soft inner shadow to frame the image nicely -->
            <div class="absolute inset-0 ring-1 ring-inset ring-[#1A1A1A]/5 pointer-events-none"></div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Custom Adaptive Controls (Arrows + Dots) -->
      <div class="flex items-center justify-center gap-6 mt-4 md:mt-6 relative w-full px-4 z-10">
        <button class="testi-prev flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1A1A1A]/20 bg-[#FFF9E0]/10 items-center justify-center text-[#1A1A1A] hover:border-[#196285] hover:text-[#196285] transition-colors shadow-sm cursor-pointer shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
        </button>
        
        <div class="testi-pagination flex justify-center gap-2.5 items-center !w-auto"></div>

        <button class="testi-next flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1A1A1A]/20 bg-[#FFF9E0]/10 items-center justify-center text-[#1A1A1A] hover:border-[#196285] hover:text-[#196285] transition-colors shadow-sm cursor-pointer shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
        </button>
      </div>

    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-4 md:mt-6 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-20 testi-cta-elem">
      
      <NuxtLink :to="testimonialsData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1A1A1A]/20 hover:border-[#196285] transition-colors duration-500 overflow-hidden rounded-sm bg-transparent">
        <div class="absolute inset-0 bg-[#196285] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="testimonialsData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ testimonialsData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#1A1A1A] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
/* Custom Pagination Dots */
:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background-color: #1A1A1A;
  opacity: 0.2;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  margin: 0 !important;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 0.8;
  transform: scale(1.4);
  background-color: #196285;
}

/* Disabled state for navigation arrows (when loop is false) */
:deep(.swiper-button-disabled) {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
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