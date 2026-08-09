<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  itinerary: {
    type: Object,
    default: () => ({
      title: 'The Malabar & Nilgiri Heritage Route',
      tagline: 'An 11-Day Immersive Journey Through Ancient Spice Trails and Cloud Forests',
      overview: 'Traverse the legendary spice routes of Kerala and ascend into the misty tea-clad heights of the Nilgiri Biosphere. Designed for travelers who favor deep historical context, private estate stays, and slow, unhurried exploration.',
      duration: '11 Days / 10 Nights',
      pace: 'Slow & Immersive',
      region: 'South India',
      groupSize: 'Private (1 - 4 Guests)',
      heroImg: '/images/home/itin-3.jpg',
      days: [
        { num: '01', title: 'Arrival in Fort Kochi', desc: 'Private transfer from Cochin International Airport to an ancestral colonial bungalow. Evening sunset walk along the cantilevered Chinese fishing nets.' },
        { num: '02', title: 'Maritime History & Spice Trails', desc: 'Guided walking tour through Mattancherry, visiting ancient synagogues, spice warehouses, and antique art galleries.' },
        { num: '03', title: 'Into the Backwater Labyrinth', desc: 'Board a private traditional rice barge for an overnight cruise across Vembanad lake with freshly prepared local meals.' },
        { num: '04', title: 'Ascent to the Cardamom Hills', desc: 'Private chauffeur-driven ascent into the Western Ghats, checking into a secluded plantation bungalow.' },
        { num: '05', title: 'The Art of Tea Cultivation', desc: 'Private estate walk with master tea makers, followed by an exclusive tea-pairing masterclass.' }
      ]
    })
  }
})

const containerRef = ref(null)
const activeDay = ref(0)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo('.itin-fade', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.value, start: 'top 80%', once: true } }
  )
})
</script>

<template>
  <article ref="containerRef" class="w-full bg-[#F9F8F6] pt-12 pb-24 px-6 sm:px-10 md:px-16 lg:px-24">
    
    <!-- Header -->
    <div class="max-w-4xl mx-auto flex flex-col items-center text-center itin-fade mb-12">
      <span class="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-[#C47551] uppercase font-bold mb-3">
        Bespoke Route Blueprint
      </span>
      <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#703e19] font-light leading-[1.15] mb-4">
        {{ itinerary.title }}
      </h1>
      <p class="font-sans text-sm md:text-base text-[#1A1A1A]/70 font-medium">
        {{ itinerary.tagline }}
      </p>
    </div>

    <!-- Quick Stats Grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 itin-fade">
      <div class="bg-white p-5 rounded-2xl border border-[#1A1A1A]/10 text-center">
        <span class="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 mb-1">Duration</span>
        <span class="font-serif text-lg text-[#703e19] font-medium">{{ itinerary.duration }}</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-[#1A1A1A]/10 text-center">
        <span class="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 mb-1">Pace</span>
        <span class="font-serif text-lg text-[#703e19] font-medium">{{ itinerary.pace }}</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-[#1A1A1A]/10 text-center">
        <span class="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 mb-1">Region</span>
        <span class="font-serif text-lg text-[#703e19] font-medium">{{ itinerary.region }}</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-[#1A1A1A]/10 text-center">
        <span class="block text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 mb-1">Party</span>
        <span class="font-serif text-lg text-[#703e19] font-medium">{{ itinerary.groupSize }}</span>
      </div>
    </div>

    <!-- Hero Image & Overview -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 itin-fade">
      <div class="lg:col-span-7 aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
        <img :src="itinerary.heroImg" :alt="itinerary.title" class="w-full h-full object-cover" />
      </div>
      <div class="lg:col-span-5 flex flex-col items-start text-left">
        <h3 class="font-serif text-2xl text-[#703e19] font-medium mb-4">Route Overview</h3>
        <p class="font-sans text-base md:text-[17px] text-[#1A1A1A]/85 font-light leading-[1.8] mb-8">
          {{ itinerary.overview }}
        </p>
        <NuxtLink to="/planyourjourney" class="px-6 py-3.5 bg-[#703e19] text-[#F9F8F6] rounded-xl font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#1A1A1A] transition-colors">
          Customize This Route
        </NuxtLink>
      </div>
    </div>

    <!-- Day by Day Breakdown Accordion -->
    <div class="max-w-4xl mx-auto flex flex-col gap-4 itin-fade">
      <h3 class="font-serif text-2xl text-[#703e19] font-medium mb-2 text-center">Day-by-Day Progression</h3>
      
      <div 
        v-for="(day, idx) in itinerary.days" 
        :key="day.num"
        class="bg-white rounded-2xl border transition-all duration-300 overflow-hidden"
        :class="activeDay === idx ? 'border-[#703e19]/40 shadow-md' : 'border-[#1A1A1A]/10'"
      >
        <button @click="activeDay = activeDay === idx ? null : idx" class="w-full p-6 text-left flex items-center justify-between gap-4 outline-none cursor-pointer">
          <div class="flex items-center gap-4">
            <span class="w-9 h-9 rounded-full bg-[#703e19]/10 text-[#703e19] flex items-center justify-center font-sans text-xs font-bold shrink-0">
              {{ day.num }}
            </span>
            <h4 class="font-serif text-lg md:text-xl text-[#1A1A1A] font-medium">{{ day.title }}</h4>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-[#703e19] transition-transform duration-300" :class="activeDay === idx ? 'rotate-180' : ''"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        <div v-if="activeDay === idx" class="px-6 pb-6 pt-0 ml-13 border-t border-[#1A1A1A]/5 mt-1">
          <p class="font-sans text-sm md:text-base text-[#1A1A1A]/80 font-light leading-relaxed">
            {{ day.desc }}
          </p>
        </div>
      </div>
    </div>

  </article>
</template>