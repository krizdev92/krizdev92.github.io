<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

const isAtBottom = ref(false)
const isLoaderFinished = useLoaderState()

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY
  const threshold = document.documentElement.offsetHeight - 100
  isAtBottom.value = scrollPosition >= threshold
}

const toggleScroll = () => {
  if (isAtBottom.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: document.documentElement.offsetHeight, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Set initial hidden state immediately
  gsap.set('.scroll-nav-elem', { opacity: 0, scale: 0.8, y: 20 })

  const playScrollNavAnimation = () => {
    gsap.to('.scroll-nav-elem', { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      duration: 1, 
      ease: 'power3.out' 
    })
  }

  // Sync with global loader state
  if (isLoaderFinished.value) {
    playScrollNavAnimation()
  } else {
    const unwatch = watch(isLoaderFinished, (isFinished) => {
      if (isFinished) {
        playScrollNavAnimation()
        unwatch()
      }
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button 
    @click="toggleScroll"
    class="scroll-nav-elem fixed bottom-3 right-[1.125rem] sm:bottom-4 sm:right-6 md:bottom-6 md:right-8 z-[90] w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#673b1b] text-[#F9F8F6] shadow-lg flex items-center justify-center hover:bg-[#b57819] transition-colors duration-300 ease-out group overflow-hidden"
    :aria-label="isAtBottom ? 'Scroll to top' : 'Scroll to bottom'"
  >
    <div class="relative w-full h-full flex items-center justify-center transform transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
      <!-- Chevron Down -->
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 absolute transition-all duration-500" :class="isAtBottom ? 'opacity-0 translate-y-4 scale-50' : 'opacity-100 translate-y-0 scale-100 group-hover:translate-y-1'">
        <path d="M6 9l6 6 6-6"></path>
      </svg>
      <!-- Chevron Up -->
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 absolute transition-all duration-500" :class="isAtBottom ? 'opacity-100 translate-y-0 scale-100 group-hover:-translate-y-1' : 'opacity-0 -translate-y-4 scale-50'">
        <path d="M18 15l-6-6-6 6"></path>
      </svg>
    </div>
  </button>
</template>