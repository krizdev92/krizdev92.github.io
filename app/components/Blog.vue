<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
let ctx = null

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const blogData = {
  header: {
    eyebrow: 'Blog',
    titleMain: 'Stories from the',
    titleItalic: 'road less traveled.',
    decorationImage: '/images/logoart.png',
    intro: 'Immerse yourself in our latest explorations, travel guides, and cultural insights from across the subcontinent and beyond.'
  },
  featuredPost: {
    id: 'feat-1',
    title: 'Whale Watching in the Deep Blue',
    date: 'August 02, 2026', 
    tags: ['#MarineLife', '#Ocean', '#Nature'],
    intro: 'Sri Lanka is an island that is blessed with an eclectic mix of exotic beauty, culture and history that has made it the perfect place to discover the majestic blue whale in its natural habitat.',
    img: '/images/home/itin-1.jpg',
    url: '/'
  },
  standardPosts: [
    {
      id: 'post-1',
      title: 'Wildlife Safari in National Parks',
      date: 'July 28, 2026',
      tags: ['#Wildlife', '#Sanctuaries', '#Safari'],
      img: '/images/home/itin-2.jpg',
      url: '/'
    },
    {
      id: 'post-2',
      title: 'Diving and Snorkelling Depths',
      date: 'July 15, 2026',
      tags: ['#MarineLife', '#Diving', '#Ocean'],
      img: '/images/home/itin-3.jpg',
      url: '/'
    },
    {
      id: 'post-3',
      title: 'Surfing the Southern Coasts',
      date: 'June 30, 2026',
      tags: ['#WaterSports', '#Surfing', '#Adventure'],
      img: '/images/home/stay-3.jpg',
      url: '/'
    },
    {
      id: 'post-4',
      title: 'Ayurveda & Holistic Wellness',
      date: 'June 18, 2026',
      tags: ['#Ayurveda', '#Wellness', '#Healing'],
      img: '/images/home/stay-4.jpg',
      url: '/'
    }
  ],
  bottomCta: {
    text: 'Explore All Articles',
    url: '/blog',
    icon: '/images/logoart.png'
  }
}

onMounted(async () => {
  await nextTick()
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        once: true,
        invalidateOnRefresh: true
      }
    })

    tl.fromTo('.blog-header-elem', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', immediateRender: true }
    )
    .fromTo('.blog-card-elem',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out', immediateRender: true },
      "-=0.6"
    )
    .fromTo('.services-cta-elem',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', immediateRender: true },
      "-=0.4"
    )
  }, sectionRef.value)

  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 250)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#2a2a2a] flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-12 md:mb-16">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="blog-header-elem opacity-0 flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
          <span>{{ blogData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
        </h3>

        <h4 
          class="blog-header-elem opacity-0 text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#F9F8F6] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ blogData.header.titleMain }}</span><br />
          <span class="font-normal leading-tight text-[#C47551] italic capitalize">{{ blogData.header.titleItalic }}</span>
        </h4>

        <p class="blog-header-elem opacity-0 font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#F9F8F6]/70 font-light max-w-xl">
          {{ blogData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= BENTO GRID LAYOUT ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-4 md:px-6 lg:px-8 xl:px-8 2xl:px-10">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
        
        <!-- FEATURED POST -->
        <NuxtLink 
          :to="blogData.featuredPost.url" 
          class="blog-card-elem opacity-0 group flex flex-col h-full bg-[#FFFFFF] rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 xl:col-span-2 xl:row-span-2"
        >
          
          <div class="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:flex-grow overflow-hidden shrink-0">
            <img :src="blogData.featuredPost.img" :alt="blogData.featuredPost.title" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-out" />
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          </div>
          
          <div class="flex flex-col p-5 md:p-6 lg:px-6 lg:py-5 xl:p-8 shrink-0">
            <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[#1A1A1A]/50 uppercase font-semibold mb-2">
              {{ blogData.featuredPost.date }}
            </span>
            
            <h3 class="text-xl md:text-2xl lg:text-[24px] xl:text-[26px] text-[#1A1A1A] leading-tight mb-3" style="font-family: 'Noto Serif', serif; font-weight: 500;">
              {{ blogData.featuredPost.title }}
            </h3>
            
            <!-- Hashtags for Featured Post -->
            <div class="flex items-center gap-2 mb-4 overflow-hidden whitespace-nowrap">
              <span v-for="tag in blogData.featuredPost.tags" :key="tag" class="text-[10px] md:text-[11px] text-[#1A1A1A]/70 font-sans uppercase font-medium tracking-widest">
                {{ tag }}
              </span>
            </div>

            <!-- 2-Line Intro -->
            <p class="font-sans text-[13px] md:text-sm text-[#1A1A1A]/70 font-medium leading-[1.8] line-clamp-2 mb-6 md:mb-8 lg:mb-5 xl:mb-8 max-w-lg">
              {{ blogData.featuredPost.intro }}
            </p>
            
            <div class="group/btn relative inline-flex items-center gap-3 px-6 py-3 border border-[#1A1A1A]/20 bg-transparent group-hover:bg-[#673b1b] group-hover:border-[#673b1b] transition-colors duration-500 rounded-sm overflow-hidden w-fit mt-auto">
              <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#F9F8F6] font-bold uppercase transition-colors duration-500 relative z-10">
                Read More
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-transform duration-500 stroke-[#1A1A1A] group-hover:stroke-[#F9F8F6] group-hover:translate-x-1 relative z-10"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
          </div>

        </NuxtLink>

        <!-- STANDARD POSTS -->
        <NuxtLink 
          v-for="post in blogData.standardPosts" 
          :key="post.id" 
          :to="post.url"
          class="blog-card-elem opacity-0 group flex flex-col h-full bg-[#FFFFFF] rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer col-span-1"
        >
          <div class="relative w-full aspect-[16/9] overflow-hidden shrink-0">
            <img :src="post.img" :alt="post.title" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-[1.5s] ease-out" />
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          </div>
          
          <div class="flex flex-col p-4 md:p-5 lg:px-5 lg:py-4 xl:p-6 flex-grow">
            <span class="text-[8px] md:text-[9px] font-sans tracking-[0.2em] text-[#1A1A1A]/50 uppercase font-semibold mb-2">
              {{ post.date }}
            </span>
            <h3 class="text-base md:text-lg lg:text-xl text-[#1A1A1A] leading-tight mb-2 line-clamp-2" style="font-family: 'Noto Serif', serif; font-weight: 500;">
              {{ post.title }}
            </h3>
            
            <div class="flex items-center gap-2 mb-4 md:mb-6 lg:mb-4 xl:mb-6 overflow-hidden whitespace-nowrap">
              <span v-for="tag in post.tags" :key="tag" class="text-[10px] md:text-[11px] text-[#1A1A1A]/70 font-sans uppercase font-medium tracking-widest">
                {{ tag }}
              </span>
            </div>
            
            <div class="group/btn relative inline-flex items-center gap-2.5 px-5 py-2.5 border border-[#1A1A1A]/20 bg-transparent group-hover:bg-[#673b1b] group-hover:border-[#673b1b] transition-colors duration-500 rounded-sm overflow-hidden w-fit mt-auto">
              <span class="text-[8px] md:text-[9px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#F9F8F6] font-bold uppercase transition-colors duration-500 relative z-10">
                Read More
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 transform transition-transform duration-500 stroke-[#1A1A1A] group-hover:stroke-[#F9F8F6] group-hover:translate-x-1 relative z-10"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </NuxtLink>

      </div>

    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-2 md:mt-6 pt-4 flex flex-col items-center gap-8 md:gap-10 relative z-20 services-cta-elem opacity-0">
      
      <NuxtLink :to="blogData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-[#F9F8F6]/30 hover:border-[#C47551] transition-colors duration-500 overflow-hidden">
        <div class="absolute inset-0 bg-[#C47551] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src='blogData.bottomCta.icon' alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ blogData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </NuxtLink>

      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#f9f8f6]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#f9f8f6] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#C47551]"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Scroll Drop Animation */
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
.animate-scroll-drop {
  animation: scrollDrop 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}
</style>