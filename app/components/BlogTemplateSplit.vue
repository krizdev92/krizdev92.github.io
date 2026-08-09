<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  post: {
    type: Object,
    default: () => ({
      title: 'The Silent Backwaters at Dawn',
      category: '#Photography & Landscapes',
      date: 'August 05, 2026',
      readTime: '4 min read',
      heroImg: '/images/home/itin-2.jpg',
      secondaryImg: '/images/home/stay-2.jpeg',
      intro: 'Capturing the golden hour across the serene Vembanad lake, where life moves at the gentle pace of a wooden canoe.',
      body: 'Long before the motorized houseboats churn the emerald waters of Vembanad, the dawn belongs entirely to the local punter-boat operators and migratory waterfowl. There is a precise hour just as the sun clears the coconut palms when the water turns into a seamless mirror, reflecting the bruised violet and gold of the tropical sky.'
    })
  }
})

const containerRef = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo('.split-fade', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.value, start: 'top 80%', once: true } }
  )
})
</script>

<template>
  <article ref="containerRef" class="w-full bg-[#F9F8F6] mt-20 pt-12 pb-20 px-6 sm:px-10 md:px-16 lg:px-24">
    
    <!-- Split Header Grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24 split-fade">
      
      <!-- Left Column: Titles -->
      <div class="lg:col-span-6 flex flex-col items-start text-left">
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-[#C47551] uppercase font-bold mb-3">
          {{ post.category }} &bull; {{ post.date }}
        </span>
        
        <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#703e19] font-light leading-[1.15] mb-6">
          {{ post.title }}
        </h1>

        <p class="font-sans text-base md:text-lg text-[#1A1A1A]/85 font-light leading-[1.8] mb-8">
          {{ post.intro }}
        </p>

        <div class="flex items-center gap-4 text-xs font-sans tracking-widest text-[#1A1A1A]/60 uppercase">
          <span>Estimated read: {{ post.readTime }}</span>
        </div>
      </div>

      <!-- Right Column: Primary Hero Image -->
      <div class="lg:col-span-6 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
        <img :src="post.heroImg" :alt="post.title" class="w-full h-full object-cover" />
      </div>

    </div>

    <!-- Secondary Split Content Row -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center split-fade">
      <div class="lg:col-span-5 w-full aspect-square rounded-3xl overflow-hidden shadow-lg">
        <img :src="post.secondaryImg" alt="Detail view" class="w-full h-full object-cover" />
      </div>

      <div class="lg:col-span-7 flex flex-col justify-center">
        <h3 class="font-serif text-2xl text-[#703e19] font-medium mb-4">Navigating the Labyrinth of Canals</h3>
        <p class="font-sans text-base md:text-[17px] text-[#1A1A1A]/90 font-light leading-[1.9] mb-6">
          {{ post.body }}
        </p>
        <p class="font-sans text-base md:text-[17px] text-[#1A1A1A]/90 font-light leading-[1.9]">
          Every turn reveals a micro-ecosystem: women washing coir along narrow mud embankments, school children crossing suspension bridges made of rope and teak, and fishermen casting Chinese cantilever nets into the copper glow of dusk.
        </p>
      </div>
    </div>

  </article>
</template>