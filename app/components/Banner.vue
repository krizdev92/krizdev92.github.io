<script setup>
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import gsap from 'gsap'
import 'swiper/css'
import 'swiper/css/effect-fade'

// Array of background images
const backgroundImages = [
  '/images/home/itin-1.jpg',
  '/images/home/itin-2.jpg',
  '/images/home/itin-3.jpg'
]

onMounted(() => {
  const tl = gsap.timeline({ paused: true })

  // Reveal the text and CTA when the banner comes into view
  tl.fromTo('.banner-reveal-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.2, duration: 1.2, ease: 'power3.out' }
  )

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      tl.play()
      observer.disconnect()
    }
  }, { threshold: 0.3 })

  if (document.querySelector('#experiences-banner')) {
    observer.observe(document.querySelector('#experiences-banner'))
  }
})
</script>

<template>
  <section id="experiences-banner" class="w-full py-12 md:py-16  bg-[#f9f8f6] px-4 md:px-12 flex justify-center">
    
    <!-- 
      Reduced Height Container:
      Shifted to panoramic aspect ratios to dramatically reduce vertical footprint 
      while maintaining the wide, cinematic edge-to-edge feel.
    -->
    <div class="relative w-full max-w-[95rem] rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[3/2] sm:aspect-[5/2] lg:aspect-[4/1] shadow-2xl">
      
      <!-- Fading Background Slider (Autoplay only, no controls) -->
      <Swiper
        :modules="[Autoplay, EffectFade]"
        effect="fade"
        :fadeEffect="{ crossFade: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        :allowTouchMove="false"
        class="absolute inset-0 w-full h-full z-0"
      >
        <SwiperSlide v-for="(img, i) in backgroundImages" :key="i">
          <div class="w-full h-full relative">
            <!-- Cinematic Pan Effect Image -->
            <img :src="img" alt="Experience" class="w-full h-full object-cover swiper-cinematic-img" />
            
            <!-- Dark Tint Overlay for Text Readability -->
            <div class="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Static Content Overlay -->
      <div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 pointer-events-none">
        <h2 class="banner-reveal-elem font-serif text-[28px] sm:text-[36px] md:text-5xl lg:text-[56px] text-white leading-[1.1] md:leading-[1.15] max-w-4xl tracking-tight drop-shadow-lg mb-8 md:mb-10">
          Experiences crafted slowly, intentionally, and authentically.
        </h2>
        
        <!-- CTA Button -->
        <div class="banner-reveal-elem pointer-events-auto">
            <NuxtLink to="/Planyourjourney" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm border border-[#F9F8F6]/30 hover:border-[#b57819] transition-colors duration-500 overflow-hidden">
              <div class="absolute inset-0 bg-[#C47551] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
              <img src="/images/logoart.png" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
              <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
                Plan Your Journey
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- Cinematic Image Pan Effect --- */
.swiper-slide .swiper-cinematic-img {
  transform: scale(1);
  transition: transform 6s ease-out; /* Slightly longer than autoplay delay */
}

.swiper-slide-active .swiper-cinematic-img {
  transform: scale(1.05); /* Gentle zoom in while active */
}
</style>