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
  paragraph: "Over a decade ago, I stepped off the beaten track and onto a path driven by curiosity and reverence for authentic cultural landscapes. What began as individual explorations quickly transformed into a lifelong commitment to regenerative travel. Every journey designed here is an invitation to pause, observe, and forge deep connections with local communities, sacred ecosystems, and timeless heritage."
}

const activeData = computed(() => ({
  paragraph: props.data?.paragraph || defaultPayload.paragraph
}))

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.intro-para-elem', { y: 25, opacity: 0 })

  const playAnim = () => {
    gsap.to('.intro-para-elem', {
      y: 0,
      opacity: 1,
      duration: 1,
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
  <section ref="sectionRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 pt-8 md:pt-10 pb-4 md:pb-6 flex justify-left">
    <div class="w-full max-w-6xl text-left">
      <p class="intro-para-elem font-sans text-[15px] md:text-[17px] text-[#1A1A1A]/85 leading-[1.95] font-light first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-serif first-letter:text-[#703e19] first-letter:mt-1">
        {{ activeData.paragraph }}
      </p>
    </div>
  </section>
</template>