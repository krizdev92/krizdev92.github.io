<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  data: { type: Object, default: () => null }
})

const isLoaderFinished = useLoaderState()
const sectionRef = ref(null)

const defaultPayload = {
  eyebrow: 'Network',
  titleMain: 'Collaborated',
  titleHighlight: 'Travel Designers',
  intro: 'Meet the visionary minds and regional experts who co-create our immersive, deeply authentic journeys.',
  designers: [
    { id: 1, name: 'Ananya Roy', role: 'Heritage Specialist', location: 'Kolkata, India', intro: 'Architect specializing in colonial restorations and cultural walks.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Marcus Vance', role: 'Wilderness Guide', location: 'Melbourne, Australia', intro: 'Expeditionist focused on low-impact trekking across coastal trails.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Priya Sharma', role: 'Wellness Curator', location: 'Rishikesh, India', intro: 'Master practitioner dedicated to authentic Vedic retreat design.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Liam Davies', role: 'Culinary Anthropologist', location: 'London, UK', intro: 'Documenting indigenous food systems and regional culinary rituals.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { id: 5, name: 'Kavita Nair', role: 'Textile Historian', location: 'Kochi, India', intro: 'Connecting travelers with master weavers and handloom guilds.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' }
  ]
}

const activeData = computed(() => ({
  eyebrow: props.data?.eyebrow || defaultPayload.eyebrow,
  titleMain: props.data?.titleMain || defaultPayload.titleMain,
  titleHighlight: props.data?.titleHighlight || defaultPayload.titleHighlight,
  intro: props.data?.intro || defaultPayload.intro,
  designers: props.data?.designers || defaultPayload.designers
}))

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.designer-header-elem', { y: 25, opacity: 0 })
  gsap.set('.designer-card', { y: 30, opacity: 0 })

  const playAnim = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        once: true
      }
    })

    // Animate Header
    tl.to('.designer-header-elem', {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    })
    // Animate Cards
    .to('.designer-card', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.4")
  }

  if (isLoaderFinished.value) {
    playAnim()
  } else {
    const unwatch = watch(isLoaderFinished, (finished) => {
      if (finished) { playAnim(); unwatch() }
    })
  }
})
</script>

<template>
  <section ref="sectionRef" class="w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#fff9e0]/10 px-6 md:px-16 lg:px-24 flex flex-col items-center">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto flex justify-center mb-10 md:mb-14">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="designer-header-elem flex items-center justify-center gap-4 md:gap-6 mb-2 md:mb-3 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ activeData.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="designer-header-elem text-3xl lg:text-4xl tracking-normal leading-[1.2] text-[#703e19] capitalize mb-3 md:mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ activeData.titleMain }}</span><br />
          <span class="font-normal text-[#c47551] italic">{{ activeData.titleHighlight }}</span>
        </h4>

        <p v-if="activeData.intro" class="designer-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-relaxed text-[#1A1A1A] font-light max-w-2xl">
          {{ activeData.intro }}
        </p>

      </div>
    </div>

    <!-- ================= 5-CARD GRID ================= -->
    <div class="w-full max-w-[90rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
      <div 
        v-for="designer in activeData.designers" 
        :key="designer.id"
        class="designer-card flex flex-col rounded-2xl overflow-hidden border border-[#1A1A1A]/10 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        
        <!-- Top Section (Light Brown) -->
        <div class="bg-[#703e19]/10 pt-8 px-6 pb-0 flex flex-col items-center text-center">
          <!-- Avatar -->
          <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-[#703e19]/60 mb-4 shadow-sm shrink-0">
            <img :src="designer.img" :alt="designer.name" class="w-full h-full object-cover" />
          </div>

          <!-- Name & Details -->
          <h4 class="font-serif text-lg text-[#1A1A1A] font-medium leading-snug">{{ designer.name }}</h4>
          <span class="font-sans text-[11px] text-[#703e19] font-bold uppercase tracking-wider mt-1">{{ designer.role }}</span>
          <span class="font-sans text-xs text-[#1A1A1A]/90 font-light mt-1 mb-5">{{ designer.location }}</span>

          <!-- Underline Divider (Anchored to the very bottom of the top block) -->
          <!-- <div class="w-full h-[1px] bg-[#703e19]/15 mt-5 mb-0"></div> -->
        </div>

        <!-- Bottom Section (Slightly Darker Brown) -->
        <div class="bg-[#703e19]/20 px-6 pt-5 pb-6 flex-grow flex flex-col text-center justify-start">
          <p class="font-sans text-sm text-[#1A1A1A] font-light leading-relaxed">
            {{ designer.intro }}
          </p>
        </div>

      </div>
    </div>

    <!-- ================= CTA & SCROLL INDICATOR ================= -->
    <div class="w-full mt-3 md:mt-5 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-20 community-cta-elem">

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