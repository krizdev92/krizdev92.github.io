<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  data: { type: Object, default: () => ({}) }
})

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

// Default Payload Structure
const defaultData = {
  eyebrow: 'Direct Access',
  titleMain: 'Reach Our',
  titleHighlight: 'Concierge',
  paragraph: 'Whether you wish to initiate a new bespoke route, inquire about private estate buyouts, or simply speak about your travel style—we are here to listen.',
  image: '/images/home/itin-2.jpg',
  imageAlt: 'Sreejith Travel Sanctuary Concierge',
  hours: {
    days: 'Monday – Sunday',
    time: '09:00 AM – 09:00 PM IST',
    note: '24/7 active route support for travelers on the ground.'
  },
  cards: [
    {
      id: 'phone',
      title: 'Direct Call / WhatsApp',
      value: '+91 99433 60478',
      actionUrl: 'https://wa.me/919943360478',
      actionLabel: 'Message On WhatsApp',
      icon: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.7 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`
    },
    {
      id: 'email',
      title: 'Electronic Mail',
      value: 'concierge@sreejithtravel.com',
      actionUrl: 'mailto:concierge@sreejithtravel.com',
      actionLabel: 'Send An Email',
      icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
    },
    {
      id: 'address',
      title: 'Private Sanctuary HQ',
      value: 'Malabar Heritage Estate, Fort Kochi, Kerala 682001, India',
      actionUrl: 'https://maps.google.com',
      actionLabel: 'Open In Google Maps',
      icon: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`
    }
  ]
}

const activePayload = computed(() => ({
  eyebrow: props.data?.eyebrow || defaultData.eyebrow,
  titleMain: props.data?.titleMain || defaultData.titleMain,
  titleHighlight: props.data?.titleHighlight || defaultData.titleHighlight,
  paragraph: props.data?.paragraph || defaultData.paragraph,
  image: props.data?.image || defaultData.image,
  imageAlt: props.data?.imageAlt || defaultData.imageAlt,
  hours: props.data?.hours || defaultData.hours,
  cards: props.data?.cards?.length ? props.data.cards : defaultData.cards
}))

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.set('.contact-reveal', { y: 25, opacity: 0 })

  const playAnimations = () => {
    gsap.to('.contact-reveal', {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.9,
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
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-8 flex flex-col relative mx-auto">
    
    <!-- MAIN SPLIT GRID -->
    <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      <!-- LEFT COLUMN: Intro, Cards & Working Hours (7 Cols) -->
      <div class="lg:col-span-7 flex flex-col items-start text-left">
        
        <!-- Eyebrow & Titles -->
        <h3 class="contact-reveal flex items-center gap-4 mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ activePayload.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>

        <h2 class="contact-reveal text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-5 font-serif font-light">
          {{ activePayload.titleMain }} <span class="text-[#C47551] italic font-normal capitalize">{{ activePayload.titleHighlight }}</span>
        </h2>

        <p class="contact-reveal font-sans text-sm md:text-base lg:text-[15px] leading-[1.85] text-[#1A1A1A]/85 font-light mb-8 md:mb-10 max-w-2xl">
          {{ activePayload.paragraph }}
        </p>

        <!-- 3 CONTACT CARDS -->
        <div class="w-full flex flex-col gap-4 mb-8 md:mb-10">
          <div
            v-for="card in activePayload.cards"
            :key="card.id"
            class="contact-reveal w-full bg-white rounded-2xl p-5 sm:p-6 border border-[#1A1A1A]/10 hover:border-[#703e19]/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(112,62,25,0.08)] transition-all duration-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div class="flex items-start sm:items-center gap-4">
              <!-- Icon Container -->
              <div class="w-10 h-10 rounded-xl bg-[#703e19]/10 group-hover:bg-[#703e19] text-[#703e19] group-hover:text-[#F9F8F6] flex items-center justify-center shrink-0 transition-colors duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5"
                  v-html="card.icon"
                ></svg>
              </div>

              <!-- Content -->
              <div class="flex flex-col">
                <span class="text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#703e19]/70 mb-0.5">
                  {{ card.title }}
                </span>
                <!-- Clickable value for direct actions -->
                <a 
                  v-if="card.id === 'phone'"
                  :href="`tel:${card.value.replace(/\s+/g, '')}`" 
                  class="font-serif text-base sm:text-lg text-[#1A1A1A] font-medium leading-snug hover:text-[#703e19] transition-colors"
                >
                  {{ card.value }}
                </a>
                <a 
                  v-else-if="card.id === 'email'"
                  :href="`mailto:${card.value}`" 
                  class="font-serif text-base sm:text-lg text-[#1A1A1A] font-medium leading-snug hover:text-[#703e19] transition-colors"
                >
                  {{ card.value }}
                </a>
                <span v-else class="font-serif text-base sm:text-lg text-[#1A1A1A] font-medium leading-snug">
                  {{ card.value }}
                </span>
              </div>
            </div>

            <!-- Direct Action Button -->
            <a
              :href="card.id === 'phone' ? `tel:${card.value.replace(/\s+/g, '')}` : (card.id === 'email' ? `mailto:${card.value}` : card.actionUrl)"
              :target="card.id === 'address' ? '_blank' : '_self'"
              :rel="card.id === 'address' ? 'noopener noreferrer' : undefined"
              class="self-start sm:self-auto px-4 py-2.5 rounded-xl border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#703e19] hover:text-[#F9F8F6] hover:border-[#703e19] text-[11px] font-sans font-bold uppercase tracking-wider transition-all duration-300 shrink-0 inline-flex items-center gap-2"
            >
              <span>{{ card.id === 'phone' ? 'Call Us' : card.actionLabel }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>
        </div>

        <!-- WORKING HOURS BLOCK -->
        <div class="contact-reveal w-full bg-[#FAF9F5] rounded-2xl p-6 border border-[#703e19]/20 flex flex-col gap-3 relative overflow-hidden">
          <div class="flex items-center gap-3">
            <!-- Updated dot to brand color #703e19 -->
            <span class="w-2.5 h-2.5 rounded-full bg-[#703e19] animate-pulse"></span>
            <h4 class="font-serif text-lg text-[#703e19] font-medium">Concierge Hours</h4>
          </div>
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 font-sans text-sm text-[#1A1A1A]/85 border-t border-[#1A1A1A]/10 pt-3">
            <span class="font-medium">{{ activePayload.hours.days }}</span>
            <!-- Replaced font-mono with standard font-sans -->
            <span class="font-sans text-xs md:text-sm text-[#703e19] font-semibold tracking-wide">{{ activePayload.hours.time }}</span>
          </div>

          <p class="font-sans text-xs text-[#1A1A1A]/60 font-light italic">
            {{ activePayload.hours.note }}
          </p>
        </div>

      </div>

      <!-- RIGHT COLUMN: Visual Aspect Card (5 Cols) -->
      <div class="lg:col-span-5 contact-reveal flex justify-center w-full sticky top-28">
        <div class="relative w-full max-w-lg lg:w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#1A1A1A]/10 group">
          <!-- Image -->
          <img
            :src="activePayload.image"
            :alt="activePayload.imageAlt"
            class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          <!-- Subtle Corner Floating Badge -->
          <div class="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#F9F8F6] flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-[#703e19] text-[#F9F8F6] flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="flex flex-col">
              <span class="font-serif text-base font-medium leading-tight">Personalized Care</span>
              <span class="font-sans text-xs text-[#F9F8F6]/80 font-light mt-0.5">Every inquiry is reviewed directly by our founders.</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>