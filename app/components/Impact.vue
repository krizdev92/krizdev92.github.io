<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
const activeIndex = ref(0) // Tracks the currently active item on Desktop

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const impactData = {
  header: {
    eyebrow: 'Impact',
    titleMain: 'Travel that leaves a place',
    titleItalic: 'better than before.',
    decorationImage: '/images/logoart.png',
    intro: 'We travel slowly, support local communities and protect the beauty that makes each place unforgettable. Every journey is mindful and made to give back.'
  },
  items: [
    {
      id: 'slow-travel',
      shortTitle: 'Slow Travel',
      longTitle: 'Slow travel,\nlasting impact',
      intro: 'We travel slowly, supporting local communities and protecting the beauty that makes each place unforgettable.',
      img: '/images/home/itin-1.jpg',
      url: '/'
    },
    {
      id: 'authentic',
      shortTitle: 'Authentic Over Curated',
      longTitle: 'Authentic\nover curated',
      intro: 'Stripping away the artificial to reveal the raw, unpolished, and breathtaking reality of living cultures.',
      img: '/images/home/itin-2.jpg',
      url: '/'
    },
    {
      id: 'local-first',
      shortTitle: 'Local First, Always',
      longTitle: 'Local first,\nalways',
      intro: 'Directly empowering regional artisans, guides, and family-owned stays to keep the economic ecosystem thriving.',
      img: '/images/home/itin-3.jpg',
      url: '/'
    },
    {
      id: 'protecting-beauty',
      shortTitle: 'Protecting Beauty',
      longTitle: 'Protecting\nnatural beauty',
      intro: 'Implementing zero-trace practices to ensure pristine landscapes remain untouched for generations to come.',
      img: '/images/home/stay-1.jpeg',
      url: '/'
    },
    {
      id: 'conscious-choices',
      shortTitle: 'Conscious Choices',
      longTitle: 'Conscious choices,\nlighter footprint',
      intro: 'Every logistical decision is weighed against its environmental impact, prioritizing sustainable alternatives.',
      img: '/images/home/stay-3.jpg',
      url: '/'
    },
    {
      id: 'giving-back',
      shortTitle: 'Giving Back',
      longTitle: 'Giving back,\nwhere we go',
      intro: 'A percentage of every journey directly funds grassroots conservation and community education initiatives.',
      img: '/images/home/stay-4.jpg',
      url: '/'
    }
  ],
  bottomCta: {
    text: 'Discover Our Values',
    url: '/impact',
    icon: '/images/logoart.png'
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 75%",
      once: true
    }
  })

  // Center Header Reveal
  tl.fromTo('.impact-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  // Split Layout Reveal
  .fromTo('.impact-list-item',
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
    "-=0.4"
  )
  .fromTo('.impact-image-wrapper',
    { opacity: 0, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
    "-=0.8"
  )
  // Bottom CTA Reveal
  .fromTo('.impact-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.4"
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#FFF9E0]/10 flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER (Centered Global Standard) ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-6 md:mb-8">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="impact-header-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ impactData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="impact-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ impactData.header.titleMain }}</span><br />
          <span class="font-normal leading-tight text-[#673b1c] italic capitalize">{{ impactData.header.titleItalic }}</span>
        </h4>

        <p class="impact-header-elem font-sans text-sm md:text-base lg:text-[15px] text-[#1A1A1A]/90 font-light max-w-xl">
          {{ impactData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= DESKTOP & TABLET: SPLIT LAYOUT ================= -->
    <div class="hidden sm:flex w-full max-w-[90rem] mx-auto px-8 lg:px-16 xl:px-24 flex-row items-center gap-4 lg:gap-8">
      
      <!-- LEFT COLUMN: Interactive List -->
      <div class="w-5/12 lg:w-4/12 flex flex-col gap-2 relative z-20 shrink-0">
        <div 
          v-for="(item, idx) in impactData.items" 
          :key="item.id"
          @mouseenter="activeIndex = idx"
          class="impact-list-item flex items-center w-full py-4 cursor-pointer group"
        >
          <!-- Short Title: Font size increased across devices -->
          <span 
            class="text-[13px] md:text-[14px] lg:text-[15px] font-sans tracking-[0.2em] uppercase font-bold transition-colors duration-500 shrink-0"
            :class="activeIndex === idx ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/70'"
          >
            {{ item.shortTitle }}
          </span>
          
          <!-- Animated Line & Dot -->
          <div class="flex-grow ml-4 lg:ml-6 flex items-center h-[1px] relative">
            <div 
              class="absolute left-0 h-full bg-[#1A1A1A]/20 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              :class="activeIndex === idx ? 'w-full' : 'w-0'"
            >
              <div 
                class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#1A1A1A] transition-opacity duration-300 delay-100"
                :class="activeIndex === idx ? 'opacity-100' : 'opacity-0'"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Image Display & Delayed Content Overlay -->
      <div class="impact-image-wrapper w-7/12 lg:w-8/12 flex-grow relative rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-md min-h-[500px] lg:min-h-[600px] xl:min-h-[650px] border border-[#1A1A1A]/5">
        
        <div 
          v-for="(item, idx) in impactData.items" 
          :key="`img-${item.id}`"
          class="absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
        >
          <!-- 1. Instant Crossfade Base Image -->
          <img :src="item.img" :alt="item.shortTitle" class="absolute inset-0 w-full h-full object-cover transform scale-[1.02] transition-transform duration-[4s] ease-out" :class="activeIndex === idx ? 'scale-[1.06]' : ''" />
          
          <!-- Default Base Gradient for minimal legibility (Instant) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-40"></div>
          
          <!-- 2. Delayed Deep Tint -->
          <!-- Fades in over 400ms AFTER a 600ms delay when becoming active. Fades out instantly when inactive. -->
          <div 
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ease-out"
            :class="activeIndex === idx ? 'opacity-100 delay-[400ms]' : 'opacity-0 delay-0'"
          ></div>

          <!-- 3. Delayed Content Overlay (Translates up from bottom) -->
          <!-- Slides up over 700ms AFTER a 600ms delay when becoming active. Disappears instantly when inactive. -->
          <div 
            class="absolute inset-x-0 bottom-0 p-8 lg:p-12 flex flex-col justify-end items-start transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            :class="activeIndex === idx ? 'translate-y-0 opacity-100 delay-[400ms]' : 'translate-y-8 opacity-0 delay-0'"
          >
            
            <h3 class="text-[#F9F8F6] font-serif text-3xl lg:text-4xl leading-tight mb-4 whitespace-pre-line drop-shadow-md">
              {{ item.longTitle }}
            </h3>
            
            <!-- Animated Underline (Extra slight delay after text block appears) -->
            <div 
              class="w-8 h-[2px] bg-[#F9F8F6] transform origin-left transition-transform duration-700 mb-4"
              :class="activeIndex === idx ? 'scale-x-100 delay-[900ms]' : 'scale-x-50 delay-0'"
            ></div>
            
            <p class="font-sans text-[13px] lg:text-[14px] text-[#F9F8F6]/90 font-light leading-relaxed mb-8 max-w-md drop-shadow-sm">
              {{ item.intro }}
            </p>

            <!-- Embedded Consistent Button -->
            <!-- <NuxtLink :to="item.url" class="group/btn relative inline-flex items-center gap-3 px-6 py-3 border border-[#F9F8F6]/40 hover:bg-[#F9F8F6] hover:border-[#F9F8F6] transition-colors duration-500 rounded-sm overflow-hidden w-fit">
              <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover/btn:text-[#1A1A1A] font-bold uppercase transition-colors duration-500 relative z-10">
                Explore Value
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-500 stroke-[#F9F8F6] group-hover/btn:stroke-[#1A1A1A] group-hover/btn:translate-x-1 relative z-10"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </NuxtLink> -->

          </div>
        </div>

      </div>

    </div>

    <!-- ================= MOBILE: HORIZONTAL NATIVE SWIPE ================= -->
    <div class="sm:hidden w-full flex flex-col pt-2">
      
      <!-- Draggable Swipe Container -->
      <div class="flex overflow-x-auto hide-scrollbar scroll-snap-x mandatory gap-5 pb-6 px-6 relative z-10">
        <NuxtLink 
          v-for="item in impactData.items" 
          :key="`mob-${item.id}`"
          :to="item.url"
          class="group block relative scroll-snap-align-start shrink-0 w-[85vw] aspect-square rounded-2xl overflow-hidden shadow-md bg-[#1A1A1A]"
        >
          <img :src="item.img" :alt="item.shortTitle" class="absolute inset-0 w-full h-full object-cover" />
          
          <!-- Static Deep Tint for Mobile Readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>

          <!-- Content permanently visible on mobile card: Flex fixed to bottom -->
          <div class="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end items-start z-20 pointer-events-none">
            
            <!-- Group text content together -->
            <div class="flex flex-col items-start w-full">
              <h3 class="text-[#F9F8F6] font-serif text-2xl leading-tight mb-3 whitespace-pre-line drop-shadow-md">
                {{ item.longTitle }}
              </h3>
              
              <div class="w-6 h-[1.5px] bg-[#F9F8F6] mb-4"></div>
              
              <p class="font-sans text-[12px] sm:text-[13px] text-[#F9F8F6]/90 font-light leading-relaxed mb-6">
                {{ item.intro }}
              </p>
            </div>

            <!-- Embedded Consistent Button (Scaled for Mobile) -->
            <!-- <div class="group/btn relative inline-flex items-center gap-3 px-5 py-2.5 border border-[#F9F8F6]/40 hover:bg-[#F9F8F6] hover:border-[#F9F8F6] transition-colors duration-500 rounded-sm overflow-hidden w-fit mt-2 pointer-events-auto">
              <span class="text-[9px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover/btn:text-[#1A1A1A] font-bold uppercase transition-colors duration-500 relative z-10">
                Explore Value
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-500 stroke-[#F9F8F6] group-hover/btn:stroke-[#1A1A1A] group-hover/btn:translate-x-1 relative z-10"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div> -->
            
          </div>
        </NuxtLink>
      </div>
    </div>


    <!-- ================= BOTTOM CTA BUTTON & DECORATIVE LINE (Global Standard) ================= -->
    <div class="w-full mt-3 md:mt-8 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-20 impact-cta-elem">
      
      <NuxtLink :to="impactData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1A1A1A]/20 hover:border-[#673b1c] transition-colors duration-500 overflow-hidden rounded-sm">
        <div class="absolute inset-0 bg-[#673b1c] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="impactData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ impactData.bottomCta.text }}
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
.hide-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
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