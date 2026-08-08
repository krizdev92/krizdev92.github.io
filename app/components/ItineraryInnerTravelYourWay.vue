<script setup>
import { computed, nextTick } from 'vue'
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  allItineraries: { type: Array, required: true },
  isExpanded: { type: Boolean, default: false },
  activeCategoryId: { type: String, default: null }
})

// Access your existing loader state composable
const isLoaderFinished = useLoaderState()
const showHint = ref(false)

const triggerHint = () => {
  showHint.value = true
  // Cleanly remove from DOM after the 3.5s animation completes
  setTimeout(() => {
    showHint.value = false
  }, 3500)
}

onMounted(() => {
  if (isLoaderFinished.value) {
    triggerHint()
  } else {
    const unwatch = watch(isLoaderFinished, (finished) => {
      if (finished) {
        triggerHint()
        unwatch()
      }
    })
  }
})

const emit = defineEmits(['expand', 'close'])

// Updated with "stays" and "bespoke" IDs
const categories = [
  { id: 'nature', title: 'Nature & Wilderness', desc: 'Wander pristine landscapes, ancient forests, and rugged coastlines.', bgGradient: 'linear-gradient(135deg, #6B8E7B 0%, #527361 100%)', baseBorder: '#88A896', hoverBorder: '#A5C7B3', icon: `<path d="M12 22V3" /><path d="M12 18c-3.5 0-6-2.5-6-5.5 3 1 6 1 6 5.5z" stroke-width="1.5"/><path d="M12 18c3.5 0 6-2.5 6-5.5-3 1-6 1-6 5.5z" stroke-width="1.5"/><path d="M12 11c-2.5 0-4.5-1.5-4.5-4 2 .5 4.5.5 4.5 4z" stroke-width="1.5"/><path d="M12 11c2.5 0 4.5-1.5 4.5-4-2 .5-4.5.5-4.5 4z" stroke-width="1.5"/><path d="M12 5c-1.5 0-3-1-3-3 1.5.5 3 .5 3 3z" stroke-width="1.5"/><path d="M12 5c1.5 0 3-1 3-3-1.5.5-3 .5-3 3z" stroke-width="1.5"/>` },
  { id: 'culture', title: 'Culture & Heritage', desc: 'Step into timeless traditions, storied monuments, and living heritage.', bgGradient: 'linear-gradient(135deg, #A86A51 0%, #8C533D 100%)', baseBorder: '#C78870', hoverBorder: '#E0A38B', icon: `<path d="M12 2L8 6v3H5v3h1v10h12V12h1V9h-3V6L12 2z" stroke-width="1.5"/><path d="M10 22v-6a2 2 0 014 0v6" stroke-width="1.5"/><path d="M7 12h10M8 9h8M9 6h6M4 22h16" stroke-width="1.5"/><path d="M12 6v3M9 9v3M15 9v3M7 12v4M17 12v4M12 2v2" stroke-width="1.5"/>` },
  { id: 'stays', title: 'Places to Stay', desc: 'Explore carefully curated stays that complement your journey with comfort, culture, and hospitality.', bgGradient: 'linear-gradient(135deg, #5C768D 0%, #465E73 100%)', baseBorder: '#7A95AD', hoverBorder: '#94B0C7', icon: `<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8.5Z" stroke-width="1.5"/><path d="M9 21v-6h6v6M8 11h2M14 11h2" stroke-width="1.5"/>` },
  { id: 'offbeat', title: 'Offbeat Explorations', desc: 'Venture beyond familiar routes into hidden sanctuaries.', bgGradient: 'linear-gradient(135deg, #826285 0%, #694C6B 100%)', baseBorder: '#A182A3', hoverBorder: '#BA9DBF', icon: `<path d="M12 2l6 6-6 6-6-6 6-6z" stroke-width="1.5"/><path d="M12 14v8M8 22h8M12 2v12" stroke-width="1.5"/><path d="M9 5l-3 3 3 3M15 5l3 3-3 3" stroke-width="1.5"/><path d="M12 8l2 2-2 2-2-2 2-2z" stroke-width="1.5"/>` },
  { id: 'wellness', title: 'Wellness & Spirit', desc: 'Find absolute balance and inner calm through mindful practices.', bgGradient: 'linear-gradient(135deg, #9C8356 0%, #806A42 100%)', baseBorder: '#BFA575', hoverBorder: '#D9BF8F', icon: `<path d="M12 20c0-5-4.5-9-4.5-9S3.5 15 3.5 20h8.5z" stroke-width="1.5"/><path d="M12 20c0-5-4.5-9-4.5-9S20.5 15 20.5 20h-8.5z" stroke-width="1.5"/><path d="M12 20c-4-7-1.5-13-1.5-13S14 11 12 20z" stroke-width="1.5"/><path d="M12 20c4-7 1.5-13 1.5-13S10 11 12 20z" stroke-width="1.5"/><path d="M1 20h22" stroke-width="1.5"/><path d="M12 6V2M10 2h4" stroke-width="1.5"/>` },
  { id: 'bespoke', title: 'Bespoke Luxury', desc: 'Indulge in carefully curated luxury and sophisticated comfort.', bgGradient: 'linear-gradient(135deg, #578587 0%, #436B6D 100%)', baseBorder: '#76A6A8', hoverBorder: '#92C1C4', icon: `<path d="M2 12l5.25-5 2.625 3 2.625-3L17.75 12 22 8v12H2V8z" stroke-width="1.5"/><circle cx="12" cy="7" r="2" stroke-width="1.5"/>` }
]

const sigIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M12 2v5"></path><path d="M12 17v5"></path><path d="M2 12h5"></path><path d="M17 12h5"></path><path d="M5.8 5.8l2.1 2.1"></path><path d="M16.1 16.1l2.1 2.1"></path><path d="M18.2 5.8l-2.1 2.1"></path><path d="M7.9 16.1l-2.1 2.1"></path><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"></circle></svg>`
const colIcon = `<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 md:w-7 md:h-7" aria-hidden="true"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/></svg>`

const openTab = (categoryId) => {
  if (props.activeCategoryId === categoryId && props.isExpanded) return
  emit('expand', categoryId)
}

const closeCategory = () => emit('close')

const activeTabItineraries = computed(() => {
  if (!props.isExpanded || !props.activeCategoryId) return []
  const filtered = props.allItineraries.filter(itin => itin.categoryIds.includes(props.activeCategoryId))
  return filtered.sort((a, b) => {
    const scoreA = (a.featured ? 2 : 0) + (a.type === 'signature' ? 1 : 0)
    const scoreB = (b.featured ? 2 : 0) + (b.type === 'signature' ? 1 : 0)
    return scoreB - scoreA
  })
})
</script>

<template>
  <section class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 flex flex-col overflow-hidden bg-[#FFF9E0]/10">

    <!-- Select Category Hint -->
    <div 
      v-if="isExpanded && !activeCategoryId && showHint" 
      class="animate-hint-fade w-auto absolute top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center p-1 md:p-3 opacity-0"
    >
      <span class="px-6 py-2 bg-[#703e19]/20 text-[#703e19] text-[10px] uppercase tracking-[0.2em] font-bold shadow-md">
          Select a category
      </span>
    </div>

    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-18 flex justify-center mb-6 lg:mb-8">
      <div class="max-w-5xl flex flex-col items-center text-center">
        <h3 class="flex items-center justify-center gap-4 md:gap-6 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>Categorized Itineraries</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h4 class="text-3xl lg:text-4xl tracking-normal leading-[1.2] text-[#703e19] capitalize mb-3 md:mb-4" style="font-family: 'Playfair Display', serif; font-weight: 300;">
          <span class="font-normal">Travel your way</span><br />
          <span class="font-normal text-[#c47551] italic">Discover Your Style.</span>
        </h4>
        <p class="font-sans text-sm md:text-[15px] text-[#1A1A1A] font-light leading-relaxed max-w-2xl">
          Explore by what moves you. Select a path below to begin crafting your bespoke journey.
        </p>
      </div>
    </div>

    <!-- CATEGORY CARDS GRID -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col gap-4 md:gap-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 pb-6 pt-2">
        <button 
          v-for="cat in categories" 
          :key="cat.id" 
          @click="openTab(cat.id)"
          :class="[
            'custom-tyw-card group flex flex-col relative shrink-0 rounded-[1.25rem] overflow-hidden w-full h-[140px] md:h-[150px] border text-left transition-all duration-[400ms] ease-out outline-none',
            activeCategoryId === cat.id && isExpanded 
              ? 'ring-2 ring-offset-2 ring-[#703e19]/60 border-[#703e19] shadow-[0_0_20px_rgba(112,62,25,0.25)] scale-[1.02] opacity-100 z-10' 
              : 'border-transparent',
            activeCategoryId && isExpanded && activeCategoryId !== cat.id 
              ? 'opacity-40 grayscale-[50%] scale-[0.97] hover:opacity-90 hover:grayscale-0' 
              : ''
          ]"
          :style="{ background: cat.bgGradient, '--hover-border': cat.hoverBorder }"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" v-html="cat.icon" class="absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.06] text-[#F9F8F6] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-[1.5s] pointer-events-none"></svg>
          
          <div class="relative p-5 lg:p-6 flex flex-col h-full z-20 w-full">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-10 h-10 shrink-0 flex items-center justify-center text-[#F9F8F6] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" v-html="cat.icon" class="w-7 h-7"></svg>
              </div>
              <h3 class="text-[17px] lg:text-[19px] text-[#F9F8F6] leading-tight drop-shadow-sm" style="font-family: 'Noto Serif', serif; font-weight: 500;">
                {{ cat.title }}
              </h3>
            </div>
            <div class="w-full h-[1px] bg-[#F9F8F6]/10 mb-3 transition-all duration-500 group-hover:bg-[#F9F8F6]/20"></div>
            <p class="font-sans text-[12px] lg:text-[13px] text-[#F9F8F6]/90 font-light leading-[1.6]">
              {{ cat.desc }}
            </p>
          </div>
        </button>
      </div>
    </div>

    <!-- EXPANDED TAB CONTENT -->
    <div id="tyw-tab-content" v-if="isExpanded && activeCategoryId" class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-8 lg:px-12 xl:px-16 mt-6 md:mt-8">
      
      <div class="w-full flex items-center justify-between mb-8 border-b border-[#1A1A1A]/10 pb-5">
        <h4 class="text-2xl md:text-3xl font-serif text-[#703e19] capitalize">
          {{ categories.find(c => c.id === activeCategoryId)?.title }}
        </h4>
        <button 
          @click="closeCategory" 
          class="px-6 py-3 border-2 border-[#703e19] rounded-none text-[11px] md:text-[12px] font-sans font-bold uppercase tracking-widest text-[#703e19] bg-transparent hover:bg-[#703e19] hover:text-[#F9F8F6] transition-all duration-300 shadow-sm"
        >
          Close ✕
        </button>
      </div>

      <!-- Result Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
        <NuxtLink 
          v-for="itin in activeTabItineraries" 
          :key="itin.id"
          :to="itin.url" 
          class="group block relative rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-500 bg-[#1A1A1A] aspect-[4/3] ring-1 ring-black/5 transform hover:-translate-y-1 w-full"
        >
          <img :src="itin.img" :alt="itin.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none"></div>
          <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
          
          <div class="absolute top-4 md:top-5 left-4 right-4 md:left-5 md:right-5 flex justify-between items-start z-20 pointer-events-none">
            <div class="flex items-center gap-2">
              <div v-if="itin.type === 'signature'" class="w-7 h-7 bg-[#673b1c] text-[#F9F8F6] flex items-center justify-center rounded-sm shadow-sm shrink-0" v-html="sigIcon"></div>
              <div v-if="itin.type === 'collaborated'" class="w-6 h-6 bg-[#673b1c] text-[#F9F8F6] border border-[#C47551]/30 rounded-sm shadow-sm flex items-center justify-center p-1.5 shrink-0" v-html="colIcon"></div>
              <span v-if="itin.featured" class="bg-[#F6BD03] text-[#1A1A1A] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">Featured</span>
            </div>
            <span class="bg-black/60 backdrop-blur-md text-[#F9F8F6] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-sm">{{ itin.days }} Days</span>
          </div>
          
          <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end z-30 transition-transform duration-500 ease-out transform translate-y-0 lg:translate-y-[52px] lg:group-hover:translate-y-0 pointer-events-none">
            <div class="flex items-end justify-between gap-3 mb-2.5">
              <div class="flex flex-col gap-1.5">
                <h3 class="text-[19px] md:text-xl text-[#F9F8F6] leading-tight drop-shadow-md" style="font-family: 'Noto Serif', serif;">{{ itin.title }}</h3>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tag in itin.tags" :key="tag" class="text-[#F9F8F6]/90 text-[8px] uppercase tracking-widest font-sans font-medium">{{ tag }}</span>
                </div>
              </div>
              <div class="w-9 h-9 shrink-0 rounded-full border-[1.5px] border-[#F6BD03] bg-transparent flex items-center justify-center transition-all duration-500 backdrop-blur-sm group-hover:scale-105 group-hover:bg-[#F6BD03] pointer-events-auto">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 transition-colors duration-300 stroke-[#F9F8F6] group-hover:stroke-[#1A1A1A]"><path d="M5 19L19 5M19 5H10M19 5V14"></path></svg>
              </div>
            </div>
            <div class="h-[40px] mt-2 overflow-hidden transition-opacity duration-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
              <p class="font-sans text-[12px] text-[#F9F8F6]/90 font-light leading-[1.6] line-clamp-2">{{ itin.intro }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
      
      <div v-if="activeTabItineraries.length === 0" class="w-full py-12 text-center">
        <p class="text-[#1A1A1A]/50 font-sans italic">No itineraries currently match this category.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-tyw-card:not(.ring-2):hover { 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); 
  transform: translateY(-2px);
  border-color: var(--hover-border) !important;
  box-shadow: 0 0 0 2px rgba(26,26,26,0.1);
}

@keyframes fadeOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

.animate-hint-fade {
  /* Using 'both' ensures it respects the 0% opacity state immediately */
  animation: fadeOut 3s ease-in-out both;
}
</style>