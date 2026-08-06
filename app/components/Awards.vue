<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const awardsData = {
  header: {
    eyebrow: 'Awards',
    titleMain: 'Recognized for',
    titleItalic: 'uncompromising excellence.',
    decorationImage: '/images/logoart.png',
    intro: 'Our dedication to crafting extraordinary journeys and preserving local heritage has been celebrated by the world\'s leading travel authorities.'
  },
  items: [
    { id: 2, img: '/images/awards/aw2.png', alt: 'Award 2' },
    { id: 3, img: '/images/awards/aw3.png', alt: 'Award 3' },
    // { id: 5, img: '/images/awards/aw5.png', alt: 'Award 5' },
    // { id: 6, img: '/images/awards/aw6.png', alt: 'Award 6' },
    // { id: 7, img: '/images/awards/aw7.png', alt: 'Award 7' },
    // { id: 8, img: '/images/awards/aw8.png', alt: 'Award 8' }
  ],
  bottomCta: {
    text: 'View Our Accolades',
    url: '/awards',
    icon: '/images/logoart.png'
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true
    }
  })

  // Header Reveal
  tl.fromTo('.awards-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  // Flexbox Grid Reveal
  .fromTo('.awards-item-elem',
    { opacity: 0, scale: 0.9, y: 20 },
    { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)' },
    "-=0.6"
  )
  // CTA & Line Reveal
  .fromTo('.awards-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.4"
  )
})
</script>

<template>
  <!-- Dark Styled Section (Consistent with Collaborated Itineraries) -->
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#2a2a2a] border-y border-[#F9F8F6]/10 flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <!-- <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-10 md:mb-12">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="awards-header-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
          <span>{{ awardsData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
        </h3>

        <h4 
          class="awards-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#F9F8F6] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ awardsData.header.titleMain }}</span><br />
          <span class="font-normal leading-normal text-[#C47551] italic capitalize">{{ awardsData.header.titleItalic }}</span>
        </h4>

        <p class="awards-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#F9F8F6]/70 font-light max-w-xl">
          {{ awardsData.header.intro }}
        </p>

      </div>
    </div> -->

    <!-- ================= FLEX AWARDS GRID ================= -->
    <div class="relative z-10 w-full max-w-[80rem] mx-auto px-6 md:px-12">
      <!-- Flexbox perfectly centers partly filled rows -->
      <div class="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12">
        
        <div 
          v-for="award in awardsData.items" 
          :key="award.id" 
          class="awards-item-elem flex items-center justify-center w-[110px] sm:w-[130px] md:w-[150px] mx-3 my-2 h-auto cursor-pointer group perspective-1000"
        >
          <img 
            :src="award.img" 
            :alt="award.alt" 
            class="max-w-full h-auto object-containopacity-55 grayscale brightness-[2.2] contrast-75 saturate-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-150 group-hover:contrast-100 group-hover:saturate-150 transform ease-[cubic-bezier(0.25,1,0.5,1)] drop-shadow-md group-hover:drop-shadow-[0_10px_20px_rgba(53,169,223,0.2)]" 
          />
        </div>

      </div>
    </div>

    <!-- ================= BOTTOM CTA BUTTON & DECORATIVE LINE ================= -->
    <!-- <div class="itin-coll-cta-elem w-full mt-2 md:mt-6 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-10">
      <div class="flex flex-col items-center gap-3">
        <div class="w-[1px] h-10 md:h-12 bg-[#F9F8F6]/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#F9F8F6] animate-scroll-drop"></div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#F9F8F6]/70"></div>
      </div>
    </div> -->

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

.perspective-1000 {
  perspective: 1000px;
}
</style>