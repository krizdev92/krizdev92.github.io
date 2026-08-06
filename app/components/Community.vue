<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
const activeMember = ref(null)

// --- Dynamic Modal State ---
const openModal = (member) => {
  activeMember.value = member
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}
const closeModal = () => {
  activeMember.value = null
  document.body.style.overflow = '' // Restore scrolling
}

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const communityData = {
  header: {
    eyebrow: 'Community',
    titleMain: 'Meet the people',
    titleItalic: 'that bring journeys to life.',
    decorationImage: '/images/logoart.png',
    intro: 'Behind every meaningful journey is a network of remarkable people. Artisans, storytellers, cooks, performers, and local guides — each one a keeper of culture, craft, and tradition.'
  },
  members: [
    { id: 1, name: 'Soman', role: 'Boatman', location: 'Kumarakom, Kerala', desc: 'Soman navigates the intricate backwater canals with decades of inherited knowledge, sharing stories of the water.', img: '/images/home/com-1.jpg', url: '/community/soman' },
    { id: 2, name: 'Lekshmi', role: 'Weaver', location: 'Chendamangalam, Kerala', desc: 'A master of the handloom, Lekshmi weaves traditional Kasavu fabrics, preserving a centuries-old textile heritage.', img: '/images/home/com-2.jpg', url: '/community/lekshmi' },
    { id: 3, name: 'Gopi', role: 'Potter', location: 'Aruvacode, Kerala', desc: 'Working with native clay, Gopi molds beautiful, sustainable earthenware using techniques passed down through generations.', img: '/images/home/com-3.jpg', url: '/community/gopi' },
    { id: 4, name: 'Meena', role: 'Cook', location: 'Kuttanad, Kerala', desc: 'Meena brings to life the rich flavors of Kerala cuisine using age-old recipes and locally sourced ingredients.', img: '/images/home/com-4.jpg', url: '/community/meena' },
    { id: 5, name: 'Sivan', role: 'Honey Collector', location: 'Wayanad, Kerala', desc: 'Scaling towering trees in the dense forests, Sivan harvests wild honey using sustainable, traditional methods.', img: '/images/home/com-5.jpg', url: '/community/sivan' },
    { id: 6, name: 'Ramesh', role: 'Wood Carver', location: 'Aranmula, Kerala', desc: 'Ramesh crafts intricate wooden architecture and sculptures, keeping the majestic Kerala woodworking style alive.', img: '/images/home/com-6.jpg', url: '/community/ramesh' },
    { id: 7, name: 'Anu', role: 'Herbalist', location: 'Munnar, Kerala', desc: 'Deeply connected to the highland flora, Anu cultivates and prepares rare medicinal herbs for natural healing.', img: '/images/home/stay-1.jpeg', url: '/community/anu' },
    { id: 8, name: 'Babu', role: 'Storyteller', location: 'Kozhikode, Kerala', desc: 'With a captivating voice, Babu narrates ancient folktales and local legends that breathe life into historic ruins.', img: '/images/home/stay-2.jpeg', url: '/community/babu' },
    { id: 9, name: 'Shivu', role: 'Performer', location: 'Thrissur, Kerala', desc: 'A dedicated Theyyam artist, Shivu channels the divine through mesmerizing midnight ritual performances.', img: '/images/home/stay-3.jpg', url: '/community/shivu' },
    { id: 10, name: 'Nizam', role: 'Spice Grower', location: 'Thekkady, Kerala', desc: 'Tending to lush cardamom and pepper estates, Nizam shares the fragrant secrets of the spice coast.', img: '/images/home/stay-4.jpg', url: '/community/nizam' },
    { id: 11, name: 'Radha', role: 'Flower Artist', location: 'Palakkad, Kerala', desc: 'Radha creates spectacular Pookkalam designs, transforming fresh blossoms into vibrant, geometric floor art.', img: '/images/home/blog-1.jpeg', url: '/community/radha' },
    { id: 12, name: 'Jose', role: 'Local Guide', location: 'Fort Kochi, Kerala', desc: 'Wandering the cobblestone streets, Jose unveils the layered colonial history of Fort Kochi with passion.', img: '/images/home/blog-2.webp', url: '/community/jose' },
    { id: 13, name: 'Jayan', role: 'Fisherman', location: 'Mararikulam, Kerala', desc: 'Casting the iconic Chinese fishing nets, Jayan continues a majestic, age-old coastal livelihood.', img: '/images/home/blog-3.webp', url: '/community/jayan' },
    { id: 14, name: 'Biju', role: 'Coir Artisan', location: 'Alappuzha, Kerala', desc: 'Transforming coconut husks into golden fiber, Biju demonstrates the resilient craft of coir spinning.', img: '/images/home/com-1.jpg', url: '/community/biju' },
    { id: 15, name: 'Devika', role: 'Ayurveda', location: 'Varkala, Kerala', desc: 'Guided by ancient Vedic texts, Devika formulates bespoke Ayurvedic therapies for deep holistic wellness.', img: '/images/home/com-2.jpg', url: '/community/devika' },
    { id: 16, name: 'Manoj', role: 'Caretaker', location: 'Guruvayur, Kerala', desc: 'Sharing a profound bond with temple elephants, Manoj dedicates his life to their gentle care and upkeep.', img: '/images/home/com-3.jpg', url: '/community/manoj' },
    { id: 17, name: 'Leela', role: 'Tea Grower', location: 'Vagamon, Kerala', desc: 'Plucking the finest leaves from high-altitude slopes, Leela understands the nuanced art of tea cultivation.', img: '/images/home/com-4.jpg', url: '/community/leela' },
    { id: 18, name: 'Vijay', role: 'Crafter', location: 'Kollam, Kerala', desc: 'Vijay ingeniously carves discarded coconut shells into exquisite, sustainable handicrafts and utensils.', img: '/images/home/com-5.jpg', url: '/community/vijay' },
    { id: 19, name: 'Haridas', role: 'Temple Guide', location: 'Trivandrum, Kerala', desc: 'Haridas decodes the mystic architecture and profound rituals of ancient, stone-carved Dravidian temples.', img: '/images/home/com-6.jpg', url: '/community/haridas' },
    { id: 20, name: 'Aswathy', role: 'Artist', location: 'Kottayam, Kerala', desc: 'Through intricate mudras and vibrant makeup, Aswathy tells epic mythological tales on stage.', img: '/images/home/stay-1.jpeg', url: '/community/aswathy' },
    { id: 21, name: 'Prabhu', role: 'Merchant', location: 'Mattancherry, Kerala', desc: 'Operating a centuries-old warehouse, Prabhu trades in the world’s finest ginger, turmeric, and nutmeg.', img: '/images/home/stay-2.jpeg', url: '/community/prabhu' },
    { id: 22, name: 'Tessy', role: 'Educator', location: 'Ernakulam, Kerala', desc: 'Tessy bridges the gap between travelers and locals, offering immersive lessons in regional customs.', img: '/images/home/stay-3.jpg', url: '/community/tessy' },
    { id: 23, name: 'Arun', role: 'Navigator', location: 'Kavalam, Kerala', desc: 'Steering traditional wooden kettuvallams, Arun knows every hidden canal and bird sanctuary in the wetlands.', img: '/images/home/stay-4.jpg', url: '/community/arun' },
    { id: 24, name: 'Sneha', role: 'Mural Painter', location: 'Pathanamthitta, Kerala', desc: 'Using natural pigments, Sneha paints stunning, complex temple murals that preserve mythological histories.', img: '/images/home/blog-1.jpeg', url: '/community/sneha' },
  ],
  bottomCta: {
    text: 'Explore the Network',
    url: '/community',
    icon: '/images/logoart.png'
  }
}

// --- Matrix Chunking for Responsive Layouts ---
const desktopRows = computed(() => [
  communityData.members.slice(0, 8),
  communityData.members.slice(8, 16),
  communityData.members.slice(16, 24)
])

// const tabletRows = computed(() => [
//   communityData.members.slice(0, 13),
//   communityData.members.slice(13, 25)
// ])

const mobileRows = computed(() => [
  communityData.members.slice(0, 8),
  communityData.members.slice(8, 16),
  communityData.members.slice(16, 24)
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true
    }
  })

  // Header Animation
  tl.fromTo('.community-header-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }
  )
  // Grid Nodes Animation
  .fromTo('.community-node-elem',
    { opacity: 0, scale: 0.8, y: 20 },
    { opacity: 1, scale: 1, y: 0, stagger: 0.03, duration: 0.8, ease: 'back.out(1.2)' },
    "-=0.5"
  )
  // CTA Animation
  .fromTo('.community-cta-elem',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    "-=0.4"
  )
})
</script>

<template>
  <section ref="sectionRef" class="relative w-full pt-10 md:pt-14 pb-4 md:pb-8 bg-[#fff9e0]/10 flex flex-col overflow-hidden">
    
    <!-- ================= SECTION HEADER ================= -->
    <div class="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex justify-center mb-6 md:mb-8">
      <div class="max-w-4xl flex flex-col items-center text-center">
        
        <h3 class="community-header-elem flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
          <span>{{ communityData.header.eyebrow }}</span>
          <span class="w-8 md:w-16 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h4 
          class="community-header-elem text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-[#1A1A1A] mb-4"
          style="font-family: 'Playfair Display', 'Cinzel', 'Optima', serif; font-weight: 300;"
        >
          <span class="font-normal">{{ communityData.header.titleMain }}</span><br />
          <span class="font-normal leading-tight text-[#673b1c] italic capitalize">{{ communityData.header.titleItalic }}</span>
        </h4>

        <p class="community-header-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.8] text-[#1A1A1A]/80 font-light max-w-xl">
          {{ communityData.header.intro }}
        </p>

      </div>
    </div>

    <!-- ================= 1. DESKTOP HONEYCOMB GRID (>1280px) ================= -->
    <div class="hidden xl:flex w-full flex-col items-center justify-center px-4 mb-8">
      <div 
        v-for="(row, rIdx) in desktopRows" 
        :key="`d-row-${rIdx}`" 
        class="flex items-center justify-center gap-8 py-5"
        :class="{ '-mt-2': rIdx !== 0 }"
      >
        <div 
          v-for="member in row" 
          :key="`d-mem-${member.id}`" 
          class="community-node-elem relative w-[8rem] h-[8rem] flex items-center justify-center cursor-pointer group"
          @click="openModal(member)"
        >
          <!-- Precisely calculated concentric SVG Arc Text -->
          <svg viewBox="0 0 100 100" class="absolute -inset-y-2 w-full h-full pointer-events-none group-hover:-rotate-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <path :id="`arc-d-${member.id}`" d="M 8.6 65 A 44 44 0 1 1 91.4 65" fill="transparent" />
            <text fill="#1A1A1A">
              <textPath :href="`#arc-d-${member.id}`" startOffset="50%" text-anchor="middle" class="text-[6.5px] font-bold tracking-[0.15em] uppercase font-sans">
                {{ member.name }} | {{ member.role }}
              </textPath>
            </text>
          </svg>
          <!-- Avatar Image -->
          <div class="w-[110px] h-[110px] rounded-full overflow-hidden border-2 border-[#F9F8F6] shadow-sm group-hover:shadow-lg transition-shadow duration-300 relative z-10">
            <img :src="member.img" :alt="member.name" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-[#673b1c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 2. TABLET SWIPE ROWS (768px - 1024px) ================= -->
    <!-- <div class="hidden 2xl:hidden w-full flex-col gap-4 overflow-hidden mb-8">
      <div 
        v-for="(row, rIdx) in tabletRows" 
        :key="`t-row-${rIdx}`" 
        class="flex w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory px-12 gap-5 py-2"
      >
        <div 
          v-for="member in row" 
          :key="`t-mem-${member.id}`" 
          class="community-node-elem relative w-[7.7rem] h-[7.7rem] shrink-0 snap-center flex items-center justify-center cursor-pointer group"
          @click="openModal(member)"
        >
          <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none group-hover:-rotate-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <path :id="`arc-t-${member.id}`" d="M 8.6 65 A 44 44 0 1 1 91.4 65" fill="transparent" />
            <text fill="#1A1A1A">
              <textPath :href="`#arc-t-${member.id}`" startOffset="50%" text-anchor="middle" class="text-[6.5px] font-bold tracking-[0.15em] uppercase font-sans">
                {{ member.name }} | {{ member.role }}
              </textPath>
            </text>
          </svg>
          <div class="w-[94px] h-[94px] rounded-full overflow-hidden border-2 border-[#F9F8F6] shadow-sm">
            <img :src="member.img" :alt="member.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div> -->

    <!-- ================= 3. MOBILE SWIPE ROWS (<1280px) ================= -->
    <div class="flex xl:hidden w-full flex-col gap-2 overflow-hidden mb-8">
      <div 
        v-for="(row, rIdx) in mobileRows" 
        :key="`m-row-${rIdx}`" 
        class="flex w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory px-3 gap-2 py-1"
      >
        <div 
          v-for="member in row" 
          :key="`m-mem-${member.id}`" 
          class="community-node-elem relative w-[8rem] h-[8rem] shrink-0 snap-center flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          @click="openModal(member)"
        >
          <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700">
            <path :id="`arc-m-${member.id}`" d="M 8.6 65 A 44 44 0 1 1 91.4 65" fill="transparent" />
            <text fill="#1A1A1A">
              <textPath :href="`#arc-m-${member.id}`" startOffset="50%" text-anchor="middle" class="text-[6.5px] font-bold tracking-[0.1em] uppercase font-sans">
                {{ member.name }} | {{ member.role }}
              </textPath>
            </text>
          </svg>
          <div class="w-[84px] h-[84px] rounded-full overflow-hidden shadow-sm border border-[#F9F8F6]">
            <img :src="member.img" :alt="member.name" class="w-full h-full object-cover" />
          </div>
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

    <!-- ================= MODAL OVERLAY ================= -->
    <transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="activeMember" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 md:p-6 bg-[#1A1A1A]/80 backdrop-blur-sm overflow-hidden" @click.self="closeModal">
        
        <!-- Modal Card Container (With Max Height + Scrollbar Enablement) -->
        <div class="relative w-full max-w-2xl lg:max-w-4xl bg-[#F9F8F6] rounded-xl md:rounded-2xl overflow-y-auto max-h-[90vh] shadow-2xl flex flex-col md:flex-row transform transition-transform duration-500 custom-modal-scroll">
          
          <!-- Absolute Top Right Close Button -->
          <button @click="closeModal" class="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-[#1a1a1a]/20 md:bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/40 backdrop-blur-md rounded-full transition-colors z-50 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 md:w-5 md:h-5 text-[#1A1A1A]"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>

          <!-- STRICT 1:1 SQUARE IMAGE CONTAINER -->
          <div class="relative w-full md:w-[45%] aspect-square shrink-0 overflow-hidden bg-slate-200">
            <img :src="activeMember.img" :alt="activeMember.name" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <!-- Content Section -->
          <div class="flex flex-col p-6 md:p-8 lg:p-12 flex-1 justify-center relative">
            <!-- Header Group -->
            <div class="flex flex-col gap-1 mb-5 md:mb-6 border-b border-[#1A1A1A]/10 pb-5 md:pb-6 shrink-0">
              <h3 class="text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] leading-tight pr-8 md:pr-12" style="font-family: 'Playfair Display', 'Noto Serif', serif; font-weight: 500;">
                {{ activeMember.name }}
              </h3>
              <p class="font-sans text-[10px] md:text-[11px] tracking-[0.2em] text-[#673b1b] uppercase font-bold mt-1">
                {{ activeMember.role }}
              </p>
              <div class="flex items-center gap-2 mt-2 md:mt-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 text-[#1A1A1A]/50"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="font-sans text-[11px] md:text-[12px] font-medium text-[#1A1A1A]/70">{{ activeMember.location }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="font-sans text-[13px] md:text-sm lg:text-[15px] text-[#1A1A1A]/90 font-normal leading-[1.8] mb-0 flex-grow">
              {{ activeMember.desc }}
            </p>
          </div>

        </div>

      </div>
    </transition>


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

/* Hide scrollbar for swiping containers */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}

/* Sleek, Brand-Matching Custom Scrollbar for Landscape & Small Viewports */
.custom-modal-scroll::-webkit-scrollbar {
  width: 5px;
}
.custom-modal-scroll::-webkit-scrollbar-track {
  background: rgba(26, 26, 26, 0.05);
  border-radius: 8px;
}
.custom-modal-scroll::-webkit-scrollbar-thumb {
  background: rgba(26, 26, 26, 0.25);
  border-radius: 8px;
}
.custom-modal-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(117, 22, 0, 0.6);
}
</style>