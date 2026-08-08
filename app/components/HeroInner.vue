<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import gsap from 'gsap'

// Define Props with fallback support
const props = defineProps({
  heroData: {
    type: Object,
    default: () => null
  }
})

// Access Global Loader State
const isLoaderFinished = useLoaderState()

// Default Fallback JSON Payload
const defaultHero = {
  eyebrow: 'Explore',
  titleMain: 'Uncover Stories',
  titleItalic: 'Off The Beaten Path',
  intro: 'Immerse yourself in authentic traditions, pristine landscapes, and meaningful local encounters.',
  bgImage: '/images/home/itin-1.jpg'
}

// Compute dynamic payload with fallbacks
const activeData = computed(() => {
  if (!props.heroData) return defaultHero

  return {
    eyebrow: props.heroData.eyebrow || defaultHero.eyebrow,
    titleMain: props.heroData.titleMain || defaultHero.titleMain,
    titleItalic: props.heroData.titleItalic || defaultHero.titleItalic,
    intro: props.heroData.intro || defaultHero.intro,
    bgImage: props.heroData.bgImage || defaultHero.bgImage
  }
})

const heroContainerRef = ref(null)

onMounted(() => {
  // Set initial hidden state immediately to prevent flashing
  gsap.set('.hero-inner-elem', { y: 25, opacity: 0 })

  const playHeroAnimation = () => {
    gsap.to('.hero-inner-elem', {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 1,
      ease: 'power3.out'
    })
  }

  // Sync with global loader state
  if (isLoaderFinished.value) {
    playHeroAnimation()
  } else {
    const unwatch = watch(isLoaderFinished, (isFinished) => {
      if (isFinished) {
        playHeroAnimation()
        unwatch() // Clean up watcher
      }
    })
  }
})
</script>

<template>
  <section class="w-full mt-[4rem] sm:mt-[4.2rem] md:mt-20 lg:mt-22 bg-[#F9F8F6] p-2 sm:p-3 lg:p-4 flex justify-center">
    
    <!-- Outer Card Container with Precise Aspect Ratios -->
    <div 
      ref="heroContainerRef"
      class="relative w-full rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[3/1] xl:aspect-[3.5/1] 2xl:aspect-[4/1] shadow-xl md:shadow-2xl bg-[#673b1c] flex items-center justify-center"
    >
      
      <!-- Background Image -->
      <div class="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          :src="activeData.bgImage" 
          :alt="activeData.titleMain" 
          class="w-full h-full object-cover scale-105 transition-transform duration-[2s] ease-out"
        />
        <!-- Dark Tint Overlay for Optimal Contrast -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <!-- Static Content Overlay -->
      <div class="relative z-10 w-full max-w-4xl px-6 sm:px-10 md:px-16 py-8 flex flex-col items-center text-center">
        
        <!-- Eyebrow -->
        <h1 class="hero-inner-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/90 uppercase w-full">
          <span class="w-6 md:w-12 h-[1px] bg-[#F9F8F6]/30"></span>
          <span>{{ activeData.eyebrow }}</span>
          <span class="w-6 md:w-12 h-[1px] bg-[#F9F8F6]/30"></span>
        </h1>

        <!-- H2 Oversized Title with Line Break & Accent Color -->
        <h2 
          class="hero-inner-elem text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.1] text-[#F9F8F6] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal block sm:inline-block">{{ activeData.titleMain }}</span>
          <span v-if="activeData.titleMain && activeData.titleItalic" class="hidden sm:inline">&nbsp;</span>
          <span class="font-normal leading-normal text-[#F6BD03] italic capitalize block sm:inline-block">{{ activeData.titleItalic }}</span>
        </h2>

        <!-- Decorative Line -->
        <div class="hero-inner-elem flex items-center justify-center gap-4 mb-5 md:mb-6 w-full max-w-[160px] md:max-w-[220px]">
          <span class="h-[1px] flex-grow bg-[#F9F8F6]/25"></span>
          <img src="/images/logoart.png" alt="Decoration" class="w-[12px] h-[12px] md:w-[16px] md:h-[16px] opacity-80 brightness-0 invert pointer-events-none" />
          <span class="h-[1px] flex-grow bg-[#F9F8F6]/25"></span>
        </div>

        <!-- Description / Intro -->
        <p class="hero-inner-elem font-sans text-sm md:text-base lg:text-lg leading-[1.8] text-[#F9F8F6]/80 font-light max-w-xl">
          {{ activeData.intro }}
        </p>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* Optional subtle background image breathing effect */
img {
  will-change: transform;
}
</style>