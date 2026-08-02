<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sidebar from './Sidebar.vue'

const isMenuOpen = ref(false)

// Modular JSON-style routing for navigation links
const leftLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/About' },
  { name: 'Itineraries', path: '/Itineraries' },
  { name: 'Services', path: '/Services' }
]

const rightLinks = [
  { name: 'Impact', path: '/Impact' },
  { name: 'Testimonials', path: '/Testimonials' },
  { name: 'Blog', path: '/Blog' },
  { name: 'Community', path: '/Community' }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Liquid Horizon - GPU accelerated scaleX for water-like smoothness
  gsap.to('.liquid-horizon', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  })
})
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] transition-all duration-500">
    
    <!-- Foundation Flex Container -->
    <div class="flex justify-between items-center px-2 md:px-5 h-16 md:h-20 max-w-[120rem] mx-auto relative z-10">
      
      <!-- Left Side: Animated Hamburger & Desktop Nav -->
      <div class="flex flex-1 items-center justify-start">
        <button 
          @click="isMenuOpen = true"
          class="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-[2px] border-[#ac6c41]/20 flex flex-col justify-center items-center group hover:border-[#ac6c41] transition-colors duration-500 outline-none flex-shrink-0"
          aria-label="Open Menu"
        >
          <div class="w-[19px] h-[8px] md:w-[24px] md:h-[10px] relative flex flex-col items-start">
            <span 
              class="block h-[2px] bg-[#2A2421] absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-[19px] md:w-[24px] top-0 group-hover:w-[10px] md:group-hover:w-[14px]"
            ></span>
            <span 
              class="block h-[2px] bg-[#2A2421] absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-[10px] md:w-[14px] top-[9px] md:top-[10px] group-hover:w-[19px] md:group-hover:w-[24px]"
            ></span>
          </div>
        </button>

        <!-- Left Desktop Links -->
        <nav class="hidden xl:flex items-center gap-8 2xl:gap-12 ml-auto pr-10 2xl:pr-14">
          <NuxtLink 
            v-for="link in leftLinks" 
            :key="link.name" 
            :to="link.path" 
            class="group relative text-[12px] 2xl:text-[14px] tracking-[0.2em] text-[#2A2421] uppercase transition-colors duration-500 hover:text-[#ac6c41]" 
            style="font-family: 'Inter', sans-serif; font-weight: 400;"
          >
            {{ link.name }}
            <span class="absolute -bottom-[6px] left-1/2 w-0 h-[2px] bg-[#ac6c41] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full"></span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Center: Signature Logo -->
      <div class="flex-shrink-0 flex items-center justify-center">
        <NuxtLink to="/" class="cursor-pointer outline-none block">
          <img 
            src="/images/sreejith-logo.png" 
            alt="Sree Jith" 
            class="h-11 md:h-14 w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:drop-shadow-[0_8px_12px_rgba(99,42,0,0.25)] hover:scale-[1.03] hover:-translate-y-[2px]" 
          />
        </NuxtLink>
      </div>

      <!-- Right Side: Desktop Nav & Contact Button -->
      <div class="flex flex-1 items-center justify-end">
        
        <!-- Right Desktop Links -->
        <nav class="hidden xl:flex items-center gap-8 2xl:gap-12 mr-auto pl-10 2xl:pl-14">
          <NuxtLink 
            v-for="link in rightLinks" 
            :key="link.name" 
            :to="link.path" 
            class="group relative text-[12px] 2xl:text-[14px] tracking-[0.2em] text-[#2A2421] uppercase transition-colors duration-500 hover:text-[#ac6c41]" 
            style="font-family: 'Inter', sans-serif; font-weight: 400;"
          >
            {{ link.name }}
            <span class="absolute -bottom-[6px] left-1/2 w-0 h-[2px] bg-[#ac6c41] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full"></span>
          </NuxtLink>
        </nav>

        <NuxtLink to="/Contact" class="cursor-pointer outline-none block">  
          <button 
            class="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-[2px] border-[#ac6c41]/20 flex items-center justify-center group hover:border-[#ac6c41] transition-colors duration-500 outline-none flex-shrink-0"
            aria-label="Contact Us"
          >
            <svg viewBox="0 0 24 24" class="w-[19px] h-[19px] md:w-[24px] md:h-[24px] text-[#2A2421] relative top-[1px] right-[1px] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.2]" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </NuxtLink>
      </div>

    </div>

    <!-- 
      Abstract Liquid Horizon Progress Track
      Anchored to the very bottom, flowing strictly left to right.
    -->
    <div class="absolute bottom-0 left-0 w-full h-[2px] md:h-[3px] pointer-events-none z-20 overflow-hidden">
      <div 
        class="liquid-horizon absolute top-0 left-0 w-full h-full origin-left scale-x-0"
        style="
          background: linear-gradient(90deg, rgba(172, 108, 65, 0) 0%, rgba(172, 108, 65, 0.6) 60%, rgba(139, 0, 0, 1) 100%);
          box-shadow: 2px 0 6px rgba(139, 0, 0, 0.6);
        "
      ></div>
    </div>

  </header>

  <!-- 
    Sidebar Component Integration 
    Moved OUTSIDE the <header> tag to escape the backdrop-blur containing block.
    This allows it to correctly attach to the full viewport window.
  -->
  <Sidebar 
    :isOpen="isMenuOpen" 
    :primaryLinks="leftLinks" 
    :secondaryLinks="rightLinks" 
    @close="isMenuOpen = false" 
  />
  
</template>