<script setup>
import { onMounted, computed, watch } from 'vue'
import gsap from 'gsap'

// Access Global Loader State
const isLoaderFinished = useLoaderState()

// 1. GraphQL Endpoint & Query with Heading Split & Fallback Fields
const WP_GRAPHQL_ENDPOINT = 'http://travel-app-backend.local/graphql'

const query = `
  query GetHeroSection {
    page(id: "home", idType: URI) {
      heroVideoSection {
        videoId
        subtitleText
        headingLine1
        headingLine2Italic
        description
        award1Image
        award1Alt
        award2Image
        award2Alt
      }
    }
  }
`

// 2. Default Fallback JSON Payload (Used on Error or Null State)
const defaultHeroJson = {
  videoId: 'GCYg1HQFQKY',
  subtitleText: 'Regenerative Travel',
  headingLine1: 'Curated Journeys',
  headingLine2Italic: 'That Enrich Your Soul',
  description: 'Immerse yourself in the raw rhythm of nature. Handcrafted expeditions that bring you face-to-face with the wild, curated for the modern explorer.',
  award1Image: '/images/awards/aw1.png',
  award1Alt: 'Outlook Responsible Tourism Award',
  award2Image: '/images/awards/aw3.png',
  award2Alt: 'Excellence in Travel Award'
}

// 3. Dynamic Data Fetch
const { data, error } = await useFetch(WP_GRAPHQL_ENDPOINT, {
  method: 'POST',
  body: { query }
})

// 4. Construct JSON Payload dynamically based on query success/failure
const heroJson = computed(() => {
  // If fetch fails or no valid data, return Default JSON
  if (error.value || !data.value?.data?.page?.heroVideoSection) {
    return defaultHeroJson
  }

  const acf = data.value.data.page.heroVideoSection

  // Success JSON constructed strictly from ACF fields with inline fallbacks
  return {
    videoId: acf.videoId || defaultHeroJson.videoId,
    subtitleText: acf.subtitleText || defaultHeroJson.subtitleText,
    headingLine1: acf.headingLine1 || defaultHeroJson.headingLine1,
    headingLine2Italic: acf.headingLine2Italic || defaultHeroJson.headingLine2Italic,
    description: acf.description || defaultHeroJson.description,
    award1Image: acf.award1Image || defaultHeroJson.award1Image,
    award1Alt: acf.award1Alt || defaultHeroJson.award1Alt,
    award2Image: acf.award2Image || defaultHeroJson.award2Image,
    award2Alt: acf.award2Alt || defaultHeroJson.award2Alt
  }
})

onMounted(() => {
  // Immediately set hidden state so they don't flash while waiting
  gsap.set('.hero-video-elem', { y: 30, opacity: 0 })

  const playHeroAnimation = () => {
    // Removed fixed delay; it now fires precisely when loader finishes
    const tl = gsap.timeline() 
    tl.to('.hero-video-elem', { 
      y: 0, 
      opacity: 1, 
      stagger: 0.15, 
      duration: 1.2, 
      ease: 'power3.out' 
    })
  }

  // Check state: If navigating back from another page, loader might already be finished
  if (isLoaderFinished.value) {
    playHeroAnimation()
  } else {
    // If initial load or route transition in progress, wait for the green light
    const unwatch = watch(isLoaderFinished, (isFinished) => {
      if (isFinished) {
        playHeroAnimation()
        unwatch() // Clean up watcher for performance
      }
    })
  }
})
</script>

<template>
  <section class="relative h-[calc(100vh)] w-full p-0 bg-[#F9F8F6] flex flex-col">
    
    <div class="relative flex-grow w-full overflow-hidden flex items-center justify-center shadow-sm">
      
      <!-- Dynamic Video Injection -->
      <div class="absolute inset-0 z-0 pointer-events-none bg-[#1A1A1A] overflow-hidden">
        <iframe 
          :src="`https://www.youtube.com/embed/${heroJson.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroJson.videoId}&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`" 
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] min-w-[177.77vh] min-h-[56.25vw] pointer-events-none opacity-80"
          frameborder="0" 
          allow="autoplay; encrypted-media"
          tabindex="-1"
        ></iframe>

        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <!-- Centered Content Container -->
      <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 pb-10 lg:px-24 pt-16 flex justify-center">
        <div class="max-w-4xl flex flex-col items-center text-center">
          
          <!-- H1 Eyebrow -->
          <h1 class="hero-video-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/90 uppercase w-full">
            <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/30"></span>
            <span>{{ heroJson.subtitleText }}</span>
            <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/30"></span>
          </h1>

          <!-- H2 Oversized Title with Clean Template Spans -->
          <h2 
            class="hero-video-elem text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.1] text-[#F9F8F6] mb-4"
            style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
          >
            <span class="font-normal">{{ heroJson.headingLine1 }}</span><br />
            <span class="font-normal leading-normal text-[#F6BD03] italic">{{ heroJson.headingLine2Italic }}</span>
          </h2>

          <!-- Decorative Line -->
          <div class="hero-video-elem flex items-center justify-center gap-5 mb-6 w-full max-w-[200px] md:max-w-[280px]">
            <span class="h-[1px] flex-grow bg-[#F9F8F6]/20"></span>
            <img src="/images/logoart.png" alt="Decoration" class="w-[14px] h-[14px] md:w-[18px] md:h-[18px] opacity-80 brightness-0 invert pointer-events-none" />
            <span class="h-[1px] flex-grow bg-[#F9F8F6]/20"></span>
          </div>

          <!-- Description -->
          <p class="hero-video-elem font-sans text-sm md:text-base lg:text-lg leading-[1.8] text-[#F9F8F6]/80 font-light mb-10 md:mb-12 max-w-xl">
            {{ heroJson.description }}
          </p>

          <!-- Twin CTAs Container -->
          <div class="hero-video-elem flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            
            <!-- Button 1 -->
            <NuxtLink to="/Itineraries" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-[#F9F8F6]/30 hover:border-[#b57819] transition-colors duration-500 overflow-hidden">
              <div class="absolute inset-0 bg-[#b57819] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
              <img src="/images/logoart.png" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
              <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
                Explore Itineraries
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </NuxtLink>
            
            <!-- Button 2 -->
            <NuxtLink to="/PlanYourJourney" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-[#F9F8F6]/30 hover:border-[#b57819] transition-colors duration-500 overflow-hidden">
              <div class="absolute inset-0 bg-[#b57819] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
              <img src="/images/logoart.png" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
              <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
                Plan Your Journey
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </NuxtLink>

          </div>

        </div>
      </div>

      <!-- Bottom-Left Dynamic Awards Section -->
      <div class="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-20 flex items-center gap-4 md:gap-6 hero-video-elem">
        <img 
          :src="heroJson.award1Image" 
          :alt="heroJson.award1Alt" 
          class="h-20 md:h-28 lg:h-32 w-auto object-contain award-img transition-all duration-500 cursor-pointer" 
        />
        <img 
          :src="heroJson.award2Image" 
          :alt="heroJson.award2Alt" 
          class="h-20 md:h-28 lg:h-32 w-auto object-contain award-img transition-all duration-500 cursor-pointer" 
        />
      </div>

      <!-- Scroll Indicator (Centered) -->
      <div class="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 hero-video-elem">
        <div class="w-[1px] h-10 md:h-12 bg-[#F9F8F6]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#F9F8F6] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#F6BD03]"></div>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}

.animate-scroll-drop {
  animation: scrollDrop 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}

/* Base state: pure bright white */
.award-img {
  filter: brightness(0) invert(1);
}

/* Hover state: natural brightness with 150% saturation */
.award-img:hover {
  filter: brightness(1.5) saturate(1.5);
}
</style>