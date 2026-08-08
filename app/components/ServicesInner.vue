<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

// ==========================================
// CENTRAL JSON PAYLOAD
// ==========================================
const servicesData = {
  // B2B Section Data
  b2b: {
    header: {
      eyebrow: 'B2B Partnerships',
      subtitle: 'Seamless',
      titleMain: 'Local',
      titleHighlight: 'Extension.',
      intro: 'Exclusive collaborations for boutique agencies and luxury concierges seeking impeccable, white-label execution on the ground.'
    },
    tabs: [
      {
        id: 'agencies',
        title: 'Boutique Agencies',
        shortDesc: 'White-label itinerary execution and dedicated ground handling for your discerning clientele.',
        icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
        content: {
          titleMain: 'Your Trusted',
          titleHighlight: 'Ground Partner',
          paragraph: 'We operate as an invisible extension of your agency, ensuring your brand standards are meticulously maintained from arrival to departure. Your clients receive our uncompromised dedication, while you retain complete creative and commercial ownership.',
          features: [
            '100% White-label branding on all ground communications.',
            'Dedicated 24/7 concierge assigned to your agency.',
            'Priority access to exclusive sanctuary permits and estates.'
          ],
          experience: [
            'Over 8 years managing high-net-worth international clients.',
            'Flawless execution records with top-tier European agencies.',
            'Deep regional crisis-management and pivoting capabilities.'
          ],
          image: '/images/home/stay-1.jpeg'
        }
      },
      {
        id: 'corporate',
        title: 'Corporate Retreats',
        shortDesc: 'Immersive executive retreats focused on wellness, team synergy, and strategic disconnection.',
        icon: `<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>`,
        content: {
          titleMain: 'Executive',
          titleHighlight: 'Immersions',
          paragraph: 'We design high-touch corporate retreats that move beyond standard boardrooms. By integrating local heritage and deep nature immersions, we foster environments where genuine leadership synergy and strategic clarity can emerge.',
          features: [
            'Full estate and boutique property buyouts for absolute privacy.',
            'Curated wellness and mindfulness workshops for executives.',
            'Seamless logistical coordination for private charter arrivals.'
          ],
          experience: [
            'Successfully orchestrated retreats for Fortune 500 leadership teams.',
            'Direct relationships with ultra-private eco-sanctuaries.',
            'Expertise in balancing intense strategy sessions with restorative leisure.'
          ],
          image: '/images/home/stay-2.jpeg'
        }
      },
      {
        id: 'wellness',
        title: 'Wellness Collectives',
        shortDesc: 'Logistical architecture for holistic practitioners hosting retreats in the subcontinent.',
        icon: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`,
        content: {
          titleMain: 'Sanctuary',
          titleHighlight: 'Coordination',
          paragraph: 'For yoga instructors, Ayurvedic practitioners, and wellness coaches seeking to host retreats in India or Sri Lanka, we provide the foundational architecture. We handle the complex logistics so you can focus entirely on your teachings.',
          features: [
            'Scouting and securing authentic ashrams and Ayurvedic centers.',
            'Customizing deeply nourishing, organic, plant-based regional menus.',
            'Integrating respectful interactions with local spiritual masters.'
          ],
          experience: [
            'Deeply embedded in the traditional Ayurvedic communities of Kerala.',
            'Personal practice and understanding of holistic retreat pacing.',
            'Zero-plastic and highly sustainable operational blueprints.'
          ],
          image: '/images/home/itin-3.jpg'
        }
      },
      {
        id: 'concierge',
        title: 'Luxury Concierge',
        shortDesc: 'On-demand, highly specialized local fulfillment for global lifestyle management firms.',
        icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
        content: {
          titleMain: 'On-Demand',
          titleHighlight: 'Exclusivity',
          paragraph: 'When your members require the impossible in our region, we are your boots on the ground. From securing last-minute private jet clearances to arranging unlisted ancestral home dinners, we execute with absolute discretion.',
          features: [
            'Instant operational response for last-minute requests.',
            'Access to private art collections, jewelers, and master artisans.',
            'Encrypted, discreet handling of high-profile identities.'
          ],
          experience: [
            'Trusted partner for elite global lifestyle management syndicates.',
            'Unmatched black-book access to regional royalty and influencers.',
            'Trained in ultra-luxury hospitality and absolute confidentiality.'
          ],
          image: '/images/home/stay-3.jpg'
        }
      }
    ]
  },
  // Experience Design Section Data
  experienceDesign: {
    header: {
      eyebrow: 'Personalized Routing',
      subtitle: 'The Art Of',
      titleMain: 'Experience',
      titleHighlight: 'Design',
    },
    content: {
      paragraph: 'End-to-end itinerary design tailored meticulously to your specific pace, preferences, and cultural interests. We craft immersive journeys that transcend the ordinary, blending luxurious comfort with profound local connections to ensure every moment resonates with your personal travel philosophy.',
      features: [
        'Bespoke curation built from ground zero for every traveler.',
        'Intimate pacing that favors slowness over speed.',
        'Continuous 24/7 concierge oversight from arrival to departure.'
      ],
      experience: [
        'Over a decade of traversing hidden, unmapped subcontinental trails.',
        'Direct, personal relationships with boutique property owners.',
        'A refined instinct for matching traveler archetypes with the perfect regional hosts.'
      ],
      image: '/images/home/itin-1.jpg'
    }
  }
}

// B2B State Management
const activeB2bTabId = ref(servicesData.b2b.tabs[0].id)
const activeB2bContent = computed(() => 
  servicesData.b2b.tabs.find(t => t.id === activeB2bTabId.value)?.content
)

// Scroll Logic for Tabs
const handleTabClick = (id) => {
  activeB2bTabId.value = id
  nextTick(() => {
    const target = document.getElementById('b2b-content-area')
    if (target) {
      const yOffset = -120 // Clears sticky headers
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  })
}

// Animations
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.reveal-elem', { y: 30, opacity: 0 })

  const playAnimations = () => {
    gsap.utils.toArray('.reveal-section').forEach((section) => {
      const elems = section.querySelectorAll('.reveal-elem')
      gsap.to(elems, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true
        }
      })
    })
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
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-8 flex flex-col gap-20 lg:gap-32 mx-auto">
    
    <!-- ========================================== -->
    <!-- 1. B2B PARTNERSHIPS SECTION -->
    <!-- ========================================== -->
    <div class="reveal-section w-full flex flex-col">
      
      <!-- Left Aligned Header -->
      <div class="flex flex-col items-start text-center mb-10 md:mb-12">
        <span class="reveal-elem w-full font-serif text-lg md:text-xl text-[#C47551] italic mb-1">{{ servicesData.experienceDesign.header.subtitle }}</span>
        <h2 class="reveal-elem w-full text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15] text-[#703e19] mb-4 font-serif font-light">
          {{ servicesData.b2b.header.titleMain }} <span class="text-[#C47551] italic font-normal capitalize">{{ servicesData.b2b.header.titleHighlight }}</span>
        </h2>
        <p class="reveal-elem w-full font-sans text-sm md:text-base lg:text-[15px] leading-[1.85] text-[#1A1A1A]/85 font-light">
          {{ servicesData.b2b.header.intro }}
        </p>
      </div>

      <!-- 4 Category Cards (Tabs) -->
      <div class="reveal-elem grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16">
        <button
          v-for="tab in servicesData.b2b.tabs"
          :key="tab.id"
          @click="handleTabClick(tab.id)"
          class="group text-left p-6 md:p-8 rounded-2xl md:rounded-[2rem] border transition-all duration-500 ease-out flex flex-col outline-none select-none"
          :class="[
            activeB2bTabId === tab.id
              ? 'bg-gradient-to-br from-[#301916] to-[#2a1510] shadow-[0_12px_30px_rgba(48,23,6,0.2)]'
              : 'bg-[#f2eae2] border-[#1A1A1A]/10 hover:border-[#703e19] transition-all  duration-500 ease-out hover:shadow-xl'
          ]"
        >
          <!-- Icon -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-10 h-10 md:w-12 md:h-12 mb-4 transition-colors duration-500"
            :class="activeB2bTabId === tab.id ? 'text-[#c47551]' : 'text-[#703e19]'"
            v-html="tab.icon"
          ></svg>
          
          <!-- Title -->
          <h3 
            class="font-serif text-lg md:text-xl font-medium mb-3 transition-colors duration-500"
            :class="activeB2bTabId === tab.id ? 'text-[#f9f8f6]' : 'text-[#703e19]'"
          >
            {{ tab.title }}
          </h3>
          
          <!-- Short Paragraph -->
          <p 
            class="font-sans text-[13px] md:text-sm font-light leading-[1.7] transition-colors duration-500"
            :class="activeB2bTabId === tab.id ? 'text-[#F9F8F6]/80' : 'text-[#1A1A1A]/70'"
          >
            {{ tab.shortDesc }}
          </p>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="b2b-content-area" class="reveal-elem w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        <!-- Mobile: Image moves above content -->
        <div class="lg:col-span-5 w-full lg:sticky top-28 order-1 lg:order-2">
          <div class="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border bg-[#703e19]/10 border-[#1A1A1A]/10">
            <!-- Vue Transition for smooth image crossfade -->
            <transition name="fade" mode="out-in">
              <img
                :key="activeB2bContent.image"
                :src="activeB2bContent.image"
                alt="B2B Visual"
                class="w-full h-full object-cover"
              />
            </transition>
          </div>
        </div>

        <!-- Content (Left side on Desktop) -->
        <div class="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          <!-- Transition Wrapper for smooth text swapping -->
          <transition name="fade-up" mode="out-in">
            <div :key="activeB2bTabId" class="w-full flex flex-col">
            <h3 class="reveal-elem flex items-center gap-4 mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
                <span>{{ servicesData.b2b.header.eyebrow }}</span>
                <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
            </h3>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15] text-[#703e19] mb-5 font-serif font-light">
                {{ activeB2bContent.titleMain }} <span class="text-[#C47551] italic font-normal capitalize">{{ activeB2bContent.titleHighlight }}</span>
              </h2>
              
              <p class="font-sans text-sm md:text-base lg:text-[15px] leading-[1.85] text-[#1A1A1A]/85 font-light mb-10 max-w-2xl">
                {{ activeB2bContent.paragraph }}
              </p>

              <!-- Features List -->
              <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#703e19] mb-4">Core Features</h4>
              <ul class="flex flex-col gap-4 mb-10">
                <li v-for="(feat, i) in activeB2bContent.features" :key="i" class="flex items-start gap-3.5">
                  <div class="w-4 h-4 rounded-full bg-[#703e19]/10 flex items-center justify-center shrink-0 mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 h-2.5 text-[#703e19]"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-[1.7]">{{ feat }}</span>
                </li>
              </ul>

              <!-- My Experience List -->
              <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#703e19] mb-4">Our Experience</h4>
              <ul class="flex flex-col gap-4">
                <li v-for="(exp, i) in activeB2bContent.experience" :key="i" class="flex items-start gap-3.5">
                  <div class="w-4 h-4 flex items-center justify-center shrink-0 mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#C47551]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <span class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-[1.7]">{{ exp }}</span>
                </li>
              </ul>
              
            </div>
          </transition>
        </div>

      </div>
    </div>

    <!-- ========================================== -->
    <!-- 3. EXPERIENCE DESIGN SECTION (Standalone) -->
    <!-- ========================================== -->
    <div class="reveal-section w-full flex flex-col">
      
      <!-- Left Aligned Header -->
      <div class="flex flex-col items-start text-center mb-10 md:mb-12">
        <span class="reveal-elem w-full font-serif text-lg md:text-xl text-[#C47551] italic mb-1">{{ servicesData.experienceDesign.header.subtitle }}</span>
        <h2 class="reveal-elem w-full text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.15] text-[#703e19] mb-4 font-serif font-light">
          {{ servicesData.experienceDesign.header.titleMain }} <span class="font-normal text-[#C47551] italic capitalize">{{ servicesData.experienceDesign.header.titleHighlight }}.</span>
        </h2>
      </div>

      <!-- Content Area -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        <!-- Mobile: Image moves above content -->
        <div class="reveal-elem lg:col-span-5 w-full lg:sticky top-28 order-1 flex justify-center lg:justify-normal lg:order-2">
          <div class="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#1A1A1A]/10">
            <img
              :src="servicesData.experienceDesign.content.image"
              alt="Experience Design"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Content (Left side on Desktop) -->
        <div class="reveal-elem lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          
          <p class="font-sans text-sm md:text-base lg:text-[15px] leading-[1.85] text-[#1A1A1A]/85 font-light mb-10 max-w-2xl">
            {{ servicesData.experienceDesign.content.paragraph }}
          </p>

          <!-- Features List -->
          <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#703e19] mb-4">Core Philosophy</h4>
          <ul class="flex flex-col gap-4 mb-10">
            <li v-for="(feat, i) in servicesData.experienceDesign.content.features" :key="'ed-feat-'+i" class="flex items-start gap-3.5">
              <div class="w-4 h-4 rounded-full bg-[#703e19]/10 flex items-center justify-center shrink-0 mt-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 h-2.5 text-[#703e19]"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-[1.7]">{{ feat }}</span>
            </li>
          </ul>

          <!-- My Experience List -->
          <h4 class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#703e19] mb-4">The Designer Edge</h4>
          <ul class="flex flex-col gap-4">
            <li v-for="(exp, i) in servicesData.experienceDesign.content.experience" :key="'ed-exp-'+i" class="flex items-start gap-3.5">
              <div class="w-4 h-4 flex items-center justify-center shrink-0 mt-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#C47551]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <span class="font-sans text-sm md:text-[15px] text-[#1A1A1A]/80 font-light leading-[1.7]">{{ exp }}</span>
            </li>
          </ul>

        </div>

      </div>
    </div>

  </section>
</template>

<style scoped>
/* Vue Transitions for Tab Switching */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>