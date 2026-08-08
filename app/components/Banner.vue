<script setup>
import { onMounted, computed, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import gsap from 'gsap'
import 'swiper/css'
import 'swiper/css/effect-fade'

// Define Props with strict shape and default fallback
const props = defineProps({
  bannerData: {
    type: Object,
    default: () => null
  }
})

// Default Fallback Payload
const defaultBanner = {
  title: 'Experiences crafted slowly, intentionally, and authentically.',
  buttonText: 'Plan Your Journey',
  buttonUrl: '/PlanYourJourney',
  images: [
    '/images/home/itin-1.jpg',
    '/images/home/itin-2.jpg',
    '/images/home/itin-3.jpg'
  ]
}

// Compute dynamic payload with fallbacks
const activeData = computed(() => {
  if (!props.bannerData) return defaultBanner

  return {
    title: props.bannerData.title || defaultBanner.title,
    buttonText: props.bannerData.buttonText || defaultBanner.buttonText,
    buttonUrl: props.bannerData.buttonUrl || defaultBanner.buttonUrl,
    images: (props.bannerData.images && props.bannerData.images.length > 0)
      ? props.bannerData.images 
      : defaultBanner.images
  }
})

const bannerRef = ref(null)

onMounted(() => {
  gsap.set('.banner-reveal-elem', { y: 30, opacity: 0 })

  const tl = gsap.timeline({ paused: true })

  // Reveal text and CTA when scrolled into view
  tl.to('.banner-reveal-elem', { 
    y: 0, 
    opacity: 1, 
    stagger: 0.2, 
    duration: 1.2, 
    ease: 'power3.out' 
  })

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      tl.play()
      observer.disconnect()
    }
  }, { threshold: 0.3 })

  if (bannerRef.value) {
    observer.observe(bannerRef.value)
  }
})
</script>

<template>
  <section ref="bannerRef" class="w-full py-12 md:py-16 bg-[#f9f8f6] px-4 md:px-12 flex justify-center">
    
    <div class="relative w-full max-w-[80rem] rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[5/3] sm:aspect-[3/1] lg:aspect-[4/1] xl:aspect-[5/1] shadow-2xl">
      
      <!-- Fading Background Slider -->
      <Swiper
        :modules="[Autoplay, EffectFade]"
        effect="fade"
        :fadeEffect="{ crossFade: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        :allowTouchMove="false"
        class="absolute inset-0 w-full h-full z-0"
      >
        <SwiperSlide v-for="(img, i) in activeData.images" :key="i">
          <div class="w-full h-full relative">
            <img :src="img" alt="Experience Banner" class="w-full h-full object-cover swiper-cinematic-img" />
            <div class="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Content Overlay -->
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-3 md:px-8 pointer-events-none">
        <h2 class="banner-reveal-elem font-serif sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl tracking-wide leading-[1.5] md:leading-[1.5] lg:leading-[1.4] xl:leading-[1.5] text-white max-w-4xl drop-shadow-lg mb-8">
          {{ activeData.title }}
        </h2>
        
        <!-- CTA Button -->
        <div class="banner-reveal-elem pointer-events-auto">
          <NuxtLink :to="activeData.buttonUrl" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm border border-[#F9F8F6]/30 hover:border-[#b57819] transition-colors duration-500 overflow-hidden">
            <div class="absolute inset-0 bg-[#C47551] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
            <img src="/images/logoart.png" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
            <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
              {{ activeData.buttonText }}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.swiper-slide .swiper-cinematic-img {
  transform: scale(1);
  transition: transform 6s ease-out;
}

.swiper-slide-active .swiper-cinematic-img {
  transform: scale(1.05);
}
</style>