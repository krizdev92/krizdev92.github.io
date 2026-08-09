<script setup>
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  eyebrow: { type: String, default: 'Discover More' },
  titleMain: { type: String, default: 'Related' },
  titleHighlight: { type: String, default: 'Journeys.' },
  itineraries: { type: Array, default: () => [] }
})

const isLoaderFinished = useLoaderState()
const sectionRef = ref(null)

const defaultItineraries = [
  { id: 'i1', title: 'The Malabar & Nilgiri Heritage Route', days: '11 Days', region: 'South India', img: '/images/home/itin-3.jpg', url: '/itineraries/malabar-heritage' },
  { id: 'i2', title: 'Himalayan Snow Leopard Expedition', days: '14 Days', region: 'Spiti Valley', img: '/images/home/itin-1.jpg', url: '/itineraries/snow-leopard' },
  { id: 'i3', title: 'Sacred Temples & Ancient Crafts', days: '9 Days', region: 'Tamil Nadu', img: '/images/home/stay-1.jpeg', url: '/itineraries/tamil-nadu' }
]

const activeItems = computed(() => props.itineraries.length > 0 ? props.itineraries.slice(0, 3) : defaultItineraries)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true } })
  tl.fromTo('.rel-itin-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    .fromTo('.rel-itin-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }, "-=0.4")
})
</script>

<template>
  <section ref="sectionRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-[95rem] mx-auto border-t border-[#1A1A1A]/10 pt-16">
    
    <div class="rel-itin-header flex flex-col items-center md:items-start mb-10 md:mb-12">
      <h3 class="flex items-center gap-4 font-sans text-[10px] lg:text-[11px] tracking-[0.3em] text-[#1A1A1A]/70 uppercase mb-3">
        <span>{{ eyebrow }}</span>
        <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
      </h3>
      <h2 class="font-serif text-3xl md:text-4xl text-[#703e19] font-light">
        {{ titleMain }} <span class="italic text-[#C47551] font-normal capitalize">{{ titleHighlight }}</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <NuxtLink 
        v-for="item in activeItems" 
        :key="item.id" 
        :to="item.url"
        class="rel-itin-card group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(112,62,25,0.15)] hover:-translate-y-2 border border-[#1A1A1A]/5 hover:border-[#703e19]/30 transition-all duration-500 w-full max-w-[500px] mx-auto md:max-w-none"
      >
        <!-- Top Right Circular Arrow -->
        <div class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center z-20 shadow-md group-hover:bg-[#703e19] transition-colors duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 stroke-[#1A1A1A] group-hover:stroke-white transform group-hover:rotate-45 transition-transform duration-300"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>

        <div class="relative w-full aspect-[4/5] overflow-hidden shrink-0">
          <img :src="item.img" :alt="item.title" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>
          
          <div class="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col z-20">
            <div class="flex items-center gap-3 mb-3">
              <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-white font-sans uppercase font-bold tracking-widest border border-white/10">{{ item.days }}</span>
              <span class="text-[10px] text-white/80 font-sans uppercase tracking-widest">{{ item.region }}</span>
            </div>
            <h3 class="font-serif text-2xl lg:text-3xl text-white font-medium leading-tight group-hover:text-[#C47551] transition-colors">
              {{ item.title }}
            </h3>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>