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
  quote: "Travel isn't about escaping life, but ensuring life does not escape us through unlived moments and unseen horizons.",
  image: "/images/home/itin-1.jpg" // Fallback image for the right side
}

const activeData = computed(() => ({
  quote: props.data?.quote || defaultPayload.quote,
  image: props.data?.image || defaultPayload.image
}))

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.quote-elem', { y: 20, opacity: 0 })

  const playAnim = () => {
    gsap.to('.quote-elem', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        once: true
      }
    })
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
  <section ref="sectionRef" class="w-full py-12 md:py-16 bg-[#F9F8F6] px-4 sm:px-6 md:px-16 lg:px-24 flex justify-center">
    
    <!-- Container with Light Brown Background (#EBE6DF) -->
    <div class="relative w-full max-w-7xl bg-[#EBE6DF] rounded-2xl md:rounded-[2rem] shadow-sm overflow-hidden flex min-h-[220px] md:min-h-[300px]">
      
      <!-- Right Side: Image with Fading Gradient (Placed first in DOM so text easily stacks above the blend) -->
      <div class="absolute right-0 top-0 bottom-0 w-[45%] sm:w-[40%] md:w-[35%] z-0">
        <img :src="activeData.image" alt="Quote Visual" class="w-full h-full object-cover object-center" />
        
        <!-- Smooth Blend Overlay: Fades from solid background color on the left to fully transparent on the right -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#EBE6DF] via-[#EBE6DF]/70 to-transparent w-full h-full"></div>
      </div>

      <!-- Left Side: Quote Content & Watermark -->
      <div class="relative z-10 flex flex-col justify-center w-[75%] sm:w-[70%] md:w-[75%] p-6 sm:p-10 md:p-12 lg:p-16">
        
        <!-- Left-Aligned Watermark -->
        <span class="absolute top-0 left-2 md:left-4 lg:left-6 text-7xl sm:text-[8rem] md:text-[12rem] font-serif leading-none text-[#703e19]/20 pointer-events-none select-none">
          &#8220;
        </span>

        <!-- Left-Aligned Quote Text -->
        <blockquote class="quote-elem relative z-10 indent-4 font-serif text-lg sm:text-2xl lg:text-3xl text-[#703e19] leading-relaxed font-normal text-left pr-4 md:pr-10">
          " {{ activeData.quote }} "
        </blockquote>
        
      </div>

    </div>
  </section>
</template>