<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  data: { type: Object, default: () => ({}) }
})

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

// State Managers
const activeTabId = ref('planning')
const openAccordionIndex = ref(0) // Default first question open

// Smooth scroll to top of accordions
const scrollToAccordions = () => {
  const targetElement = document.getElementById('faq-accordion-container')
  if (targetElement) {
    const yOffset = -100 // Tweak pixel offset here to clear sticky headers
    const yPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset
    window.scrollTo({ top: yPosition, behavior: 'smooth' })
  }
}

// Handle Tab Selection
const selectTab = (tabId) => {
  activeTabId.value = tabId
  nextTick(() => {
    scrollToAccordions()
  })
}

// Default Payload structured across 6 core travel categories
const defaultData = {
  tabs: [
    { id: 'planning', label: 'Planning & Booking', icon: `<path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>` },
    { id: 'experiences', label: 'Itineraries & Experiences', icon: `<path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>` },
    { id: 'stays', label: 'Stays & Retreats', icon: `<path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-8.5z"/><path d="M9 21v-6h6v6"/>` },
    { id: 'logistics', label: 'Travel & Logistics', icon: `<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.1-2.1.8l-.2.3 5 4.5-3 3-2.5-.5L1 16l3.5 3.5 1.2-1.5-.5-2.5 3-3 4.5 5 .3-.2c.7-.5 1-1.3.8-2.1z"/>` },
    { id: 'policies', label: 'Payments & Policies', icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` },
    { id: 'other', label: 'General & Other', icon: `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>` }
  ],
  categories: {
    planning: [
      { num: '01', q: 'How do I begin crafting a journey with you?', a: 'You can initiate your journey by filling out our alignment form or connecting via direct concierge WhatsApp. We schedule a brief consultation to decode your travel style, pace, and core expectations before building an initial blueprint.' },
      { num: '02', q: 'Can itineraries be customized for solo travelers or families?', a: 'Every itinerary is built from ground zero. Whether coordinating private mobility for solo travelers or arranging multi-suite sanctuary stays with varied pacing for extended families, every detail is tailored strictly to your party.' },
      { num: '03', q: 'How far in advance should I plan my journey?', a: 'For peak seasons (October through March) and highly exclusive boutique stays or forest sanctuary permits, we recommend initiating conversation 3 to 6 months in advance. However, shorter notice bespoke routes can often be accommodated.' },
      { num: '04', q: 'Do you cater to private groups and corporate retreats?', a: 'Yes. We design high-touch, private group immersions centered on wellness, heritage, or executive focus, ensuring single-use property buyouts and dedicated on-ground host coordination.' }
    ],
    experiences: [
      { num: '01', q: 'What makes your itineraries fundamentally different from commercial luxury tours?', a: 'Commercial tourism often prioritizes speed and photo-ops. We emphasize slowness, direct human reciprocity, and unscripted access—connecting you with village elders, sanctuary stewards, and master artisans far from public channels.' },
      { num: '02', q: 'Can dietary restrictions and wellness requirements be seamlessly integrated?', a: 'Absolutely. From private Ayurvedic consultations to customized organic plant-based menus across remote stays, your dietary and wellness preferences are briefed to every host prior to your arrival.' },
      { num: '03', q: 'What is the balance between structured activities and personal free time?', a: 'We architect routes with ample breathing room. Days are designed with intentional morning or late-afternoon cultural encounters, leaving golden hours open for unhurried reflection and personal discovery.' }
    ],
    stays: [
      { num: '01', q: 'How do you select your boutique accommodations and retreats?', a: 'We personally vet every stay based on character, environmental stewardship, privacy, and authentic regional architecture—favoring private ancestral estates, eco-sanctuaries, and intimate luxury retreats over standardized chain hotels.' },
      { num: '02', q: 'Are private villa buyouts and exclusive estate reservations available?', a: 'Yes. For complete privacy, we routinely arrange full estate buyouts across coastal sanctuaries, plantation bungalows, and backwater retreats.' }
    ],
    logistics: [
      { num: '01', q: 'What level of private mobility and transport support is provided?', a: 'You receive dedicated private chauffeur-driven luxury mobility throughout your entire route. Vehicles are sanitized, stocked with local refreshments, and managed by courteous, regional drivers.' },
      { num: '02', q: 'Is there 24/7 support while I am traveling on the ground?', a: 'Your dedicated travel designer and local concierge team monitor your route 24/7 in real-time, handling every detail from luggage transfers to last-minute route adjustments.' }
    ],
    policies: [
      { num: '01', q: 'What are your payment terms and confirmation milestones?', a: 'A 30% deposit secures private stay reservations and sanctuary permits. The remaining balance is settled 45 days prior to arrival. Detailed invoices and digital receipts are provided.' },
      { num: '02', q: 'What is your cancellation and route adjustment policy?', a: 'Cancellations made 60+ days prior receive partial travel credits for future routes. If weather or forest closures affect a specific sanctuary, we seamlessly pivot to equivalent private experiences.' }
    ],
    other: [
      { num: '01', q: 'Do you arrange international flights or visa support?', a: 'We manage all internal transfers, private charters, and regional logistics. While international flights are booked independently by guests, we assist with documentation guidance and arrival concierge services.' }
    ]
  }
}

const activePayload = computed(() => ({
  tabs: props.data?.tabs?.length ? props.data.tabs : defaultData.tabs,
  categories: props.data?.categories || defaultData.categories
}))

const currentQuestions = computed(() => {
  return activePayload.value.categories[activeTabId.value] || []
})

// Auto-open first question whenever tab changes
watch(activeTabId, () => {
  openAccordionIndex.value = 0
})

const toggleAccordion = (index) => {
  openAccordionIndex.value = openAccordionIndex.value === index ? null : index
}

// GSAP Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.faq-reveal', { y: 25, opacity: 0 })

  const playAnimations = () => {
    gsap.to('.faq-reveal', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: mainContainerRef.value,
        start: 'top 85%',
        once: true
      }
    })
  }

  if (isLoaderFinished.value) {
    playAnimations()
  } else {
    const unwatch = watch(isLoaderFinished, (finished) => {
      if (finished) {
        playAnimations()
        unwatch()
      }
    })
  }
})
</script>

<template>
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 pb-14 md:pb-20 flex flex-col relative mx-auto">
    
    <!-- CATEGORY TABS (Flex Wrap & Rounded-2xl) -->
    <div class="faq-reveal w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4 mb-8 md:mb-12 pt-2">
      <button
        v-for="tab in activePayload.tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="[
          'px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs md:text-[13px] font-sans tracking-[0.1em] uppercase transition-all duration-300 flex items-center gap-2.5 shrink-0 outline-none select-none border cursor-pointer',
          activeTabId === tab.id
            ? 'bg-[#703e19] text-[#F9F8F6] border-[#703e19] shadow-md scale-[1.02]'
            : 'bg-[#1A1A1A]/5 text-[#1A1A1A]/70 border-[#1A1A1A]/10 hover:bg-[#1A1A1A]/10 hover:text-[#1A1A1A]'
        ]"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="1.8" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="w-4 h-4 shrink-0"
          v-html="tab.icon"
        ></svg>
        <span class="font-medium mt-[1px]">{{ tab.label }}</span>
      </button>
    </div>

    <!-- ACCORDION CONTAINER -->
    <div id="faq-accordion-container" class="w-full flex flex-col gap-4 max-w-4xl mx-auto">
      
      <div
        v-for="(item, index) in currentQuestions"
        :key="`${activeTabId}-${index}`"
        class="faq-reveal transition-all duration-300 rounded-2xl border overflow-hidden"
        :class="[
          openAccordionIndex === index
            ? 'bg-white border-[#703e19]/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
            : 'bg-[#FAF9F5] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/20'
        ]"
      >
        <!-- Accordion Header -->
        <button
          @click="toggleAccordion(index)"
          class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 md:gap-6 outline-none cursor-pointer group select-none"
        >
          <div class="flex items-center gap-4 md:gap-6">
            <!-- Number Badge -->
            <span 
              :class="[
                'w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-sans text-xs font-bold shrink-0 transition-colors duration-300',
                openAccordionIndex === index
                  ? 'bg-[#703e19] text-[#F9F8F6]'
                  : 'bg-[#703e19]/10 text-[#703e19] group-hover:bg-[#703e19]/20'
              ]"
            >
              {{ item.num }}
            </span>

            <!-- Question Title -->
            <h3 class="font-serif text-base sm:text-lg md:text-xl text-[#1A1A1A] font-medium leading-snug group-hover:text-[#703e19] transition-colors">
              {{ item.q }}
            </h3>
          </div>

          <!-- Plus / Minus Toggle Icon -->
          <div 
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300',
              openAccordionIndex === index
                ? 'bg-[#703e19] border-[#703e19] text-[#F9F8F6] rotate-180'
                : 'bg-transparent border-[#1A1A1A]/15 text-[#1A1A1A]/70 group-hover:border-[#703e19] group-hover:text-[#703e19]'
            ]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <line x1="12" y1="5" x2="12" y2="19" v-if="openAccordionIndex !== index" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </button>

        <!-- CSS Grid Smooth Expansion -->
        <div 
          class="grid transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="[
            openAccordionIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          ]"
        >
          <div class="overflow-hidden">
            <div class="px-5 sm:px-6 pb-6 pt-1 ml-0 sm:ml-13 border-t border-[#1A1A1A]/5 mt-1">
              <p class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/85 font-light leading-[1.8]">
                {{ item.a }}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </section>
</template>