<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  eyebrow: { type: String, default: 'Further Reading' },
  titleMain: { type: String, default: 'Related' },
  titleHighlight: { type: String, default: 'Stories' },
  posts: { type: Array, default: () => [] }
})

const isLoaderFinished = useLoaderState()
const sectionRef = ref(null)

// Default Payload (used if no props are passed)
const defaultPosts = [
  { 
    id: 'rp1', 
    title: 'The Great Migration of Kaziranga', 
    date: 'May 05, 2026', 
    tags: ['#Conservation', '#Wildlife', "Nature"], 
    intro: 'Witnessing the incredible conservation success story of the one-horned rhinoceros in the floodplains of Assam.', 
    img: '/images/home/itin-3.jpg', 
    url: '/blog/' 
  },
  { 
    id: 'rp2', 
    title: 'Turtles of the Coromandel Coast', 
    date: 'April 06, 2026', 
    tags: ['#MarineLife', '#Nature', '#Adventure'], 
    intro: 'Participating in midnight conservation walks to protect the nesting sites of the endangered Olive Ridley turtles.', 
    img: '/images/home/itin-2.jpg', 
    url: '/blog/' 
  },
  { 
    id: 'rp3', 
    title: 'Bespoke Flavors of Chettinad', 
    date: 'March 01, 2026', 
    tags: ['#Heritage', '#Culinary', "#Culture"], 
    intro: 'Tasting the fiery, complex, and deeply traditional cuisine housed within the grand mansions of Tamil Nadu.', 
    img: '/images/home/itin-1.jpg', 
    url: '/blog/' 
  }
]

// Ensure we only ever display a maximum of 3 cards to maintain the grid
const activePosts = computed(() => {
  return props.posts && props.posts.length > 0 
    ? props.posts.slice(0, 3) 
    : defaultPosts
})

// GSAP Scroll Reveal Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.related-header', { y: 20, opacity: 0 })
  gsap.set('.related-card', { y: 40, opacity: 0 })

  const playAnimations = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 85%',
        once: true
      }
    })

    tl.to('.related-header', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      .to('.related-card', { y: 0, opacity: 1, stagger: 0.15, duration: 0.5, ease: 'power3.out' }, "-=0.4")
  }

  if (isLoaderFinished.value) {
    playAnimations()
  } else {
    const unwatch = watch(isLoaderFinished, (val) => {
      if (val) { playAnimations(); unwatch() }
    })
  }
})
</script>

<template>
  <section ref="sectionRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-[95rem] mx-auto">
    
    <!-- Section Header (Updated Eyebrow Line) -->
    <div class="related-header flex flex-col items-center md:items-start mb-10 md:mb-12 border-t border-[#1A1A1A]/10 pt-16">
      
      <h3 class="flex items-center gap-4 font-sans text-[10px] lg:text-[11px] tracking-[0.3em] text-[#1A1A1A]/70 uppercase mb-1 md:mb-2">
        <span>{{ eyebrow }}</span>
        <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
      </h3>
      
      <h2 class="font-serif text-3xl md:text-4xl text-[#703e19] font-light">
        {{ titleMain }} <span class="italic text-[#C47551] font-normal capitalize">{{ titleHighlight }}</span>
      </h2>
    </div>

    <!-- 3-Column Blog Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <NuxtLink 
        v-for="post in activePosts" 
        :key="post.id" 
        :to="post.url"
        class="related-card group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(112,62,25,0.15)] hover:-translate-y-2 border border-[#1A1A1A]/5 hover:border-[#703e19]/30 transition-all duration-500 cursor-pointer w-full max-w-[500px] mx-auto md:max-w-none"
      >
        <!-- Image Wrapper -->
        <div class="relative w-full aspect-[16/10] overflow-hidden shrink-0">
          <img :src="post.img" :alt="post.title" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
          <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
        </div>
        
        <!-- Content Wrapper -->
        <div class="flex flex-col p-5 md:p-6 lg:px-5 lg:py-5 flex-grow relative">
          <!-- Date -->
          <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[#C47551] uppercase font-bold mb-2.5">
            {{ post.date }}
          </span>
          
          <!-- Title -->
          <h3 class="text-lg md:text-[19px] text-[#1A1A1A] leading-snug mb-2.5 font-serif font-medium group-hover:text-[#703e19] transition-colors">
            {{ post.title }}
          </h3>
          
          <!-- Tags -->
          <div class="flex items-center flex-wrap gap-1.5 mb-3">
            <span v-for="tag in post.tags" :key="tag" class="text-[9px] lg:text-[10px] bg-[#F9F8F6] px-2 py-1 rounded-md text-[#1A1A1A]/70 font-sans uppercase font-medium tracking-widest">
              {{ tag }}
            </span>
          </div>
          
          <!-- Intro Paragraph -->
          <p class="font-sans text-[13px] md:text-[14px] text-[#1A1A1A]/90 font-light leading-[1.8] line-clamp-2 mb-4">
            {{ post.intro }}
          </p>
          
          <!-- Rectangular Embedded Button -->
          <div class="mt-auto pt-2">
            <div class="inline-flex items-center justify-center gap-3 px-5 py-2.5 border border-[#1A1A1A]/15 bg-transparent group-hover:bg-[#703e19] group-hover:border-[#703e19] transition-all duration-300">
              <span class="text-[10px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#F9F8F6] font-bold uppercase transition-colors duration-300">
                Read Story
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-all duration-300 stroke-[#1A1A1A] group-hover:stroke-[#F9F8F6] group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </div>

      </NuxtLink>
    </div>

  </section>
</template>