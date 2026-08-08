<script setup>
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD (Expanded & Updated)
// ==========================================
const impactData = {
  header: {
    eyebrow: 'Our Philosophy',
    titleMain: 'Making A',
    titleHighlight: 'Difference.',
    intro: 'As a responsible travel company, we believe in the coexistence of our natural environment, its indigenous communities, and their diverse cultures. We travel slowly, ensuring every footprint leaves a positive mark.'
  },
  items: [
    {
      id: 'slow-travel',
      tabTitle: 'Slow Travel',
      tabImg: '/images/home/itin-1.jpg',
      tint: 'rgba(112, 62, 25, 0.5)', // Warm Brown
      content: {
        titleMain: 'Slow travel,',
        titleHighlight: 'lasting impact',
        intro: 'We craft our circuits on predominantly beautiful landscapes which are surprisingly invisible on the current day tourism map. We focus on building a strategic infusion of tourism in these areas which brings economic augmentation and preservation of culture.',
        mainImg: '/images/home/stay-1.jpeg',
        quote: 'We focus on building a strategic infusion of tourism in these areas which would bring economic augmentation and preservation of culture.',
        pillars: [
          {
            title: 'Villages That Form Civilizations',
            img: '/images/home/itin-2.jpg',
            list: [
              'Villages were always considered the cradle of any civilization. Thanks to the pursuit of fertile lands.',
              'They always hosted a plethora of cultures; even great nations trace their legacy to rural traditions.',
              'Through the millennium of human activities, numerous storytelling traditions evolved.',
              'As a travel company, we want our guests to experience these less-known villages ecologically.'
            ]
          },
          {
            title: 'Communities Of The Land',
            img: '/images/home/stay-2.jpeg',
            list: [
              'Most of the communities of any land are either indigenous to the area or migrated with purpose.',
              'We associate with 200+ communities at the grass-root level, bonding with them through extensive research.',
              'We developed events and experiences with these communities, gaining their trust and opening gateways.',
              'Our guests cherish the opportunity for a cultural exchange to learn something new and authentic.'
            ]
          },
          {
            title: 'Stories That Sparked Life',
            img: '/images/home/stay-3.jpg',
            list: [
              'We draw our inspiration from these vivacious stories and curate experiences revolving around them.',
              'By infusing our creativity and knowledge of the land, we developed circuits that are entirely unique.',
              'To this day, we take pride in having conducted grassroots events and curating bespoke experiences.',
              'Such events and tours shaped the perspective of our communities, transforming them holistically.'
            ]
          }
        ]
      }
    },
    {
      id: 'authentic',
      tabTitle: 'Authentic Connection',
      tabImg: '/images/home/itin-2.jpg',
      tint: 'rgba(44, 62, 80, 0.5)', // Deep Slate
      content: {
        titleMain: 'Authentic over',
        titleHighlight: 'curated',
        intro: 'Stripping away the artificial to reveal the raw, unpolished, and breathtaking reality of living cultures. We bypass the commercial traps to introduce you to the true guardians of the land.',
        mainImg: '/images/home/itin-3.jpg',
        quote: 'To travel authentically is to accept a destination exactly as it is, honoring its flaws and marveling at its truths.',
        pillars: [
          {
            title: 'Unscripted Encounters',
            img: '/images/home/stay-4.jpg',
            list: [
              'Leaving room in every itinerary for serendipity and spontaneous local interactions.',
              'Prioritizing family-owned heritage stays over standardized chain hospitality.',
              'Engaging with master artisans in their own workspaces rather than commercial showrooms.'
            ]
          },
          {
            title: 'Culinary Heritage',
            img: '/images/home/stay-1.jpeg',
            list: [
              'Dining is an act of cultural immersion, sharing meals prepared by local matriarchs.',
              'Sourcing ingredients entirely from regional, organic, and seasonal harvests.',
              'Documenting and preserving fading ancestral recipes through culinary tours.'
            ]
          },
          {
            title: 'The Art of Listening',
            img: '/images/home/itin-1.jpg',
            list: [
              'Our guides are trained as cultural interpreters rather than standard narrators.',
              'Fostering dialogue where guests and hosts exchange worldviews on equal footing.',
              'Respecting sacred spaces by understanding the silence required within them.'
            ]
          }
        ]
      }
    },
    { id: 'local-first', tabTitle: 'Local First', tabImg: '/images/home/itin-3.jpg', tint: 'rgba(39, 99, 59, 0.45)', content: { titleMain: 'Local first,', titleHighlight: 'always', intro: 'Directly empowering regional artisans, guides, and family-owned stays.', mainImg: '/images/home/stay-2.jpeg', quote: 'True luxury lies in the warmth of a community that benefits directly from your presence.', pillars: [{ title: 'Economic Empowerment', img: '/images/home/itin-1.jpg', list: ['80% of trip costs stay local.','Supporting micro-entrepreneurs.'] }, { title: 'Skill Development', img: '/images/home/stay-3.jpg', list: ['Funding local guide training.','Reviving dying crafts.'] }, { title: 'Sustainable Trade', img: '/images/home/itin-2.jpg', list: ['Fair wages guaranteed.','No middlemen in artisan purchases.'] }] } },
    { id: 'protecting-beauty', tabTitle: 'Protecting Beauty', tabImg: '/images/home/stay-1.jpeg', tint: 'rgba(16, 52, 166, 0.4)', content: { titleMain: 'Protecting natural', titleHighlight: 'beauty', intro: 'Implementing zero-trace practices to ensure pristine landscapes remain untouched.', mainImg: '/images/home/stay-4.jpg', quote: 'We are merely guests in the wild; our greatest achievement is leaving no trace.', pillars: [{ title: 'Zero Plastics', img: '/images/home/itin-2.jpg', list: ['Eliminated single-use plastics.'] }, { title: 'Wildlife Ethics', img: '/images/home/stay-1.jpeg', list: ['Strict distance guidelines.'] }, { title: 'Reforestation', img: '/images/home/itin-3.jpg', list: ['A tree planted for every traveler.'] }] } },
    { id: 'conscious-choices', tabTitle: 'Conscious Choices', tabImg: '/images/home/stay-3.jpg', tint: 'rgba(139, 69, 19, 0.45)', content: { titleMain: 'Conscious choices,', titleHighlight: 'lighter footprint', intro: 'Every logistical decision is weighed against its environmental impact.', mainImg: '/images/home/itin-1.jpg', quote: 'Conscious travel is not a restriction; it is an elevation of the experience.', pillars: [{ title: 'Carbon Offsetting', img: '/images/home/stay-2.jpeg', list: ['Calculating transport emissions.'] }, { title: 'Eco-Mobility', img: '/images/home/itin-3.jpg', list: ['Promoting train and EV travel.'] }, { title: 'Resource Management', img: '/images/home/stay-4.jpg', list: ['Partnering with solar-powered stays.'] }] } },
    { id: 'giving-back', tabTitle: 'Giving Back', tabImg: '/images/home/stay-4.jpg', tint: 'rgba(92, 10, 10, 0.45)', content: { titleMain: 'Giving back,', titleHighlight: 'where we go', intro: 'A percentage of every journey directly funds grassroots conservation.', mainImg: '/images/home/itin-2.jpg', quote: 'Impact is measured not by where we go, but by what we leave behind.', pillars: [{ title: 'Education Funds', img: '/images/home/stay-3.jpg', list: ['Supporting tribal schools.'] }, { title: 'Health Initiatives', img: '/images/home/itin-1.jpg', list: ['Medical camps in remote areas.'] }, { title: 'Heritage Restoration', img: '/images/home/stay-1.jpeg', list: ['Funding temple renovations.'] }] } }
  ]
}

const activeTabId = ref(impactData.items[0].id)
const activeTabContent = computed(() => impactData.items.find(t => t.id === activeTabId.value))

const handleTabClick = (id) => {
  activeTabId.value = id
}

// Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.impact-reveal', { y: 30, opacity: 0 })
  gsap.set('.tab-card', { opacity: 0, y: 20 })

  const playAnimations = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.value,
        start: 'top 85%',
        once: true
      }
    })

    tl.to('.impact-reveal', { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' })
      .to('.tab-card', { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, "-=0.4")
  }

  if (isLoaderFinished.value) {
    playAnimations()
  } else {
    const unwatch = watch(isLoaderFinished, (val) => {
      if (val) { playAnimations(); unwatch() }
    })
  }
})
</script>

<template>
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-8 flex flex-col max-w-[95rem] mx-auto">
    
    <!-- ========================================== -->
    <!-- 1. HEADER AREA -->
    <!-- ========================================== -->
    <div class="w-full flex flex-col items-center text-center mb-12 md:mb-16">
      <h3 class="impact-reveal flex items-center justify-center gap-4 mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase w-full">
        <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        <span>{{ impactData.header.eyebrow }}</span>
        <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
      </h3>
      <h2 class="impact-reveal text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15] text-[#703e19] mb-4 font-serif font-light">
        {{ impactData.header.titleMain }} <span class="text-[#C47551] italic font-normal capitalize">{{ impactData.header.titleHighlight }}</span>
      </h2>
      <p class="impact-reveal font-sans text-sm md:text-base lg:text-[15px] leading-[1.85] text-[#1A1A1A]/85 font-light max-w-3xl">
        {{ impactData.header.intro }}
      </p>
    </div>

    <!-- ========================================== -->
    <!-- 2. AUTO-WIDTH FLEX TABS (Horizontal Scroll on Mobile) -->
    <!-- ========================================== -->
    <div class="w-full flex flex-nowrap sm:flex-wrap justify-start sm:justify-center overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none hide-scrollbar scroll-smooth gap-3 lg:gap-4 mb-16 md:mb-20 pb-4 sm:pb-0">
      <button
        v-for="tab in impactData.items"
        :key="tab.id"
        @click="handleTabClick(tab.id)"
        class="tab-card shrink-0 snap-center sm:snap-align-none relative px-8 py-6 md:px-10 md:py-8 rounded-2xl overflow-hidden group cursor-pointer border transition-all duration-300 outline-none flex items-center justify-center min-w-[140px]"
        :class="activeTabId === tab.id ? 'border-[#c47551] border-4 shadow-[0_10px_25px_rgba(112,62,25,0.2)] -translate-y-1' : 'border-transparent hover:border-[#1A1A1A]/20 hover:-translate-y-0.5'"
      >
        <!-- Background Image -->
        <img :src="tab.tabImg" 
            :alt="tab.tabTitle" 
            :class="activeTabId === tab.id ? 'opacity-50' : 'opacity-5'"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        <!-- Base Black Tint (Darker when inactive, Lighter when active) -->
        <div 
          class="absolute inset-0 bg-black transition-opacity duration-500" 
          :class="activeTabId === tab.id ? 'opacity-70' : 'opacity-10 group-hover:opacity-50'"
        ></div>

        <!-- JSON Colored Tint Overlay -->
        <div 
            :class="activeTabId === tab.id ? 'opacity-70' : 'opacity-10 group-hover:opacity-50'"
            class="absolute inset-0 backdrop-blur-sm transition-opacity duration-500 opacity-60 mix-blend-multiply" :style="{ backgroundColor: tab.tint }"></div>
        
        <!-- Text Content -->
        <span 
            :class="activeTabId === tab.id ? 'text-[#f9f8f6] scale-105 brightness-200' : 'text-[#1a1a1a] group-hover:text-[#f9f8f6]'"
            class="relative z-10 font-serif text-xl lg:text-2xl shadow-md font-medium leading-tight drop-shadow-md whitespace-nowrap transition-transform duration-300">
          {{ tab.tabTitle }}
        </span>
      </button>
    </div>

    <!-- ========================================== -->
    <!-- 3. ACTIVE CONTENT AREA -->
    <!-- ========================================== -->
    <transition name="fade" mode="out-in">
      <div :key="activeTabId" class="w-full flex flex-col gap-16 md:gap-24">
        
        <!-- TOP: Title + Image/Quote Split -->
        <div class="w-full flex flex-col gap-8 md:gap-12">
          
          <!-- Styled Content Title -->
          <div class="flex flex-col text-left">
            <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#703e19] font-normal mb-4 tracking-tight">
              {{ activeTabContent.content.titleMain }} <span class="text-[#C47551] italic font-normal capitalize">{{ activeTabContent.content.titleHighlight }}</span>
            </h2>
            <p class="font-sans text-[14px] md:text-[15px] lg:text-base text-[#1A1A1A]/80 font-light leading-[1.8] max-w-4xl">
              {{ activeTabContent.content.intro }}
            </p>
          </div>

          <!-- Split: Wide Image & Decorated Quote -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <!-- Main Representative Image -->
            <div class="lg:col-span-7 w-full aspect-auto rounded-2xl  h-full overflow-hidden shadow-sm">
              <img :src="activeTabContent.content.mainImg" alt="Visual" class="w-full h-full object-cover" />
            </div>

            <!-- Highly Aesthetic Decorated Quote -->
            <div class="lg:col-span-5 w-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-14 relative bg-white rounded-3xl border border-[#703e19]/10 shadow-[0_8px_30px_rgba(112,62,25,0.04)]">
              
              <!-- Subtle Background Quotes Watermark -->
              <svg class="absolute top-6 left-6 w-16 h-16 text-[#C47551]/30 transform -scale-x-100 rotate-180 select-none" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>

              <div class="w-12 h-[1px] bg-[#703e19]/20 mb-8"></div>
              
              <!-- Enlarged Quote Text -->
              <p class="font-serif text-2xl md:text-3xl lg:text-[32px] text-[#703e19] text-center leading-[1.5] relative z-10 tracking-wide font-light">
                {{ activeTabContent.content.quote }}
              </p>
              
              <div class="w-12 h-[1px] bg-[#703e19]/20 mt-8"></div>

              <!-- Bottom Right Watermark -->
              <svg class="absolute bottom-6 right-6 w-16 h-16 text-[#C47551]/30 transform rotate-180 select-none" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>

          </div>
        </div>

        <!-- BOTTOM: 3-Column Pillar Architecture (Snaps to 1 col < 640px, 2 col < 1024px) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 xl:gap-12">
          
          <div v-for="(pillar, idx) in activeTabContent.content.pillars" :key="idx" class="flex flex-col gap-5">
            <!-- Pillar Image -->
            <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <img :src="pillar.img" :alt="pillar.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            
            <!-- Pillar Title -->
            <h4 class="font-serif text-xl lg:text-[22px] text-[#703e19] font-medium leading-snug">
              {{ pillar.title }}
            </h4>
            
            <!-- Pillar Unordered List (Circle Tick) -->
            <ul class="flex flex-col gap-3">
              <li v-for="(item, i) in pillar.list" :key="i" class="flex items-start gap-3">
                
                <!-- Circle Tick Bullet -->
                <div class="w-[18px] h-[18px] rounded-full bg-[#703e19]/10 flex items-center justify-center shrink-0 mt-[3px]">
                  <svg class="w-2.5 h-2.5 text-[#703e19]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <span class="font-sans text-[13.5px] md:text-[14px] text-[#1A1A1A]/80 font-light leading-[1.7]">
                  {{ item }}
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </transition>

  </section>
</template>

<style scoped>
/* Mobile horizontal scrollbar hiding */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}

/* Smooth transition for active tab content swapping */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>