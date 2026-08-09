<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  itinerary: { type: Object, required: true }
})

const articleRef = ref(null)
const isStripFixed = ref(true)

// Accordion State (Only one open at a time)
const activeAccordion = ref(0) 

const toggleAccordion = (idx) => {
  activeAccordion.value = activeAccordion.value === idx ? null : idx
}

// Smooth scroll for Sidebar TOC
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// Sticky Bottom Strip Logic
const checkStripPosition = () => {
  if (!articleRef.value) return
  const rect = articleRef.value.getBoundingClientRect()
  // If the bottom of the article is at or above the bottom of the viewport, un-fix the strip
  if (rect.bottom <= window.innerHeight) {
    isStripFixed.value = false
  } else {
    isStripFixed.value = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkStripPosition)
  window.addEventListener('resize', checkStripPosition)
  checkStripPosition()

  gsap.registerPlugin(ScrollTrigger)
  gsap.utils.toArray('.itin-block').forEach((block) => {
    gsap.fromTo(block, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: block, start: 'top 85%', once: true } }
    )
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkStripPosition)
  window.removeEventListener('resize', checkStripPosition)
})
</script>

<template>
  <!-- pb-28 creates space for the strip at the bottom of the document flow -->
  <article ref="articleRef" class="w-full bg-[#F9F8F6] relative pb-28">
    
    <!-- ================= SMART BOTTOM SHARE & BOOKING STRIP ================= -->
    <div 
      :class="isStripFixed ? 'fixed bottom-0' : 'absolute bottom-0'" 
      class="left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-[#1A1A1A]/10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transition-all duration-0"
    >
      <div class="max-w-[90rem] mx-auto px-6 md:px-10 lg:px-24 h-20 md:h-24 flex items-center justify-between">
        
        <!-- Left: Title & Price -->
        <div class="flex flex-col">
          <span class="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold line-clamp-1 max-w-[200px] sm:max-w-md">
            {{ itinerary.header.titleMain }} {{ itinerary.header.titleHighlight }}
          </span>
          <span class="font-serif text-xl md:text-2xl text-[#703e19] font-medium">{{ itinerary.header.price }}</span>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-4 md:gap-6">
          <!-- Share Icons -->
          <div class="hidden sm:flex items-center gap-3 border-r border-[#1A1A1A]/20 pr-6">
            <button aria-label="Share on WhatsApp" class="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#25D366] hover:border-transparent hover:text-white transition-all text-[#1A1A1A]">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
            <button aria-label="Share Link" class="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#703e19] hover:border-transparent hover:text-white transition-all text-[#1A1A1A]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
          </div>
          
          <NuxtLink to="/contact" class="bg-[#703e19] text-[#F9F8F6] px-6 md:px-10 py-3 md:py-3.5 rounded-sm font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1A1A] hover:shadow-lg transition-all border border-transparent">
            Book Your Tour
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ================= CINEMATIC HERO ================= -->
    <div class="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
      <img :src="itinerary.header.coverImg" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
      
      <div class="absolute inset-0 flex flex-col justify-end items-center text-center pb-20 px-6 max-w-5xl mx-auto">
        <h3 class="flex items-center gap-4 font-sans text-[10px] md:text-xs tracking-[0.3em] text-white/80 uppercase mb-4 drop-shadow-md">
          <span class="w-12 h-[1px] bg-white/50"></span>
          <span>{{ itinerary.header.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-white/50"></span>
        </h3>
        
        <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] tracking-tight leading-[1.1] mb-6 drop-shadow-lg text-white">
          <span class="font-normal">{{ itinerary.header.titleMain }}</span><br class="hidden sm:block"/>
          <span class="text-[#C47551] italic font-light">{{ itinerary.header.titleHighlight }}</span>
        </h1>
      </div>
    </div>

    <!-- ================= VITAL STATS BAR (Sleek Pills) ================= -->
    <div class="max-w-[80rem] mx-auto -mt-8 relative z-20 px-6 md:px-12 flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-20">
      <div v-for="(stat, idx) in itinerary.stats" :key="idx" class="bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#1A1A1A]/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-4 flex-grow sm:flex-grow-0 min-w-[200px]">
        <div class="w-10 h-10 rounded-full bg-[#703e19]/5 flex items-center justify-center text-[#703e19] shrink-0" v-html="stat.icon"></div>
        <div class="flex flex-col">
          <span class="font-sans text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold mb-0.5">{{ stat.label }}</span>
          <span class="font-serif text-[15px] text-[#1A1A1A] font-medium leading-tight">{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <!-- ================= BODY & TOC GRID ================= -->
    <div class="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start px-6 sm:px-10 md:px-16 lg:px-24">
      
      <!-- STICKY TABLE OF CONTENTS -->
      <aside v-if="itinerary.toc && itinerary.toc.length" class="hidden lg:flex lg:col-span-3 flex-col sticky top-32 self-start z-20">
        <h4 class="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-6">In This Journey</h4>
        <ul class="flex flex-col gap-4 border-l border-[#1A1A1A]/10 pl-5 relative">
          <li v-for="item in itinerary.toc" :key="item.id">
            <button @click="scrollToSection(item.id)" class="font-serif text-[17px] text-[#1A1A1A]/60 hover:text-[#703e19] transition-colors text-left outline-none">
              {{ item.label }}
            </button>
          </li>
        </ul>
      </aside>

      <!-- DYNAMIC CONTENT BLOCKS -->
      <div class="w-full" :class="itinerary.toc && itinerary.toc.length ? 'lg:col-span-9' : 'lg:col-span-12'">
        
        <div v-for="(block, idx) in itinerary.contentBlocks" :key="idx" :id="block.sectionId" class="itin-block mb-4 md:mb-8 w-full flex flex-col">
          
          <!-- 1. INTRO PARAGRAPH -->
          <p v-if="block.type === 'paragraph'" class="font-sans text-[15.5px] md:text-[17px] text-[#1A1A1A]/85 leading-[1.95] font-light">
            {{ block.text }}
          </p>

          <!-- 2. SUBTITLE -->
          <h2 v-else-if="block.type === 'subtitle'" class="font-serif text-2xl md:text-3xl text-[#703e19] font-medium mb-4 mt-2 tracking-tight">
            {{ block.text }}
          </h2>

          <!-- 3. HIGHLIGHTS & ROUTE MAP (Side by Side) -->
          <div v-else-if="block.type === 'highlights-route'" class="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start my-4">
            <!-- Highlights Left -->
            <div class="lg:col-span-7 bg-[#F2EFE9] border-l-4 border-[#C47551] rounded-r-3xl p-6 md:p-10 shadow-sm flex flex-col h-full justify-center">
              <h3 class="font-serif text-2xl md:text-3xl text-[#703e19] font-medium mb-6 tracking-tight">{{ block.highlightsTitle || 'Highlights' }}</h3>
              <ul class="flex flex-col gap-4">
                <li v-for="(item, i) in block.items" :key="i" class="flex items-start gap-4 group">
                  <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-[#C47551] shrink-0 mt-0.5"><circle cx="10" cy="12" r="8" stroke="currentColor" stroke-width="1.5" opacity="0.3"/><path d="M6 12l4 4 10-11" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span class="font-sans text-[15.5px] md:text-[16px] text-[#1A1A1A]/85 font-light leading-[1.7]">{{ item }}</span>
                </li>
              </ul>
            </div>
            <!-- Route Map Right -->
            <div class="lg:col-span-5 flex flex-col items-center gap-4">
              <div class="w-full aspect-square rounded-3xl overflow-hidden shadow-md border border-[#1A1A1A]/5">
                <img :src="block.routeImg" class="w-full h-full object-cover" />
              </div>
              <p v-if="block.routeText" class="font-serif text-lg md:text-xl text-[#703e19] text-center italic mt-2">{{ block.routeText }}</p>
            </div>
          </div>

          <!-- 4. JOURNEY DETAILS ACCORDION -->
          <div v-else-if="block.type === 'journey-details'" class="w-full flex flex-col gap-4">
            <h3 v-if="block.title" class="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-medium mb-4 tracking-tight">{{ block.title }}</h3>
            
            <div 
              v-for="(phase, pIdx) in block.accordions" 
              :key="pIdx"
              class="bg-white rounded-3xl overflow-hidden border transition-all duration-500"
              :class="activeAccordion === pIdx ? 'border-[#703e19] shadow-[0_15px_40px_rgba(112,62,25,0.08)]' : 'border-[#1A1A1A]/10 hover:border-[#703e19]/40'"
            >
              <!-- Header Button -->
              <button @click="toggleAccordion(pIdx)" class="w-full p-6 md:p-8 flex items-center justify-between outline-none cursor-pointer group">
                <h4 class="font-serif text-xl md:text-[22px] text-[#703e19] font-medium group-hover:text-[#C47551] transition-colors text-left">
                  {{ phase.title }}
                </h4>
                <div class="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center shrink-0 transition-all duration-500" :class="activeAccordion === pIdx ? 'bg-[#703e19] border-[#703e19]' : 'bg-[#F9F8F6]'">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 transition-transform duration-500" :class="activeAccordion === pIdx ? 'rotate-180 stroke-white' : 'stroke-[#1A1A1A]'">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>

              <!-- Expanded Body -->
              <div class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" :class="activeAccordion === pIdx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <div class="overflow-hidden">
                  <!-- Reduced padding-top and overall whitespace as requested -->
                  <div class="px-6 pb-6 md:px-8 md:pb-8 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start border-t border-[#1A1A1A]/5 mt-2 pt-6">
                    
                    <div class="flex flex-col">
                      <!-- Increased font size and specific margin-bottom for subtitle -->
                      <h5 class="font-sans text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-bold text-[#C47551] mb-4">{{ phase.subtitle }}</h5>
                      <p class="font-sans text-[15px] md:text-[16px] text-[#1A1A1A]/85 font-light leading-[1.9] whitespace-pre-line">
                        {{ phase.text }}
                      </p>
                    </div>
                    
                    <div v-if="phase.img" class="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                      <img :src="phase.img" class="w-full h-full object-cover" />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. SPLIT LIST (Unordered List / Sticky Image) -->
          <div v-else-if="block.type === 'split-list'" class="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start my-6">
            <div class="md:col-span-5 w-full self-start md:sticky md:top-32 md:order-2">
              <div class="w-full aspect-square rounded-3xl overflow-hidden shadow-md border border-[#1A1A1A]/10">
                <img :src="block.img" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="md:col-span-7 flex flex-col gap-4 md:order-1">
              <h3 v-if="block.title" class="font-serif text-2xl md:text-3xl text-[#703e19] font-medium mb-4">{{ block.title }}</h3>
              <ul class="flex flex-col gap-4">
                <li v-for="(item, i) in block.items" :key="i" class="flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-[#C47551] shrink-0 mt-0.5">
                    <circle cx="10" cy="12" r="8" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
                    <path d="M6 12l4 4 10-11" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="font-sans text-[15.5px] text-[#1A1A1A]/85 font-light leading-[1.7]">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 6. ORDERED LIST (e.g. Packing List) -->
          <div v-else-if="block.type === 'list-ordered-regular'" class="flex flex-col gap-4 my-4 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#1A1A1A]/5">
            <h3 v-if="block.title" class="font-serif text-2xl md:text-3xl text-[#703e19] mb-4">{{ block.title }}</h3>
            <ol class="list-decimal list-outside flex flex-col gap-4 font-sans text-[15.5px] md:text-[16px] text-[#1A1A1A]/85 font-light marker:text-[#C47551] marker:font-bold ml-5">
              <li v-for="(item, i) in block.items" :key="i" class="pl-2 leading-[1.8]">{{ item }}</li>
            </ol>
          </div>

          <!-- 7. TIP BOX (e.g. Season/Climate) -->
          <div v-else-if="block.type === 'tip-box'" class="bg-[#e9f0f2] p-8 md:p-10 rounded-3xl border-l-4 border-[#527982] flex flex-col gap-3 my-6">
            <h4 class="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#527982] flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              {{ block.title }}
            </h4>
            <p class="font-sans text-[15px] text-[#1A1A1A]/80 font-light leading-relaxed">{{ block.text }}</p>
          </div>

          <!-- 8. QUOTE TYPE A -->
          <div v-else-if="block.type === 'quote-a'" class="flex flex-col items-center text-center px-4 md:px-12 py-10 my-4">
            <span class="text-[#703e19]/20 font-serif text-8xl leading-none h-12">"</span>
            <p class="font-serif text-2xl md:text-3xl lg:text-4xl text-[#703e19] italic leading-[1.5] font-light mb-6 tracking-wide">
              {{ block.text }}
            </p>
            <span v-if="block.author" class="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#C47551]">&mdash; {{ block.author }}</span>
          </div>

          <!-- 9. IDEA BEHIND THE JOURNEY (Cursive overlapping border) -->
          <div v-else-if="block.type === 'idea-behind'" class="w-full relative mt-12 p-8 md:p-12 border border-[#703e19]/30 rounded-3xl bg-white shadow-sm">
            <div class="absolute -top-6 left-8 bg-white px-4">
              <h4 class="font-serif text-3xl md:text-4xl text-[#C47551] italic">{{ block.subtitle }}</h4>
            </div>
            <p class="font-sans text-[15.5px] md:text-[16px] text-[#1A1A1A]/85 font-light leading-[1.8] mb-8 mt-4">
              {{ block.text }}
            </p>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, i) in block.items" :key="i" class="flex items-start gap-4">
                <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-[#C47551] shrink-0 mt-0.5">
                  <circle cx="10" cy="12" r="8" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
                  <path d="M6 12l4 4 10-11" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="font-sans text-[15.5px] text-[#1A1A1A]/85 font-light leading-[1.7]">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 10. CREATOR PROFILE CARD (Brownish Gradient bg) -->
          <div v-else-if="block.type === 'creator-profile'" class="w-full bg-gradient-to-br from-[#301706] to-[#361e0d] text-[#F9F8F6] p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative overflow-hidden group my-8 border border-[#1A1A1A]/10">
            <div class="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border border-[#C47551]/50 shadow-lg relative z-10">
              <img :src="block.avatar" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
              <span class="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C47551] mb-2 font-bold">{{ block.role }} &bull; {{ block.location }}</span>
              <h3 class="font-serif text-3xl md:text-4xl text-[#F9F8F6] font-medium mb-4">{{ block.name }}</h3>
              <p class="font-sans text-[14px] md:text-[15px] text-[#F9F8F6]/80 font-light leading-[1.8] max-w-2xl">
                {{ block.text }}
              </p>
            </div>
            <svg class="absolute bottom-0 right-0 w-64 h-64 text-white/5 transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.2L18.4 19H5.6L12 6.2z"/></svg>
          </div>

        </div>
      </div>
    </div>
  </article>
</template>