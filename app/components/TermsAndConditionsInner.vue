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
    eyebrow: 'Agreement & Understanding',
    titleMain: 'Terms &',
    titleHighlight: 'Conditions',
    paragraph: 'By engaging our services or confirming a handcrafted journey, you enter into a mutual understanding built on clarity, respect for regional ecosystems, and shared responsibility.'
  },
  sections: [
    {
      id: 'bookings',
      eyebrow: 'Reservations & Payments',
      titleMain: 'Booking &',
      titleHighlight: 'Confirmation',
      paragraph: 'Every itinerary is built from ground zero. Due to the exclusive nature of private boutique stays and sanctuary permits, structured payment schedules apply.',
      items: [
        { id: 1, title: 'Deposit Requirement', text: 'A 30% non-refundable deposit confirms your bespoke route and secures regional host reservations.' },
        { id: 2, title: 'Final Settlement', text: 'The remaining balance is due 45 days prior to your scheduled arrival date unless otherwise agreed in writing.' },
        { id: 3, title: 'Currency & Fees', text: 'All quotes are calculated in local currency, with international transfer charges handled by the client.' }
      ]
    },
    {
      id: 'cancellations',
      eyebrow: 'Flexibility & Changes',
      titleMain: 'Cancellations &',
      titleHighlight: 'Modifications',
      paragraph: 'We understand travel plans evolve. Adjustments are handled with maximum flexibility while honoring commitments to local hosts.',
      items: [
        { id: 1, title: 'Guest Cancellations', text: 'Written notice received 60+ days prior offers partial credit. Cancellations within 30 days are non-refundable.' },
        { id: 2, title: 'Route Adjustments', text: 'Minor itinerary modifications during travel are accommodated subject to local availability and extra operational costs.' },
        { id: 3, title: 'Force Majeure', text: 'Route shifts due to extreme weather or forest closures prioritize safety, offering alternative equivalent experiences.' }
      ]
    },
    {
      id: 'conduct',
      eyebrow: 'Ethics & Protocol',
      titleMain: 'Guest Responsibility &',
      titleHighlight: 'Reverence',
      paragraph: 'Our journeys enter delicate sacred spaces and rural communities. Guests agree to abide by ethical travel protocols.',
      items: [
        { id: 1, title: 'Cultural Respect', text: 'Adhering to dress codes, photography rules, and local customs communicated by your private guides.' },
        { id: 2, title: 'Environmental Integrity', text: 'Strict adherence to zero-single-use plastic policies and Leave No Trace principles in sanctuaries.' },
        { id: 3, title: 'Travel Insurance', text: 'Comprehensive medical, emergency evacuation, and trip cancellation insurance is mandatory for all travelers.' }
      ]
    },
    {
      id: 'liability',
      eyebrow: 'Legal Scope',
      titleMain: 'Limitation of',
      titleHighlight: 'Liability',
      paragraph: 'While end-to-end concierge oversight is provided throughout your journey, certain environmental and third-party factors fall outside direct operational control.',
      items: [
        { id: 1, title: 'Third-Party Suppliers', text: 'Transport providers, luxury resorts, and independent guides operate within established safety standards.' },
        { id: 2, title: 'Personal Belongings', text: 'Guests retain sole responsibility for personal valuables, luggage, and travel documentation.' }
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