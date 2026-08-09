<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const slideshowData = {
  header: {
    eyebrow: 'Monsoon Wellness',
    titleMain: '10 Fruits To Eat',
    titleItalic: 'During Rainy Season.',
    date: 'August 10, 2026',
    tags: ['#Wellness', '#Monsoon', '#Nutrition'],
    coverImg: '/images/home/itin-3.jpg'
  },
  content: [
    { num: '01', title: 'The Crisp Apple', text: 'Apples are rich in vitamins and dietary fiber, making them the perfect immunity booster to ward off seasonal monsoon infections.', img: '/images/home/stay-1.jpeg' },
    { num: '02', title: 'Plum Perfection', text: 'Packed with antioxidants, plums aid in digestion and protect your body against seasonal cold viruses while keeping your skin radiant.', img: '/images/home/itin-2.jpg' },
    { num: '03', title: 'Ruby Pomegranate', text: 'A powerhouse of nutrients, pomegranate seeds improve blood circulation and possess highly effective anti-inflammatory properties.', img: '/images/home/stay-2.jpeg' },
    { num: '04', title: 'Indian Jamun', text: 'The quintessential monsoon fruit. Jamun helps regulate blood sugar levels and tackles gastric issues prevalent during the rains.', img: '/images/home/itin-1.jpg' },
    { num: '05', title: 'Tropical Papaya', text: 'High in Vitamin C and papain, an enzyme that dramatically boosts digestion and builds a robust shield against rainy season flus.', img: '/images/home/stay-3.jpg' },
    { num: '06', title: 'Sweet Cherries', text: 'Cherries contain melatonin, which helps calm the nervous system and encourages deep sleep alongside fighting free radicals.', img: '/images/home/itin-3.jpg' },
    { num: '07', title: 'Juicy Peaches', text: 'Low in calories but high in essential vitamins, peaches offer hydration and protect your immune system when humidity peaks.', img: '/images/home/stay-4.jpg' },
    { num: '08', title: 'Monsoon Pears', text: 'Pears provide instant cooling and are rich in copper, vitamin C, and fiber, ensuring your gut remains incredibly healthy.', img: '/images/home/stay-1.jpeg' },
    { num: '09', title: 'Exotic Lychee', text: 'This sweet, aromatic fruit is excellent for immune defense, packed with water content and antiviral compounds.', img: '/images/home/itin-2.jpg' },
    { num: '10', title: 'Golden Bananas', text: 'Bananas are easily digestible and provide an instant energy spike. They are rich in potassium and gentle on a monsoon-sensitive stomach.', img: '/images/home/stay-2.jpeg' }
  ],
  related: [
    { title: 'Ayurvedic Diet For The Rainy Season', date: 'August 02, 2026', tags: ['#Ayurveda'], img: '/images/home/stay-4.jpg', url: '/blog/ayurveda-monsoon' },
    { title: 'Forest Bathing In The Western Ghats', date: 'July 15, 2026', tags: ['#Nature'], img: '/images/home/itin-1.jpg', url: '/blog/forest-bathing' }
  ]
}

// ==========================================
// STATE MANAGEMENT
// ==========================================
const currentSlide = ref(0)
const totalSlides = 12 // 1 Title + 10 Content + 1 Related
const showDemo = ref(true)
let autoplayTimer = null

// ==========================================
// AUTOPLAY LOGIC
// ==========================================
const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    if (currentSlide.value < totalSlides - 1) {
      currentSlide.value++
    } else {
      stopAutoplay() // Stop automatically on the last slide
    }
  }, 5000) // 5 seconds per slide
}

const stopAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
}

const resetAutoplay = () => {
  startAutoplay()
}

// ==========================================
// NAVIGATION LOGIC
// ==========================================
const nextSlide = () => {
  if (currentSlide.value < totalSlides - 1) {
    currentSlide.value++
    resetAutoplay() // Reset timer on manual interaction
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
    resetAutoplay() // Reset timer on manual interaction
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoplay() // Reset timer on manual interaction
}

// Computed active states
const isTitleSlide = computed(() => currentSlide.value === 0)
const isContentSlide = computed(() => currentSlide.value > 0 && currentSlide.value <= 10)
const isRelatedSlide = computed(() => currentSlide.value === 11)

// Helper to get active content safely
const activeContent = computed(() => {
  if (isContentSlide.value) {
    return slideshowData.content[currentSlide.value - 1]
  }
  return null
})

// Lifecycle Hooks
onMounted(() => {
  // Hide Demo after 2.5 seconds
  setTimeout(() => {
    showDemo.value = false
  }, 2500)
  
  // Initiate Autoplay
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <!-- Background Ambient Wrapper -->
  <section class="w-full min-h-screen bg-gradient-to-br from-[#2a170e] to-[#120803] flex items-center justify-center pt-28 pb-10 px-0 sm:px-6 relative overflow-hidden">
    
    <!-- 3:4 Aspect Ratio Canvas -->
    <div class="relative w-[96%] max-w-[480px] sm:max-w-none sm:w-auto h-auto sm:h-[75vh] lg:h-[80vh] aspect-[3/4] mx-auto bg-black rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      
      <!-- ========================================== -->
      <!-- SLIDE IMAGES (Crossfade via transition) -->
      <!-- ========================================== -->
      <transition-group name="crossfade" tag="div" class="absolute inset-0 w-full h-full pointer-events-none z-0">
        <!-- Title Slide Bg -->
        <img v-if="isTitleSlide" :key="'bg-0'" :src="slideshowData.header.coverImg" class="absolute inset-0 w-full h-full object-cover" />
        
        <!-- Content Slide Bgs -->
        <img v-else-if="isContentSlide" :key="`bg-${currentSlide}`" :src="activeContent.img" class="absolute inset-0 w-full h-full object-cover" />
        
        <!-- Related Slide Bg (Solid dark base) -->
        <div v-else-if="isRelatedSlide" :key="'bg-11'" class="absolute inset-0 w-full h-full bg-[#1A1A1A]"></div>
      </transition-group>

      <!-- Permanent Gradient Overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-10"></div>

      <!-- ========================================== -->
      <!-- TOP PROGRESS DASHES (z-50) -->
      <!-- ========================================== -->
      <div class="absolute top-0 left-0 w-full px-3 md:px-4 pt-4 flex gap-1.5 z-50 pointer-events-auto">
        <button 
          v-for="i in totalSlides" 
          :key="i"
          @click="goToSlide(i - 1)"
          class="flex-1 h-1.5 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
          :class="currentSlide >= (i - 1) ? 'bg-white' : 'bg-white/30 hover:bg-white/60'"
        ></button>
      </div>

      <!-- ========================================== -->
      <!-- SLIDE CONTENT VIEWS (z-20) -->
      <!-- ========================================== -->
      <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20 pointer-events-none">
        
        <!-- 1. TITLE SLIDE -->
        <transition name="slide-up">
          <div v-if="isTitleSlide" class="flex flex-col items-start w-full">
            <span class="text-[10px] md:text-[11px] font-sans tracking-[0.3em] text-[#F9F8F6]/80 uppercase font-bold mb-4 drop-shadow-md">
              {{ slideshowData.header.date }}
            </span>
            <div class="flex items-center flex-wrap gap-2 mb-4">
              <span v-for="tag in slideshowData.header.tags" :key="tag" class="text-[10px] bg-[#F9F8F6]/20 backdrop-blur-md text-[#F9F8F6] px-2.5 py-1 rounded-sm font-sans uppercase font-bold tracking-widest border border-white/10">
                {{ tag }}
              </span>
            </div>
            <h3 class="flex items-center gap-3 mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#C47551] uppercase drop-shadow-md">
              <span class="w-8 h-[1px] bg-[#C47551]"></span>
              <span>{{ slideshowData.header.eyebrow }}</span>
            </h3>
            <h1 class="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#F9F8F6] font-light leading-[1.15] drop-shadow-lg">
              {{ slideshowData.header.titleMain }}<br/>
              <span class="italic text-[#C47551] font-normal">{{ slideshowData.header.titleItalic }}</span>
            </h1>
          </div>
        </transition>

        <!-- 2. CONTENT SLIDES -->
        <transition name="slide-up">
          <div v-if="isContentSlide" :key="`content-${currentSlide}`" class="flex flex-col items-start w-full">
            <div class="w-full flex items-center justify-between mb-4">
              <div class="font-serif text-5xl sm:text-6xl text-[#C47551] font-light opacity-90 tracking-tighter drop-shadow-md">
                {{ activeContent.num }}<span class="text-2xl text-[#F9F8F6]/50">/10</span>
              </div>
            </div>
            <h2 class="font-serif text-3xl sm:text-4xl text-[#F9F8F6] font-medium leading-tight mb-4 drop-shadow-lg">
              {{ activeContent.title }}
            </h2>
            <p class="font-sans text-[15px] sm:text-base text-[#F9F8F6]/90 font-light leading-[1.8] drop-shadow-md">
              {{ activeContent.text }}
            </p>
          </div>
        </transition>

        <!-- 3. RELATED POSTS SLIDE -->
        <transition name="slide-up">
          <div v-if="isRelatedSlide" class="flex flex-col items-start w-full h-full justify-center mt-6">
            <h3 class="flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] text-[#F9F8F6]/70 uppercase mb-2">
              <span class="w-8 h-[1px] bg-[#F9F8F6]/20"></span> Further Reading
            </h3>
            <h2 class="font-serif text-3xl lg:text-4xl text-[#C47551] italic mb-8">Keep Exploring.</h2>
            
            <div class="flex flex-col gap-4 w-full">
              <NuxtLink 
                v-for="post in slideshowData.related" 
                :key="post.url" 
                :to="post.url"
                class="relative z-50 pointer-events-auto flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group"
              >
                <img :src="post.img" class="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shrink-0" />
                <div class="flex flex-col justify-center">
                  <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[#C47551] uppercase font-bold mb-1 md:mb-1.5">{{ post.date }}</span>
                  <h4 class="font-serif text-[15px] md:text-base text-[#F9F8F6] leading-tight mb-1 group-hover:text-[#C47551] transition-colors">{{ post.title }}</h4>
                  <span class="text-[9px] md:text-[10px] text-[#F9F8F6]/50 uppercase tracking-widest">{{ post.tags[0] }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </transition>

      </div>

      <!-- ========================================== -->
      <!-- TOUCH / CLICK NAVIGATION ZONES (z-40) -->
      <!-- ========================================== -->
      <!-- Left 40%: Goes to Previous Slide -->
      <div 
        @click="prevSlide" 
        class="absolute left-0 top-12 bottom-0 w-[40%] z-40 cursor-w-resize pointer-events-auto"
        aria-label="Previous Slide"
      ></div>

      <!-- Right 40%: Goes to Next Slide -->
      <div 
        @click="nextSlide" 
        class="absolute right-0 top-12 bottom-0 w-[40%] z-40 cursor-e-resize pointer-events-auto"
        aria-label="Next Slide"
      ></div>

      <!-- ========================================== -->
      <!-- INTRO DEMO OVERLAY (Fades out after 2.5s, z-[60]) -->
      <!-- ========================================== -->
      <transition name="fade">
        <div v-if="showDemo" class="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-between px-6 pointer-events-none">
          <!-- Center Dividing Line -->
          <div class="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/20 border-l border-dashed border-white/40 -translate-x-1/2"></div>
          
          <!-- Left Arrow Hint -->
          <div class="w-1/2 flex flex-col items-center gap-3 opacity-80 animate-pulse">
            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="w-5 h-5"><path d="M15 18l-6-6 6-6"/></svg>
            </div>
            <span class="font-sans text-[10px] sm:text-xs text-white uppercase tracking-widest">Tap Left</span>
          </div>

          <!-- Right Arrow Hint -->
          <div class="w-1/2 flex flex-col items-center gap-3 opacity-80 animate-pulse">
            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="w-5 h-5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            <span class="font-sans text-[10px] sm:text-xs text-white uppercase tracking-widest">Tap Right</span>
          </div>
        </div>
      </transition>

    </div>
  </section>
</template>

<style scoped>
/* Crossfade for Background Images */
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 0.6s ease-in-out;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}

/* Slide Up for Content Overlays */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Standard Fade for Demo Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>