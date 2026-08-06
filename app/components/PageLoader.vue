<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import { useNuxtApp, useHead } from '#app'

const overlayRef = ref(null)
const wheelRef = ref(null)
const pulseRef = ref(null)
const isVisible = ref(true)

// Global loader state
const isLoaderFinished = useLoaderState()

// Lock scrollbar globally ON THE SERVER SIDE via useHead to prevent any flashing
useHead({
  bodyAttrs: {
    class: computed(() => isLoaderFinished.value ? '' : 'overflow-hidden')
  }
})

let loaderTimeline = null
let slowLoadTimeout = null
let isInitialLoad = true

const playHeritageLoaderAnimation = () => {
  if (loaderTimeline) loaderTimeline.kill()
  
  // Force scroll to top so the browser cannot restore a previous scroll position
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
  
  isLoaderFinished.value = false
  
  loaderTimeline = gsap.timeline()
  
  // Initial setup
  gsap.set(wheelRef.value, { opacity: 0, scale: 0.5, rotation: -180 })
  gsap.set(overlayRef.value, { autoAlpha: 1 })
  
  // Dramatic entrance followed by continuous spinning
  loaderTimeline
    .to(wheelRef.value, { 
      opacity: 1, 
      scale: 1, 
      rotation: 0, 
      duration: 1.2, 
      ease: 'back.out(1.4)' 
    })
    .to(wheelRef.value, {
      rotation: '+=360',
      duration: 4,
      repeat: -1,
      ease: 'linear'
    }, "<")

  // Pulse ring animation
  gsap.fromTo(pulseRef.value,
    { scale: 0.8, autoAlpha: 0.6, borderWidth: '2px' },
    { scale: 2.2, autoAlpha: 0, borderWidth: '0px', duration: 1.5, repeat: -1, ease: 'power2.out' }
  )
}

const hideLoader = () => {
  if (loaderTimeline) loaderTimeline.kill()

  const exitTimeline = gsap.timeline({
    onComplete: () => { 
      isVisible.value = false 
      // State changes to true, useHead automatically unlocks the body scrollbar
      isLoaderFinished.value = true
    }
  })
  
  exitTimeline.to(wheelRef.value, { 
    scale: 0.8, 
    opacity: 0, 
    duration: 0.4, 
    ease: 'power2.in' 
  })
  .to(overlayRef.value, { 
    autoAlpha: 0, 
    duration: 0.5, 
    ease: 'power2.inOut' 
  }, "<0.1")
}

onMounted(() => {
  const nuxtApp = useNuxtApp()
  
  // ==========================================
  // 1. INITIAL PAGE LOAD (Forced 2.2s display)
  // ==========================================
  playHeritageLoaderAnimation()
  
  setTimeout(() => {
    hideLoader()
    isInitialLoad = false // Mark initial load as complete
  }, 2200)

  // ==========================================
  // 2. ROUTE CHANGES (Internal Linking)
  // ==========================================
  nuxtApp.hook('page:start', () => {
    if (isInitialLoad) return
    
    // Set a 400ms grace period. If the page loads faster than this, loader stays hidden.
    slowLoadTimeout = setTimeout(() => {
      isVisible.value = true
      playHeritageLoaderAnimation()
    }, 400)
  })

  nuxtApp.hook('page:finish', () => {
    if (isInitialLoad) return
    
    // Clear the timer. If it finished before 400ms, the loader never fires.
    clearTimeout(slowLoadTimeout)
    
    // If the loader DID trigger (because it was a slow load), hide it immediately without the 2.2s delay
    if (isVisible.value) {
      hideLoader()
    }
  })
})
</script>

<template>
  <div v-show="isVisible" ref="overlayRef" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F8F6] backdrop-blur-md">
    <div class="relative flex items-center justify-center w-48 h-48">
      
      <!-- Pulse Ring -->
      <div ref="pulseRef" class="absolute inset-0 rounded-full border-[#C47551] pointer-events-none opacity-0"></div>
      
      <!-- Detailed Heritage Chakra Wheel SVG based on reference -->
      <div ref="wheelRef" class="w-32 h-32 text-[#703e19] opacity-0 drop-shadow-sm">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          
          <!-- Outer Rim with Spikes/Notches -->
          <circle cx="100" cy="100" r="84" stroke="currentColor" stroke-width="8" />
          <circle cx="100" cy="100" r="76" stroke="currentColor" stroke-width="2" />
          
          <!-- Outer Spikes (12 triangular perimeter points) -->
          <path d="M100 8 L106 20 L94 20 Z" fill="currentColor" />
          <path d="M100 192 L106 180 L94 180 Z" fill="currentColor" />
          <path d="M8 100 L20 106 L20 94 Z" fill="currentColor" />
          <path d="M192 100 L180 106 L180 94 Z" fill="currentColor" />
          
          <path d="M34 34 L45 42 L38 49 Z" fill="currentColor" />
          <path d="M166 166 L155 158 L162 151 Z" fill="currentColor" />
          <path d="M34 166 L45 158 L38 151 Z" fill="currentColor" />
          <path d="M166 34 L155 42 L162 49 Z" fill="currentColor" />

          <path d="M14 67 L26 71 L22 60 Z" fill="currentColor" />
          <path d="M186 133 L174 129 L178 140 Z" fill="currentColor" />
          <path d="M14 133 L26 129 L22 140 Z" fill="currentColor" />
          <path d="M186 67 L174 71 L178 60 Z" fill="currentColor" />

          <!-- Center Hub -->
          <circle cx="100" cy="100" r="22" stroke="currentColor" stroke-width="5" fill="#F9F8F6" />
          <circle cx="100" cy="100" r="10" fill="currentColor" />

          <!-- Spokes & Ornate Inner Arrowheads -->
          <g stroke="currentColor" stroke-width="4" stroke-linecap="round">
            <!-- Vertical & Horizontal -->
            <line x1="100" y1="20" x2="100" y2="78" />
            <line x1="100" y1="122" x2="100" y2="180" />
            <line x1="20" y1="100" x2="78" y2="100" />
            <line x1="122" y1="100" x2="180" y2="100" />

            <!-- Diagonals -->
            <line x1="43.4" y1="43.4" x2="84.5" y2="84.5" />
            <line x1="115.5" y1="115.5" x2="156.6" y2="156.6" />
            <line x1="43.4" y1="156.6" x2="84.5" y2="115.5" />
            <line x1="115.5" y1="84.5" x2="156.6" y2="43.4" />
          </g>

            <!-- Decorative Arrowhead Spades on inner spokes -->
            <path d="M100 64 L108 80 L92 80 Z" fill="currentColor" />
            <path d="M100 136 L108 120 L92 120 Z" fill="currentColor" />
            <path d="M64 100 L80 108 L80 92 Z" fill="currentColor" />
            <path d="M136 100 L120 108 L120 92 Z" fill="currentColor" />

            <!-- Ornate Circles on Inner Spokes -->
            <circle cx="100" cy="72" r="4" fill="#F9F8F6" />
            <circle cx="100" cy="128" r="4" fill="#F9F8F6" />
            <circle cx="72" cy="100" r="4" fill="#F9F8F6" />
            <circle cx="128" cy="100" r="4" fill="#F9F8F6" />

        </svg>
      </div>

    </div>
  </div>
</template>