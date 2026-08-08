<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  data: { type: Object, default: () => ({}) }
})

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

const defaultData = {
  lastUpdated: 'August 2026',
  intro: {
    eyebrow: 'Data Stewardship',
    titleMain: 'Privacy',
    titleHighlight: 'Policy',
    paragraph: 'Your trust is the foundation of our journeys. We collect and handle your personal data with absolute discretion, ensuring your digital privacy is as respected as your physical space.'
  },
  sections: [
    {
      id: 'collection',
      eyebrow: 'Information We Collect',
      titleMain: 'Data Collection &',
      titleHighlight: 'Scope',
      paragraph: 'To craft bespoke itineraries and coordinate seamless transfers, we collect essential personal details directly provided by you during inquiry, booking, or consultation.',
      items: [
        { id: 1, title: 'Personal Identifiers', text: 'Full legal names, contact numbers, email addresses, and passport details required for sanctuary permits and private stays.' },
        { id: 2, title: 'Travel Preferences', text: 'Dietary requirements, accessibility needs, health considerations, and personal pace choices to tailor your route.' },
        { id: 3, title: 'Financial Records', text: 'Secure transaction logs and billing details processed through encrypted channels.' }
      ]
    },
    {
      id: 'usage',
      eyebrow: 'Purpose & Application',
      titleMain: 'How We Use Your',
      titleHighlight: 'Information',
      paragraph: 'Every piece of data gathered serves a singular purpose: ensuring your safety, comfort, and personalized experience throughout your journey.',
      items: [
        { id: 1, title: 'Itinerary Coordination', text: 'Sharing necessary credentials with trusted regional hosts, drivers, and boutique properties.' },
        { id: 2, title: 'Concierge Support', text: 'Maintaining active communication channels for real-time adjustments and 24/7 assistance on the ground.' },
        { id: 3, title: 'Regulatory Compliance', text: 'Fulfilling local forestry, government, and sanctuary entry requirements across protected routes.' }
      ]
    },
    {
      id: 'protection',
      eyebrow: 'Security & Integrity',
      titleMain: 'Data Protection &',
      titleHighlight: 'Sharing',
      paragraph: 'We maintain strict administrative and technical safeguards to prevent unauthorized access, alteration, or disclosure of your information.',
      items: [
        { id: 1, title: 'Zero Commercial Sale', text: 'We never sell, rent, or trade your personal information to third-party advertisers or marketers.' },
        { id: 2, title: 'Encrypted Storage', text: 'Digital records are stored on secure servers with restricted access limited strictly to your personal concierge team.' },
        { id: 3, title: 'Trusted Network', text: 'Information shared with local operators is strictly limited to operational necessities for your journey.' }
      ]
    },
    {
      id: 'rights',
      eyebrow: 'Your Controls',
      titleMain: 'Your Choices &',
      titleHighlight: 'Rights',
      paragraph: 'You maintain complete ownership of your personal data and may exercise your privacy rights at any time before or after your travel.',
      items: [
        { id: 1, title: 'Access & Portability', text: 'Request a full copy of all personal records maintained in our systems.' },
        { id: 2, title: 'Rectification & Erasure', text: 'Update inaccurate information or request complete deletion of your records post-journey.' }
      ]
    }
  ]
}

const active = computed(() => ({
  lastUpdated: props.data?.lastUpdated || defaultData.lastUpdated,
  intro: props.data?.intro || defaultData.intro,
  sections: props.data?.sections?.length ? props.data.sections : defaultData.sections
}))

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.reveal-elem', { y: 25, opacity: 0 })

  const playAnimations = () => {
    const textBlocks = gsap.utils.toArray('.text-block')
    textBlocks.forEach((block) => {
      const elems = block.querySelectorAll('.reveal-elem')
      gsap.to(elems, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          once: true
        }
      })
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
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 pt-4 md:pt-6 pb-8 md:pb-16 flex flex-col relative gap-8 lg:gap-12 mx-auto">
    
    <div class="w-full flex flex-col gap-10 md:gap-14">
      
      <!-- Main Intro Block -->
      <div class="text-block flex flex-col items-start text-left">
        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ active.intro.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
          <span class="text-[#703e19]/80 font-medium">Effective: {{ active.lastUpdated }}</span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-5 font-serif font-light">
          {{ active.intro.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ active.intro.titleHighlight }}</span>
        </h2>
        <p class="reveal-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.9] text-[#1A1A1A] font-light max-w-4xl">
          {{ active.intro.paragraph }}
        </p>
      </div>

      <!-- Policy Content Sections -->
      <div 
        v-for="section in active.sections" 
        :key="section.id" 
        :id="section.id"
        class="text-block flex flex-col items-start text-left"
      >
        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ section.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-4 font-serif font-light">
          {{ section.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ section.titleHighlight }}</span>
        </h2>
        
        <p v-if="section.paragraph" class="reveal-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.9] text-[#1A1A1A] font-light mb-6">
          {{ section.paragraph }}
        </p>

        <ul v-if="section.items?.length" class="w-full flex flex-col gap-6">
          <li v-for="item in section.items" :key="item.id" class="reveal-elem flex items-start gap-4">
            <span class="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#703e19]/10 flex items-center justify-center text-[#703e19]">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            </span>
            <div class="flex flex-col">
              <h4 class="font-serif text-[17px] text-[#703e19] font-medium">{{ item.title }}</h4>
              <p class="font-sans text-[14px] lg:text-[15px] text-[#1A1A1A] font-light leading-[1.8] mt-1">{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>

    </div>

  </section>
</template>