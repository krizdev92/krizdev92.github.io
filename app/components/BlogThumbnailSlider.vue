<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  autoplay: { type: Boolean, default: false },
  interval: { type: Number, default: 4000 }
})

const activeIndex = ref(0)
const scrollContainer = ref(null)
let timer = null

// Desktop Drag-to-Scroll State
let isDown = false
let startX
let scrollLeft

// Autoplay Logic
const startAutoplay = () => {
  if (!props.autoplay) return
  stopAutoplay()
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.images.length
    scrollToActiveThumbnail()
  }, props.interval)
}

const stopAutoplay = () => {
  if (timer) clearInterval(timer)
}

const handleInteraction = (index) => {
  activeIndex.value = index
  if (props.autoplay) startAutoplay() // Reset timer on manual interaction
}

const scrollToActiveThumbnail = () => {
  if (!scrollContainer.value) return
  const thumb = scrollContainer.value.children[activeIndex.value]
  if (thumb) {
    const scrollPos = thumb.offsetLeft - (scrollContainer.value.offsetWidth / 2) + (thumb.offsetWidth / 2)
    scrollContainer.value.scrollTo({ left: scrollPos, behavior: 'smooth' })
  }
}

// Drag Events
const onMouseDown = (e) => {
  isDown = true
  startX = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft = scrollContainer.value.scrollLeft
  stopAutoplay() // Pause autoplay while dragging
}
const onMouseLeave = () => {
  isDown = false
  if (props.autoplay) startAutoplay()
}
const onMouseUp = () => {
  isDown = false
  if (props.autoplay) startAutoplay()
}
const onMouseMove = (e) => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX) * 2 // Scroll speed multiplier
  scrollContainer.value.scrollLeft = scrollLeft - walk
}

onMounted(() => {
  if (props.autoplay) startAutoplay()
})
onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <!-- Main Stage -->
    <div class="w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm relative transition-all duration-500">
      <transition name="fade" mode="out-in">
        <img :key="activeIndex" :src="images[activeIndex]" class="w-full h-full object-cover" />
      </transition>
    </div>
    
    <!-- Thumbnail Row with Drag to Scroll -->
    <div 
      ref="scrollContainer"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      class="flex items-center gap-3 overflow-x-auto hide-scrollbar py-2 cursor-grab active:cursor-grabbing scroll-smooth"
    >
      <button 
        v-for="(img, idx) in images" 
        :key="idx" 
        @click="handleInteraction(idx)"
        class="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 outline-none"
        :class="activeIndex === idx ? 'border-[#c47551] shadow-md -translate-y-1' : 'border-transparent opacity-60 hover:opacity-100'"
      >
        <img :src="img" class="w-full h-full object-cover pointer-events-none" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>