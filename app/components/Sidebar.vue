<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

// Unified main navigation
const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/About' },
  { name: 'Itineraries', path: '/Itineraries' },
  { name: 'Services', path: '/Services' },
  { name: 'Impact', path: '/Impact' },
  { name: 'Blog', path: '/Blog' },
]

// Call to action boxes
const ctaLinks = [
  { name: 'Plan Your Journey', path: '/PlanYourJourney' },
  { name: 'Contact', path: '/Contact' }
]

// Footer utility links
const footerLinks = [
  { name: 'Frequently Asked Questions', path: '/FAQ' },
  { name: 'Privacy Policy', path: '/Privacy' },
  { name: 'Terms & Conditions', path: '/Terms' }
]

onMounted(() => {
  gsap.set('.sidebar-panel', { xPercent: -100 })
  gsap.set('.sidebar-overlay', { autoAlpha: 0 })
})

// Failsafe: Ensure scroll is unlocked if the component is unexpectedly destroyed
onUnmounted(() => {
  document.body.style.overflow = ''
})

watch(() => props.isOpen, (newVal) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
  
  if (newVal) {
    // Lock the body scroll to prevent interacting with the page behind
    document.body.style.overflow = 'hidden'
    
    tl.to('.sidebar-overlay', { autoAlpha: 1, duration: 0.5 })
      .to('.sidebar-panel', { xPercent: 0 }, "<")
      // Animate the 8 main links
      .fromTo('.sidebar-link-item', 
        { x: -30, opacity: 0 }, 
        { x: 0, opacity: 1, stagger: 0.04, duration: 0.6 }, 
        "-=0.4"
      )
      // Animate the CTA boxes popping in
      .fromTo('.sidebar-cta',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        "-=0.4"
      )
      // Fade in the footer links
      .fromTo('.sidebar-footer',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      )
  } else {
    // Unlock the body scroll when sidebar closes
    document.body.style.overflow = ''
    
    tl.to('.sidebar-panel', { xPercent: -100, ease: 'power3.inOut' })
      .to('.sidebar-overlay', { autoAlpha: 0, duration: 0.5 }, "<0.1")
  }
})
</script>

<template>
  <div class="fixed inset-0 z-[100] pointer-events-none flex">
    
    <!-- Deep, non-filtered overlay for cinematic contrast. pointer-events-auto blocks all clicks beneath it. -->
    <div 
      class="sidebar-overlay absolute inset-0 bg-[#2A2421]/60 pointer-events-auto cursor-pointer"
      @click="emit('close')"
    ></div>

    <!-- Sidebar Panel -->
    <aside class="sidebar-panel relative w-full md:w-[450px] h-full bg-[#F9F8F6] pointer-events-auto flex flex-col shadow-2xl border-r border-[#C47551]/20">
      
        <!-- Top Header Section (Pinned) -->
        <div class="flex items-center justify-between px-8 md:px-12 py-5 border-b border-[#C47551]/10 flex-shrink-0">
            <span class="font-sans text-md tracking-[0.3em] text-[#673b1c] uppercase font-bold" style="font-family: 'Inter', sans-serif;">MENU</span>
            
            <button 
              @click="emit('close')" 
              class="w-10 h-10 md:w-12 md:h-12 rounded-full border-[2px] border-[#C47551]/20 flex items-center justify-center group hover:border-[#C47551] transition-colors duration-500 outline-none cursor-pointer"
            >
                <div class="relative w-5 h-5 flex flex-col justify-center items-center">
                    <span class="w-6 h-[2px] bg-[#2A2421] absolute rotate-45 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-180 group-hover:opacity-0"></span>
                    <span class="w-6 h-[2px] bg-[#2A2421] absolute -rotate-45 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-rotate-180 group-hover:opacity-0"></span>
                    
                    <span class="w-5 h-[2px] bg-[#C47551] absolute -translate-y-1.5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-y-0"></span>
                    <span class="w-5 h-[2px] bg-[#C47551] absolute translate-y-1.5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-y-0"></span>
                </div>
            </button>
        </div>

      <!-- Unified Scrollable Area (Links + Logo) -->
      <div class="flex flex-col flex-grow overflow-y-auto">
        
        <!-- Content Container -->
        <div class="flex flex-col px-8 md:px-12 py-6 gap-10">
          
          <!-- Main 8 Links -->
          <nav class="flex flex-col gap-5">
            <NuxtLink 
              v-for="link in mainLinks" 
              :key="link.name" 
              :to="link.path"
              @click="emit('close')"
              class="sidebar-link-item group relative w-fit flex items-center gap-4 text-xl md:text-2xl text-[#2A2421] uppercase tracking-[0.05em] transition-colors duration-500 hover:text-[#C47551] cursor-pointer"
              style="font-family: 'Inter', sans-serif; font-weight: 300;"
            >
              <span class="w-0 h-[2px] bg-[#C47551] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-8"></span>
              {{ link.name }}
            </NuxtLink>
          </nav>

          <!-- CTA Boxes -->
          <div class="flex flex-col gap-4">
            <NuxtLink 
              v-for="cta in ctaLinks" 
              :key="cta.name" 
              :to="cta.path"
              @click="emit('close')"
              class="sidebar-cta group relative w-full border border-[#C47551]/50 py-4 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C47551] hover:bg-[#C47551]/5 cursor-pointer"
            >
              <span class="text-sm tracking-[0.2em] text-[#2A2421] uppercase transition-colors duration-500 group-hover:text-[#C47551]" style="font-family: 'Inter', sans-serif; font-weight: 400;">
                {{ cta.name }}
              </span>
            </NuxtLink>
          </div>

          <!-- Footer Utility Links -->
          <div class="sidebar-footer flex flex-col gap-3 pb-4">
            <NuxtLink 
              v-for="footerLink in footerLinks" 
              :key="footerLink.name" 
              :to="footerLink.path"
              @click="emit('close')"
              class="w-fit text-base tracking-[0.1em] text-[#2A2421]/60 uppercase transition-all duration-500 hover:text-[#C47551] hover:opacity-100 cursor-pointer"
              style="font-family: 'Inter', sans-serif; font-weight: 400;"
            >
              {{ footerLink.name }}
            </NuxtLink>
          </div>

        </div>

        <!-- Sticky Footer Logo (mt-auto dynamically pushes it to the bottom if there is space) -->
        <div class="mt-auto px-8 md:px-12 py-5 border-t border-[#C47551]/10 flex-shrink-0 bg-[#F9F8F6]">
          <img src="/images/sreejith-logo.png" alt="Sree Jith" class="h-10 md:h-12 w-auto object-contain opacity-60 transition-opacity duration-500 hover:opacity-100" />
          <span class="text-[8px] md:text-[10px] tracking-[0.3em] font-sans text-[#2A2421]/90 uppercase mt-1 md:mt-1.5 ">
            Travel Experience Designer
          </span>
        </div>

      </div>

    </aside>
  </div>
</template>