<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// UNIFIED JSON PAYLOAD FOR WORDPRESS INJECTION
// ==========================================
const aboutSectionData = {
  header: {
    eyebrow: 'About',
    greeting: "Hello, I'm",
    name: "Sree Jith.",
    subtitles: [
      'Travel Designer', 
      'Storyteller', 
      'Cultural Explorer'
    ],
    decorationImage: '/images/logoart.png'
  },
  content: {
    mainImage: '/images/home/about.jpg',
    paragraphs: [
      "For over a decade, I have explored the cultural landscapes of India, documenting stories, traditions, and ways of life that often remain hidden from mainstream tourism. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, natus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, sunt blanditiis earum quod culpa obcaecati?",
      "I design immersive, luxury journeys that connect travelers with the soul of a destination—its people, heritage, and living cultures—while creating meaningful impact for the communities we visit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, animi."
    ],
    cursiveAccent: "Pariatur voluptate omnis a quam. Cumque ut voluptate consequuntur dolores hic sint optio nobis illum placeat eius."
  },
  bottomCta: {
    text: "Discover My Story",
    url: "/about",
    icon: '/images/logoart.png'
  }
}

// 5 Stats with Raw Phosphor SVGs
const statsData = [
  {
    number: '12+',
    label: 'Years of<br/>Research &<br/>Exploration',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z"/><path d="m8 16 5.99-2L16 8l-6 2Z"/></svg>`,
  },
  {
    number: '340+',
    label: 'Cultural<br/>Practitioners<br/>Connected',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true"><path d="M10 13H8c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5Zm-5 5c0-1.65 1.35-3 3-3h2c1.65 0 3 1.35 3 3Zm7.73-11.49c-.08-.22-.19-.42-.3-.62v-.01c-.69-1.14-1.93-1.89-3.42-1.89-2.28 0-4 1.72-4 4s1.72 4 4 4c1.49 0 2.73-.74 3.42-1.89v-.01c.12-.2.22-.4.3-.62.02-.06.03-.12.05-.18.06-.17.11-.34.15-.52.05-.25.07-.51.07-.78s-.03-.53-.07-.78c-.03-.18-.09-.35-.15-.52-.02-.06-.03-.12-.05-.18ZM9 10c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2Zm6 0q-.165 0-.33-.03c-.22.66-.56 1.27-.98 1.81.41.13.84.22 1.31.22 2.28 0 4-1.72 4-4s-1.72-4-4-4c-.47 0-.9.09-1.31.22.43.53.76 1.14.98 1.81.11-.01.21-.03.33-.03 1.18 0 2 .82 2 2s-.82 2-2 2Zm1 3h-1.11c.6.58 1.08 1.27 1.44 2.03C17.83 15.2 19 16.46 19 18h-2v1c0 .35-.07.69-.18 1H20c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5Z"/></svg>`,
  },
  {
    number: '120+',
    label: 'Original<br/>Experiences<br/>Designed',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true">  <path d="M16 10c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4Zm-6 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z"/><path d="M11.42 21.81c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8s-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82ZM12 4c3.31 0 6 2.69 6 6 .02 4.44-4.39 8.43-6 9.74-1.61-1.31-6.02-5.29-6-9.74 0-3.31 2.69-6 6-6Z"/></svg>`,
  },
  {
    number: '85+',
    label: 'Community<br/>Networks<br/>Engaged',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true"><path d="M20.24 4.76c-2.3-2.29-5.87-2.35-8.24-.19-2.37-2.16-5.93-2.09-8.24.2-2.36 2.37-2.36 6.07 0 8.43l7.53 7.52c.2.19.45.29.71.29s.51-.1.71-.29l7.53-7.52c2.36-2.36 2.36-6.06 0-8.43Zm-8.24 13.83-6.82-6.81c-1.57-1.57-1.57-4.03 0-5.6.79-.79 1.8-1.18 2.81-1.18s2.02.39 2.8 1.18l.5.5-2.38 2.39c-.51.52-.51 1.36 0 1.88.49.49 1.13.73 1.77.73s1.28-.24 1.77-.73l1.64-1.64 3.59 3.59-1.04 1.04-2.3-2.3-.71.71 2.3 2.3-.79.79-2.3-2.3-.71.71 2.3 2.3-.79.79-2.29-2.29-.71.71 2.29 2.29-.94.94Zm6.82-6.81-.42.42-3.59-3.59 1.24-1.24-.71-.71-3.59 3.59c-.58.58-1.54.58-2.12 0-.13-.13-.13-.34 0-.47l3.42-3.44.16-.16c1.57-1.57 4.04-1.57 5.62 0 1.57 1.58 1.57 4.04 0 5.6Z"/></svg>`,  
  },
  {
    number: '2025',
    label: 'Outlook<br/>Responsible<br/>Tourism Award',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true"><path d="M10.15 11.62 12 10.65l1.85.97-.35-2.06L15 8.09l-2.07-.3L12 5.92l-.93 1.87-2.07.3 1.5 1.47-.35 2.06Z"/><path d="M21 4h-3V3c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v1H3c-.55 0-1 .45-1 1v3c0 4.29 1.79 6.88 4.81 6.99A6 6 0 0 0 11 17.91V20H8v2h8v-2h-3v-2.09a5.98 5.98 0 0 0 4.19-2.92C20.2 14.88 22 12.29 22 8V5c0-.55-.45-1-1-1ZM4 8V6h2v6c0 .28.03.56.06.83C4.22 12.12 4 9.31 4 8Zm12 4c0 2.21-1.79 4-4 4s-4-1.79-4-4V4h8Zm4-4c0 1.31-.22 4.12-2.06 4.83.04-.27.06-.55.06-.83V6h2Z"/></svg>`,
  }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true
    }
  })

  // Header Elements (Centered)
  tl.fromTo('.about-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power3.out' }
  )
  // Left: Square Image Container (Animation targets inner div now)
  .fromTo('.about-image-elem',
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
    "-=0.8"
  )
  // Right: Content & Stats\
  .fromTo('.about-content-elem',
    { opacity: 0, y: 30 }, // <--- Changed x to y
    { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' },
    "-=0.8"
  )
  // Bottom: CTA
  .fromTo('.about-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.4"
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#F9F8F6]/20 flex flex-col">

    <!-- ================= PART 1: TOP CENTERED HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-4 md:mb-6">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <!-- Eyebrow -->
        <h3 class="about-header-elem flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ aboutSectionData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <!-- Main Name -->
        <h4 
          class="about-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#1A1A1A] mb-3 md:mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
        <span class="font-normal leading-tight italic capitalize ">{{ aboutSectionData.header.greeting }}&nbsp;</span>
        <span class="font-normal leading-tight text-[#673b1c]">{{ aboutSectionData.header.name }}</span>
        </h4>

        <!-- Subtitles -->
        <div class="about-header-elem flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-sans tracking-[0.2em] leading-3 text-[#1A1A1A]/80 uppercase w-full mb-4 md:mb-5">
          <template v-for="(subtitle, index) in aboutSectionData.header.subtitles" :key="index">
            <span>{{ subtitle }}</span>
            <span v-if="index !== aboutSectionData.header.subtitles.length - 1" class="w-[1px] h-3 md:h-4 bg-[#1A1A1A]/30"></span>
          </template>
        </div>

      </div>
    </div>

    <!-- ================= PART 2: SPLIT CONTENT ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-8 md:px-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-6 md:mb-8">
      
      <!-- LEFT: Sticky Image Wrapper (Static Structural Element) -->
      <div class="w-full lg:w-1/2 lg:sticky lg:top-28 flex justify-center self-start z-20">
        <!-- Inner Element Handles the GSAP Transform Animation -->
        <div class="about-image-elem w-full max-w-[550px] aspect-square rounded-2xl bg-[#1A1A1A]/[0.03] border border-[#1A1A1A]/5 flex items-center justify-center p-0 overflow-hidden relative shadow-sm">
          <img 
            :src="aboutSectionData.content.mainImage" 
            alt="Sree Jith Collage" 
            class="w-auto h-auto min-w-full min-h-full object-contain drop-shadow-sm" 
          />
        </div>
      </div>

      <!-- RIGHT: Paragraphs & Stats -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10">
        
        <p 
          v-for="(para, index) in aboutSectionData.content.paragraphs" 
          :key="index"
          class="about-content-elem font-sans text-sm md:text-base lg:text-[15px] indent-4 leading-[1.8] text-[#1A1A1A]/90 font-light max-w-xl mx-auto lg:mx-0"
          :class="index === aboutSectionData.content.paragraphs.length - 1 ? 'mb-8' : 'mb-5'"
        >
          {{ para }}
        </p>

        <!-- Cursive Accent Quote Box (Matching Reference Layout) -->
        <div class="about-content-elem mx-auto lg:mx-0 relative w-full max-w-xl bg-[#673b1c]/5 border-l-4 border-l-[#673b1c]/70 px-2 md:px-4 py-1.5 md:py-3 rounded-r-lg mb-6 md:mb-8 flex flex-col items-start text-left">
          
          <!-- Left-aligned Quote Icon -->
          <svg class="absolute z-0 top-2 right-5 w-20 h-20 text-[#673b1c]/10 shrink-0 mt-1 transform rotate-180" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
          </svg>

          <div class="flex items-start p-2 w-full">
            <!-- Cursive Accent Text -->
            <p class="text-2xl md:text-3xl font-semibold text-[#673b1c] leading-relaxed" style="font-family: 'Caveat', cursive;">
              {{ aboutSectionData.content.cursiveAccent }}
            </p>
          </div>

        </div>

        <!-- Horizontal Divider before Stats -->
        <div class="about-content-elem w-full max-w-xl h-[1px] bg-[#1A1A1A]/10 mb-8 mx-auto lg:mx-0"></div>

        <!-- Flexbox Stats Row -->
        <div class="about-content-elem flex flex-wrap justify-center 2xl:justify-start gap-x-8 lg:gap-9 gap-y-8 w-full max-w-2xl mx-auto lg:mx-0">
          
          <div 
            v-for="(stat, index) in statsData" 
            :key="index"
            class="flex flex-col items-center text-center w-[80px] md:w-[90px]"
          >
            <!-- Circular Icon Wrapper -->
            <div class="w-11 h-11 md:w-13 md:h-13 rounded-full border border-[#673b1c]/20 bg-[#673b1c]/5 flex items-center justify-center text-[#673b1c]/80 mb-3">
              <div v-html="stat.icon" class="flex items-center justify-center"></div>
            </div>
            
            <!-- Number -->
            <span class="text-[20px] md:text-[25px] text-[#1A1A1A]/70 mb-2" style="font-family: 'Noto Serif', serif; font-weight: 500;">
              {{ stat.number }}
            </span>
            
            <!-- Label -->
            <span class="font-sans text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#1A1A1A]/70 font-bold leading-[1.4]" v-html="stat.label"></span>
          </div>

        </div>

      </div>
    </div>

    <!-- ================= PART 3: CTA & SCROLL INDICATOR ================= -->
    <div class="relative z-10 w-full pt-4 flex flex-col items-center gap-8 md:gap-10 about-cta-elem">
      
      <NuxtLink :to="aboutSectionData.bottomCta.url" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 mb-0 border border-[#1A1A1A]/20 hover:border-[#673b1c] transition-colors duration-500 overflow-hidden rounded-sm">
        <div class="absolute inset-0 bg-[#673b1c] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img :src="aboutSectionData.bottomCta.icon" alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 transition-all duration-500 relative z-10 group-hover:invert group-hover:opacity-100" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ aboutSectionData.bottomCta.text }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#1A1A1A] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </NuxtLink>

      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#673b1c]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#673b1c] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#673b1c]"></div>
      </div>

    </div>

  </section>
</template>

<style scoped>
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
.animate-scroll-drop {
  animation: scrollDrop 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}
</style>