<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

// Sidebar Mobile Accordion State
const isMobileSidebarOpen = ref(false)

// ==========================================
// CENTRAL JSON PAYLOAD (25 Posts)
// ==========================================
const blogPosts = [
  { id: 'b1', title: 'Tracking the Elusive Snow Leopard', date: 'August 12, 2026', tags: ['#Wildlife', '#Himalayas', '#Expedition'], intro: 'Journey deep into the high-altitude deserts of Spiti Valley in search of the magnificent ghost of the mountains.', img: '/images/home/itin-1.jpg', url: '/blog/' },
  { id: 'b2', title: 'The Silent Backwaters at Dawn', date: 'August 05, 2026', tags: ['#Photography', '#Kerala', '#Landscapes'], intro: 'Capturing the golden hour across the serene Vembanad lake, where life moves at the gentle pace of a wooden canoe.', img: '/images/home/itin-2.jpg', url: '/blog/' },
  { id: 'b3', title: 'Whale Watching in the Deep Blue', date: 'August 02, 2026', tags: ['#MarineLife', '#Ocean', '#Nature'], intro: 'Sri Lanka is blessed with an eclectic mix of exotic beauty, making it the perfect place to discover the majestic blue whale.', img: '/images/home/itin-3.jpg', url: '/blog/' },
  { id: 'b4', title: 'Ayurveda: The Science of Life', date: 'July 28, 2026', tags: ['#Wellness', '#Ayurveda', '#Healing'], intro: 'An immersive look into the ancient holistic healing traditions practiced in the heart of Kerala\'s rainforests.', img: '/images/home/stay-4.jpg', url: '/blog/' },
  { id: 'b5', title: 'A Culinary Walk Through Old Delhi', date: 'July 21, 2026', tags: ['#Culinary', '#Culture', '#Food'], intro: 'Navigating the chaotic, aromatic alleys of Chandni Chowk to uncover century-old recipes and street food legends.', img: '/images/home/stay-1.jpeg', url: '/blog/' },
  { id: 'b6', title: 'Surfing the Southern Coasts', date: 'July 15, 2026', tags: ['#Adventure', '#Surfing', '#Ocean'], intro: 'Riding the untouched swells of the Indian Ocean along the pristine beaches of southern Sri Lanka.', img: '/images/home/stay-3.jpg', url: '/blog/' },
  { id: 'b7', title: 'The Lost Temples of Hampi', date: 'July 08, 2026', tags: ['#Heritage', '#Architecture', '#History'], intro: 'Walking amongst the colossal boulder-strewn ruins of the Vijayanagara Empire, a UNESCO World Heritage marvel.', img: '/images/home/itin-2.jpg', url: '/blog/' },
  { id: 'b8', title: 'Hornbill Festival Unveiled', date: 'July 01, 2026', tags: ['#Festivals', '#Culture', '#Nagaland'], intro: 'Experiencing the vibrant indigenous traditions, warrior dances, and music of the Naga tribes in Northeast India.', img: '/images/home/itin-1.jpg', url: '/blog/' },
  { id: 'b9', title: 'Into the Heart of Ranthambore', date: 'June 25, 2026', tags: ['#Wildlife', '#Tigers', '#Safari'], intro: 'A thrilling jeep safari through the ancient ruins and dry deciduous forests tracking the Royal Bengal Tiger.', img: '/images/home/itin-3.jpg', url: '/blog/' },
  { id: 'b10', title: 'Plantation Life in Munnar', date: 'June 18, 2026', tags: ['#Heritage', '#Tea', '#Mountains'], intro: 'Discovering the colonial legacy and meticulous process of tea cultivation in the misty hills of the Western Ghats.', img: '/images/home/stay-2.jpeg', url: '/blog/' },
  { id: 'b11', title: 'Diving the Andaman Reefs', date: 'June 10, 2026', tags: ['#MarineLife', '#Diving', '#Coral'], intro: 'Exploring the vibrant underwater ecosystems and historic shipwrecks hidden beneath the crystal-clear Andaman Sea.', img: '/images/home/stay-3.jpg', url: '/blog/' },
  { id: 'b12', title: 'Yoga Retreats in the Himalayas', date: 'June 05, 2026', tags: ['#Wellness', '#Yoga', '#Mountains'], intro: 'Finding inner peace and mindfulness in secluded ashrams perched above the sacred Ganges river in Rishikesh.', img: '/images/home/stay-4.jpg', url: '/blog/' },
  { id: 'b13', title: 'Trekking the Markha Valley', date: 'May 28, 2026', tags: ['#Adventure', '#Trekking', '#Ladakh'], intro: 'A high-altitude journey crossing rugged passes, remote Buddhist monasteries, and barren, breathtaking landscapes.', img: '/images/home/itin-1.jpg', url: '/blog/' },
  { id: 'b14', title: 'The Spice Markets of Fort Kochi', date: 'May 20, 2026', tags: ['#Culinary', '#History', '#Kerala'], intro: 'Tracing the ancient maritime trade routes through the lingering scents of pepper, cardamom, and clove.', img: '/images/home/stay-1.jpeg', url: '/blog/' },
  { id: 'b15', title: 'Faces of Pushkar Fair', date: 'May 12, 2026', tags: ['#Photography', '#Portraits', '#Rajasthan'], intro: 'A photographic journey capturing the vivid turbans, majestic camels, and rugged nomadic faces of the desert.', img: '/images/home/itin-2.jpg', url: '/blog/' },
  { id: 'b16', title: 'The Great Migration of Kaziranga', date: 'May 05, 2026', tags: ['#Wildlife', '#Rhino', '#Conservation'], intro: 'Witnessing the incredible conservation success story of the one-horned rhinoceros in the floodplains of Assam.', img: '/images/home/itin-3.jpg', url: '/blog/' },
  { id: 'b17', title: 'Diwali: The Festival of Lights', date: 'April 28, 2026', tags: ['#Festivals', '#Tradition', '#India'], intro: 'How local communities illuminate their homes and hearts during the subcontinent’s most celebrated festival.', img: '/images/home/stay-2.jpeg', url: '/blog/' },
  { id: 'b18', title: 'Echoes of the Chola Dynasty', date: 'April 20, 2026', tags: ['#Heritage', '#Temples', '#History'], intro: 'Marveling at the intricate Dravidian stone architecture of the Brihadisvara Temple in Thanjavur.', img: '/images/home/stay-3.jpg', url: '/blog/' },
  { id: 'b19', title: 'White Water Rafting the Zanskar', date: 'April 14, 2026', tags: ['#Adventure', '#River', '#Extreme'], intro: 'Navigating the treacherous and exhilarating rapids through the deep, dramatic gorges of Ladakh.', img: '/images/home/itin-1.jpg', url: '/blog/' },
  { id: 'b20', title: 'Turtles of the Coromandel Coast', date: 'April 06, 2026', tags: ['#MarineLife', '#Conservation', '#Nature'], intro: 'Participating in midnight conservation walks to protect the nesting sites of the endangered Olive Ridley turtles.', img: '/images/home/itin-2.jpg', url: '/blog/' },
  { id: 'b21', title: 'Vipassana: The Silent Mind', date: 'March 29, 2026', tags: ['#Wellness', '#Meditation', '#Mind'], intro: 'A personal account of a 10-day silent meditation retreat and the transformative power of deep introspection.', img: '/images/home/stay-4.jpg', url: '/blog/' },
  { id: 'b22', title: 'Holi in Vrindavan', date: 'March 22, 2026', tags: ['#Festivals', '#Colors', '#Culture'], intro: 'Immersing in the chaotic, joyous, and visually stunning celebration of spring in the spiritual heart of India.', img: '/images/home/stay-1.jpeg', url: '/blog/' },
  { id: 'b23', title: 'Tracking Elephants in Wayanad', date: 'March 15, 2026', tags: ['#Wildlife', '#Elephants', '#Forest'], intro: 'A conscious, guided trek through the Nilgiri Biosphere to observe wild Asiatic elephants in their ancient corridors.', img: '/images/home/itin-3.jpg', url: '/blog/' },
  { id: 'b24', title: 'The Stepwells of Gujarat', date: 'March 08, 2026', tags: ['#Heritage', '#Architecture', '#Water'], intro: 'Descending into the geometric perfection and cooling depths of India’s forgotten subterranean water temples.', img: '/images/home/stay-2.jpeg', url: '/blog/' },
  { id: 'b25', title: 'Bespoke Flavors of Chettinad', date: 'March 01, 2026', tags: ['#Culinary', '#Spices', '#Heritage'], intro: 'Tasting the fiery, complex, and deeply traditional cuisine housed within the grand mansions of Tamil Nadu.', img: '/images/home/itin-1.jpg', url: '/blog/' }
]

// ==========================================
// FILTERING LOGIC
// ==========================================
const searchQuery = ref('')
const selectedCategories = ref([])

// Dynamically extract categories (first hashtag) and count them
const categories = computed(() => {
  const counts = {}
  blogPosts.forEach(post => {
    const cat = post.tags[0]
    counts[cat] = (counts[cat] || 0) + 1
  })
  return Object.entries(counts).map(([name, count]) => ({ name, count }))
})

// Toggle Checkbox
const toggleCategory = (catName) => {
  const index = selectedCategories.value.indexOf(catName)
  if (index === -1) {
    selectedCategories.value.push(catName)
  } else {
    selectedCategories.value.splice(index, 1)
  }
}

// Filter and Sort Chronologically
const filteredBlogs = computed(() => {
  let result = blogPosts

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.intro.toLowerCase().includes(query)
    )
  }

  if (selectedCategories.value.length > 0) {
    result = result.filter(post => selectedCategories.value.includes(post.tags[0]))
  }

  return result.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// ==========================================
// ANIMATIONS
// ==========================================
const animateCards = () => {
  gsap.fromTo('.blog-card-elem',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', overwrite: true }
  )
}

watch(filteredBlogs, () => {
  nextTick(() => {
    animateCards()
  })
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.sidebar-elem', { x: -20, opacity: 0 })
  gsap.set('.search-elem', { y: -20, opacity: 0 })

  const initAnim = () => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: mainContainerRef.value, start: 'top 85%', once: true }
    })
    tl.to('.search-elem', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .to('.sidebar-elem', { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, "-=0.6")
    
    animateCards()
  }

  if (isLoaderFinished.value) {
    initAnim()
  } else {
    const unwatch = watch(isLoaderFinished, (val) => {
      if (val) { initAnim(); unwatch() }
    })
  }
})
</script>

<template>
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 md:px-8 lg:px-12 2xl:px-24 py-8 md:py-12 mx-auto flex flex-col">
    
    <!-- ================= TOP LEVEL: SEARCH BAR ================= -->
    <div class="search-elem w-full mb-8 md:mb-12">
      <div class="relative w-full">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search stories, destinations, or experiences..." 
          class="w-full bg-white border border-[#1A1A1A]/10 rounded-2xl px-6 py-4 md:py-5 pl-14 font-sans text-sm md:text-base text-[#1A1A1A] focus:outline-none focus:border-[#703e19]/50 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-all"
        />
        <svg class="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </div>
    </div>

    <!-- ================= SPLIT LAYOUT ================= -->
    <div class="w-full flex flex-col md:flex-row gap-8 lg:gap-10 xl:gap-12 items-start">
      
      <!-- ================= SIDEBAR (Mobile Accordion / Desktop Sticky) ================= -->
      
      <!-- MOBILE ACCORDION (< 768px) -->
      <div class="md:hidden sidebar-elem w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#1A1A1A]/10 rounded-2xl overflow-hidden shrink-0">
        <button 
          @click="isMobileSidebarOpen = !isMobileSidebarOpen"
          class="w-full flex items-center justify-between p-5 bg-[#FAF9F5] outline-none"
        >
          <span class="font-serif text-[19px] text-[#703e19] font-medium tracking-tight">Categories</span>
          <svg 
            :class="isMobileSidebarOpen ? 'rotate-180' : ''" 
            class="transition-transform duration-300 w-5 h-5 text-[#703e19]" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          ><path d="m6 9 6 6 6-6"/></svg>
        </button>
        
        <!-- Accordion Body -->
        <div class="grid transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" :class="isMobileSidebarOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
          <div class="overflow-hidden">
            <div class="p-5 flex flex-col gap-4 border-t border-[#1A1A1A]/5">
              <label 
                v-for="cat in categories" 
                :key="'mob-' + cat.name"
                class="flex items-center cursor-pointer group select-none"
              >
                <div class="w-4 h-4 border rounded-sm flex items-center justify-center transition-all duration-300 shrink-0 mr-3.5" :class="selectedCategories.includes(cat.name) ? 'bg-[#703e19] border-[#703e19]' : 'bg-transparent border-[#1A1A1A]/20 group-hover:border-[#703e19]'">
                  <input type="checkbox" class="hidden" :value="cat.name" @change="toggleCategory(cat.name)" :checked="selectedCategories.includes(cat.name)" />
                  <svg v-if="selectedCategories.includes(cat.name)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-[#F9F8F6]"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span class="font-sans text-[15px] transition-colors duration-300" :class="selectedCategories.includes(cat.name) ? 'text-[#703e19] font-medium' : 'text-[#1A1A1A]/80 group-hover:text-[#703e19]'">
                  {{ cat.name.replace('#', '') }}
                </span>
                <span class="ml-1.5 font-sans text-xs font-semibold text-[#1A1A1A]/60">({{ cat.count }})</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- DESKTOP STICKY SIDEBAR (>= 768px) -->
      <aside class="hidden md:flex sidebar-elem flex-col w-[220px] lg:w-[240px] xl:w-[260px] shrink-0 gap-6 lg:gap-8 sticky top-28 z-20">
        <div class="flex flex-col gap-5">
          <h3 class="font-serif text-[22px] lg:text-2xl text-[#703e19] font-medium border-b border-[#1A1A1A]/10 pb-4">
            Categories
          </h3>
          
          <div class="flex flex-col gap-3.5">
            <label 
              v-for="cat in categories" 
              :key="cat.name"
              class="flex items-center cursor-pointer group select-none"
            >
              <div class="w-4 h-4 md:w-[18px] md:h-[18px] border rounded-sm flex items-center justify-center transition-all duration-300 shrink-0 mr-3.5" :class="selectedCategories.includes(cat.name) ? 'bg-[#703e19] border-[#703e19]' : 'bg-transparent border-[#1A1A1A]/20 group-hover:border-[#703e19]'">
                <input type="checkbox" class="hidden" :value="cat.name" @change="toggleCategory(cat.name)" :checked="selectedCategories.includes(cat.name)" />
                <svg v-if="selectedCategories.includes(cat.name)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-[#F9F8F6]"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              
              <span class="font-sans text-sm md:text-[14.5px] lg:text-[15px] transition-colors duration-300" :class="selectedCategories.includes(cat.name) ? 'text-[#703e19] font-medium' : 'text-[#1A1A1A]/80 group-hover:text-[#703e19]'">
                {{ cat.name.replace('#', '') }}
              </span>
              
              <span class="ml-1.5 font-sans text-[11px] lg:text-xs font-semibold text-[#1A1A1A]/60">
                ({{ cat.count }})
              </span>
            </label>
          </div>
        </div>
      </aside>

      <!-- ================= MAIN LISTING ================= -->
      <main class="flex-1 w-full flex flex-col min-h-screen">

        <!-- No Results State -->
        <div v-if="filteredBlogs.length === 0" class="w-full py-20 flex flex-col items-center text-center">
          <svg class="w-12 h-12 text-[#1A1A1A]/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h4 class="font-serif text-xl text-[#1A1A1A]/80">No stories found.</h4>
          <p class="font-sans text-sm text-[#1A1A1A]/50 mt-2">Try adjusting your search or category filters.</p>
        </div>

        <!-- Blog Grid (1 Col Mobile/MD, 2 Col LG, 3 Col 2XL) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-8 gap-x-6">
          
          <NuxtLink 
            v-for="post in filteredBlogs" 
            :key="post.id" 
            :to="post.url"
            class="blog-card-elem group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(112,62,25,0.15)] hover:-translate-y-2 border border-[#1A1A1A]/5 hover:border-[#703e19]/30 transition-all duration-500 cursor-pointer w-full max-w-[500px] mx-auto md:max-w-none"
          >
            <!-- Image (16:9 for shorter vertical footprint) -->
            <div class="relative w-full aspect-[16/9] overflow-hidden shrink-0">
              <img :src="post.img" :alt="post.title" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            </div>
            
            <!-- Content -->
            <div class="flex flex-col p-5 lg:px-5 lg:py-5 flex-grow">
              <!-- Date -->
              <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-[#C47551] uppercase font-bold mb-2.5">
                {{ post.date }}
              </span>
              
              <!-- Title -->
              <h3 class="text-lg md:text-[19px] text-[#1A1A1A] leading-snug mb-2.5 font-serif font-medium group-hover:text-[#703e19] transition-colors">
                {{ post.title }}
              </h3>
              
              <!-- Tags -->
              <div class="flex items-center flex-wrap gap-1.5 mb-3">
                <span v-for="tag in post.tags" :key="tag" class="text-[9px] lg:text-[10px] bg-[#F9F8F6] px-2 py-1 rounded-md text-[#1A1A1A]/70 font-sans uppercase font-medium tracking-widest">
                  {{ tag }}
                </span>
              </div>
              
              <!-- Intro Paragraph (Darkened Text, Line Clamp 2) -->
              <p class="font-sans text-[13px] md:text-[14px] text-[#1A1A1A]/90 font-light leading-[1.8] line-clamp-2 mb-4">
                {{ post.intro }}
              </p>
              
              <!-- Rectangular Single Button aligned to bottom left -->
              <div class="mt-auto pt-2">
                <div class="inline-flex items-center justify-center gap-3 px-5 py-2.5 border border-[#1A1A1A]/15 bg-transparent group-hover:bg-[#703e19] group-hover:border-[#703e19] transition-all duration-300">
                  <span class="text-[10px] font-sans tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#F9F8F6] font-bold uppercase transition-colors duration-300">
                    Read Story
                  </span>
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transform transition-all duration-300 stroke-[#1A1A1A] group-hover:stroke-[#F9F8F6] group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </div>
              </div>
              
            </div>
          </NuxtLink>

        </div>
      </main>

    </div>
  </section>
</template>