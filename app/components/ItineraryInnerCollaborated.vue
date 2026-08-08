<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  isExpanded: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle'])

const colIcon = `<svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 md:w-8 md:h-8" aria-hidden="true"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/></svg>`

const displayedItems = computed(() => {
  return props.isExpanded ? props.items : props.items.slice(0, 6)
})

const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
let dragThresholdMet = false

const onMouseDown = (e) => {
  if (window.innerWidth >= 640 || props.isExpanded) return
  isDragging.value = true
  dragThresholdMet = false
  const slider = e.currentTarget
  slider.classList.add('cursor-grabbing')
  startX.value = e.pageX - slider.offsetLeft
  scrollLeft.value = slider.scrollLeft
}
const onMouseUpOrLeave = (e) => {
  isDragging.value = false
  e.currentTarget.classList.remove('cursor-grabbing')
}
const onMouseMove = (e) => {
  if (!isDragging.value || props.isExpanded) return
  e.preventDefault()
  const slider = e.currentTarget
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX.value) * 1.5
  slider.scrollLeft = scrollLeft.value - walk
  if (Math.abs(walk) > 5) dragThresholdMet = true
}
const preventClickIfDragged = (e) => { if (dragThresholdMet) e.preventDefault() }
</script>

<template>
  <section class="relative w-full py-10 md:py-14 flex flex-col overflow-hidden bg-[#2a2a2a]">
    
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-18 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-5xl flex flex-col items-center text-center">
        <h3 class="flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/60 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
          <span>Collaborated Itineraries</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#F9F8F6]/20"></span>
        </h3>
        <h4 class="text-3xl lg:text-4xl tracking-normal leading-[1.2] text-[#f9f8f6] capitalize mb-3 md:mb-4" style="font-family: 'Playfair Display', serif; font-weight: 300;">
          <span class="font-normal">Co-created Experiences</span><br />
          <span class="font-normal text-[#C47551] italic">Across the globe.</span>
        </h4>
        <p class="font-sans text-sm md:text-[15px] text-[#F9F8F6]/80 font-light leading-relaxed max-w-2xl">
          Unique global routes designed alongside our network of trusted regional experts.
        </p>
      </div>
    </div>

    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-0 md:px-8 lg:px-12 xl:px-16 flex flex-col gap-4 md:gap-6">
      <div class="w-full flex flex-col mb-2 md:mb-4 relative">
        <div 
          :class="[
            'gap-5 lg:gap-8 px-6 md:px-0 pb-6 pt-2 relative z-10 transition-all duration-500',
            isExpanded 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'flex sm:grid overflow-x-auto sm:overflow-visible hide-scrollbar snap-x snap-mandatory sm:snap-none sm:grid-cols-2 lg:grid-cols-3 cursor-grab sm:cursor-auto'
          ]"
          @mousedown="onMouseDown"
          @mouseleave="onMouseUpOrLeave"
          @mouseup="onMouseUpOrLeave"
          @mousemove="onMouseMove"
        >
          <NuxtLink 
            v-for="itin in displayedItems" 
            :key="itin.id"
            :to="itin.url" 
            @click="preventClickIfDragged"
            :class="[
              'group block relative shrink-0 rounded-3xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 bg-[#1A1A1A] aspect-[4/3] ring-1 ring-[#F9F8F6]/10 transform hover:-translate-y-1',
              !isExpanded ? 'scroll-snap-align-start w-[85vw] sm:w-auto' : 'w-full'
            ]"
            @dragstart.prevent
          >
            <img :src="itin.img" :alt="itin.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500 z-10 pointer-events-none"></div>
            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
            
            <div class="absolute top-4 md:top-5 left-4 right-4 md:left-5 md:right-5 flex justify-between items-start z-20 pointer-events-none">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 md:w-7 md:h-7 bg-[#673b1c] text-[#F9F8F6] border border-[#C47551]/30 rounded-sm shadow-sm flex items-center justify-center p-1.5 shrink-0" v-html="colIcon"></div>
                <span v-if="itin.featured" class="bg-[#F6BD03] text-[#1A1A1A] text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">Featured</span>
              </div>
              <span class="bg-black/60 backdrop-blur-md text-[#F9F8F6] border border-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">{{ itin.days }} Days</span>
            </div>
            
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-30 transition-transform duration-500 ease-out transform translate-y-0 lg:translate-y-[52px] lg:group-hover:translate-y-0 pointer-events-none">
              <div class="flex items-end justify-between gap-3 mb-2.5">
                <div class="flex flex-col gap-1.5">
                  <h3 class="text-[19px] md:text-xl text-[#F9F8F6] leading-tight drop-shadow-md" style="font-family: 'Noto Serif', serif;">{{ itin.title }}</h3>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tag in itin.tags" :key="tag" class="text-[#F9F8F6]/70 text-[8px] md:text-[9px] uppercase tracking-widest font-sans font-medium">{{ tag }}</span>
                  </div>
                </div>
                <div class="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full border-[1.5px] border-[#F6BD03] bg-transparent flex items-center justify-center transition-all duration-500 backdrop-blur-sm group-hover:scale-105 group-hover:bg-[#F6BD03] pointer-events-auto">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A]"><path d="M5 19L19 5M19 5H10M19 5V14"></path></svg>
                </div>
              </div>
              <div class="h-[40px] mt-2 overflow-hidden transition-opacity duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                <p class="font-sans text-[12px] md:text-[13px] text-[#F9F8F6]/80 font-light leading-[1.6] line-clamp-2">{{ itin.intro }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-if="!isExpanded && items.length > 1" class="mobile-swipe-indicator sm:hidden absolute right-0 top-0 bottom-6 w-24 bg-gradient-to-l from-[#2a2a2a]/90 via-[#2a2a2a]/30 to-transparent pointer-events-none flex items-center justify-end pr-2 opacity-0 z-20">
          <div class="w-8 h-8 rounded-full bg-[#1A1A1A]/30 backdrop-blur-md flex items-center justify-center animate-swipe-hint shadow-sm border border-white/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#C47551] ml-0.5"><path d="M9 18l6-6-6-6"></path></svg>
          </div>
        </div>

      </div>
    </div>

    <div v-if="items.length > 6" class="w-full mt-2 md:mt-6 pt-2 flex flex-col items-center gap-8 md:gap-10 relative z-10">
      <button @click="emit('toggle')" class="group relative inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 border border-[#F9F8F6]/30 hover:border-[#C47551] transition-colors duration-500 overflow-hidden">
        <div class="absolute inset-0 bg-[#C47551] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
        <img src='/images/logoart.png' alt="Icon" class="w-4 h-4 md:w-5 md:h-5 opacity-70 brightness-0 invert group-hover:opacity-100 transition-all duration-500 relative z-10" />
        <span class="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-[#F9F8F6] group-hover:text-white transition-colors duration-500 relative z-10 uppercase">
          {{ isExpanded ? 'View Less' : 'View All' }}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#F9F8F6] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>

  </section>
</template>

<style scoped>
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
@keyframes swipeHint { 0% { transform: translateX(0); } 50% { transform: translateX(5px); } 100% { transform: translateX(0); } }
.animate-swipe-hint { animation: swipeHint 1s ease-in-out infinite; }
</style>