<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useNuxtApp } from '#app'

const overlayRef = ref(null)
const logoRef = ref(null)
const pulseRef = ref(null)
const isVisible = ref(true)

let loaderTimeline = null

const playDynamicCompassAnimation = () => {
  if (loaderTimeline) loaderTimeline.kill()
  
  loaderTimeline = gsap.timeline()
  
  // IMMEDIATELY kill the stagnant state before drawing anything on screen
  gsap.set(logoRef.value, { opacity: 0, scale: 0.7, rotation: -75 })
  gsap.set(overlayRef.value, { autoAlpha: 1 })
  
  // High-energy magnetic left/right oscillation
  loaderTimeline
    .to(logoRef.value, { 
      opacity: 1, 
      scale: 1, 
      rotation: 45, 
      duration: 0.35, 
      ease: 'back.out(1.7)' 
    })
    .to(logoRef.value, { 
      rotation: -30, 
      duration: 0.25, 
      ease: 'power2.inOut' 
    })
    .to(logoRef.value, { 
      rotation: 15, 
      duration: 0.2, 
      ease: 'power2.inOut' 
    })
    .to(logoRef.value, { 
      rotation: -5, 
      duration: 0.15, 
      ease: 'power2.inOut' 
    })
    .to(logoRef.value, { 
      rotation: 10, 
      duration: 0.2, 
      ease: 'power2.inOut' 
    })
    .to(logoRef.value, { 
      rotation: -20, 
      duration: 0.2, 
      ease: 'power2.inOut' 
    })
    .to(logoRef.value, { 
      rotation: 0, 
      duration: 0.35, 
      ease: 'elastic.out(1, 0.6)' 
    })
    
    // Pulse ring fires concurrently with the primary swing stabilization
    .fromTo(pulseRef.value,
      { scale: 0.7, autoAlpha: 0.9, borderWidth: '2px' },
      { scale: 2.4, autoAlpha: 0, borderWidth: '0px', duration: 0.9, ease: 'power3.out' },
      "-=0.6"
    )
}

const hideLoader = () => {
  const exitTimeline = gsap.timeline({
    onComplete: () => { isVisible.value = false }
  })
  
  exitTimeline.to(logoRef.value, { 
    scale: 0.8, 
    opacity: 0, 
    duration: 0.35, 
    ease: 'power2.in' 
  })
  .to(overlayRef.value, { 
    autoAlpha: 0, 
    duration: 0.45, 
    ease: 'power2.inOut' 
  }, "<0.1")
}

onMounted(() => {
  const nuxtApp = useNuxtApp()
  
  // Initial Load Trigger
  playDynamicCompassAnimation()
  
  setTimeout(() => {
    hideLoader()
  }, 1900) // Adjusted slightly to allow the heavy oscillations to show beautifully

  // Route Changes
  nuxtApp.hook('page:start', () => {
    isVisible.value = true
    playDynamicCompassAnimation()
  })

  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      hideLoader()
    }, 300)
  })
})
</script>

<template>
  <div v-show="isVisible" ref="overlayRef" class="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-50 backdrop-blur-md">
    <div class="relative flex items-center justify-center w-52 h-52">
      
      <!-- Pulse Ring -->
      <div ref="pulseRef" class="absolute inset-0 rounded-full border-[#C47552] pointer-events-none opacity-0"></div>
      
      <!-- Compass Image -->
      <img 
        ref="logoRef" 
        src="/images/logoart.png" 
        alt="Navigating..." 
        class="w-24 h-24 object-contain pointer-events-none opacity-0"
      />
    </div>
  </div>
</template>