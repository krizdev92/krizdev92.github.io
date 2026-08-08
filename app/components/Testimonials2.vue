<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const sectionRef = ref(null)
let ctx = null

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
    {
      id: 1,
      name: "Ananya Menon",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      designation: "Architect, Bengaluru, India",
      category: "Heritage & Culture",
      accentColor: "#C47552", // Terracotta / Earth
      quote: "Every temple, village, and conversation felt deeply personal. It wasn't sightseeing—it was understanding a place through its people, stories, and traditions. The journey stayed with me long after I returned home.",
      buttonText: "Read Story",
      buttonUrl: "/testimonials/"
    },
    {
      id: 2,
      name: "Daniel Brooks",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      designation: "Photographer, Melbourne, Australia",
      category: "Nature & Trails",
      accentColor: "#146855", // Moss Green
      quote: "From misty mountains to hidden trails, every day felt like an adventure crafted just for me. The landscapes were breathtaking, but the quiet moments in nature became my favorite memories.",
      buttonText: "Watch Video",
      buttonUrl: "/testimonials/"
    },
    {
      id: 3,
      name: "Priya Raman",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
      designation: "Yoga Instructor, Chennai, India",
      category: "Wellness & Retreat",
      accentColor: "#673b1b", // Crimson / Wine
      quote: "The retreat offered more than relaxation. It brought stillness, meaningful conversations, and a renewed sense of balance. I returned home feeling lighter, calmer, and deeply inspired.",
      buttonText: "Read Post",
      buttonUrl: "/testimonials/"
    },
    {
      id: 4,
      name: "Lucas Meyer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      designation: "Chef, Munich, Germany",
      category: "Culinary Journeys",
      accentColor: "#D97706", // Amber Gold
      quote: "Every meal told a story. Cooking alongside local families, discovering regional flavors, and sharing traditions around the table made this one of the most authentic journeys I've ever experienced.",
      buttonText: "Explore",
      buttonUrl: "/testimonials/"
    }
  ],
  bottomCta: {
    text: 'Explore All Testimonials',
    url: '/testimonials',
    icon: '/images/logoart.png'
  }
}

// Swiper Configuration
const swiperModules = [Navigation, Pagination, Autoplay]

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        once: true,
        invalidateOnRefresh: true
      }
    })

    // Header Animation
    tl.fromTo('.testi-header-elem', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', immediateRender: true }
    )
    // Slider Fade In
    .fromTo('.testi-slider-wrapper',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', immediateRender: true },
      "-=0.6"
    )
    // CTA Animation
    .fromTo('.testi-cta-elem',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: true },
      "-=0.6"
    )
  }, sectionRef.value)

  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 250)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#f9f8f6] flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-6 md:mb-8">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="testi-header-elem opacity-0 flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ testimonialsData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="testi-header-elem opacity-0 text-3xl lg:text-4xl tracking-normal leading-[1.2] text-[#703e19] capitalize mb-3 md:mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ testimonialsData.header.titleMain }}</span><br />
          <span class="font-normal text-[#c47551] italic">{{ testimonialsData.header.titleItalic }}</span>
        </h4>

        <p class="testi-header-elem opacity-0 font-sans text-sm md:text-base lg:text-[15px] leading-relaxed text-[#1A1A1A] font-light max-w-2xl">
          {{ testimonialsData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= TESTIMONIAL CARDS SWIPER ================= -->
    <div class="testi-slider-wrapper opacity-0 w-full max-w-[62rem] mx-auto px-4 md:px-8 flex flex-col items-center overflow-hidden">
      
      <Swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :space-between="40"
        :loop="true"
        :auto-height="true"
        :autoplay="{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :pagination="{ clickable: true, el: '.testi-pagination' }"
        :navigation="{ prevEl: '.testi-prev', nextEl: '.testi-next' }"
        class="w-full custom-swiper py-4"
      >
        <SwiperSlide v-for="item in testimonialsData.items" :key="item.id" class="h-auto flex">
          
          <!-- Card Container -->
          <div class="relative w-full min-h-[420px] md:min-h-[380px] bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#1A1A1A]/10 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing select-none my-2">
            
            <!-- Massive Centered Light Watermark Quote (Behind text) -->
            <span 
              class="absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-2/3 text-[360px] md:text-[440px] font-serif leading-none pointer-events-none select-none transition-colors duration-500 z-0"
              :style="{ color: item.accentColor, opacity: 0.15 }"
            >
              &#8220;
            </span>

            <!-- Top Header Block: Solid Category Badge & Regular Weight Quote -->
            <div class="relative z-10 flex flex-col items-start gap-6 mb-8 md:mb-12">
              
              <!-- Solid Background Category Pill -->
              <span 
                class="text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-sm text-white shadow-xs"
                :style="{ backgroundColor: item.accentColor }"
              >
                {{ item.category }}
              </span>

              <!-- Regular Weight Quote Text -->
              <blockquote class="font-serif text-lg mt-2 mb-2 sm:text-xl md:text-2xl text-[#1A1A1A] indent-6 leading-relaxed tracking-wide font-normal max-w-4xl">
                "{{ item.quote }}"
              </blockquote>
            </div>

            <!-- Bottom Block: Author Profile + Dynamic Color Switching Rectangular Button -->
            <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 md:pt-8 border-t border-[#1A1A1A]/10 mt-auto">
              
              <!-- Author Metadata -->
              <div class="flex items-center gap-4 md:gap-5">
                <div 
                  class="w-12 h-12 md:w-15 md:h-15 rounded-full overflow-hidden border-2 shrink-0 shadow-sm p-0.5 bg-white"
                  :style="{ borderColor: item.accentColor }"
                >
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-full" />
                </div>
                <div class="flex flex-col">
                  <h4 class="text-base md:text-lg font-bold text-[#1A1A1A] leading-snug">
                    {{ item.name }}
                  </h4>
                  <span class="text-xs md:text-sm font-sans text-[#1A1A1A]/70 font-light mt-0.5">
                    {{ item.designation }}
                  </span>
                </div>
              </div>

              <!-- Color-Switching Rectangular Button -->
              <NuxtLink 
                :to="item.buttonUrl" 
                class="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 text-white transition-all duration-300 rounded-sm overflow-hidden shrink-0 shadow-xs hover:bg-[#1A1A1A]"
                :style="{ backgroundColor: item.accentColor }"
              >
                <span class="text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 relative z-10">
                  {{ item.buttonText }}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="relative z-10 text-white transform transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </NuxtLink>

            </div>

          </div>

        </SwiperSlide>
      </Swiper>

      <!-- Custom Adaptive Swiper Controls -->
      <div class="flex items-center justify-center gap-6 mt-6 md:mt-10 relative w-full px-4 z-10">
        <button class="testi-prev flex w-11 h-11 md:w-13 md:h-13 rounded-full border border-[#1A1A1A]/20 bg-white items-center justify-center text-[#1A1A1A] hover:border-[#703e19] hover:text-[#703e19] transition-colors shadow-sm cursor-pointer shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
        </button>
        
        <div class="testi-pagination flex justify-center gap-2.5 items-center !w-auto"></div>

        <button class="testi-next flex w-11 h-11 md:w-13 md:h-13 rounded-full border border-[#1A1A1A]/20 bg-white items-center justify-center text-[#1A1A1A] hover:border-[#703e19] hover:text-[#703e19] transition-colors shadow-sm cursor-pointer shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
        </button>
      </div>

    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-2 md:mt-6 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-20 testi-cta-elem opacity-0">

      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#703e19]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#704e19] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#703e19]"></div>
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
  opacity: 0.85;
  transform: scale(1.5);
  background-color: #673b1c;
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