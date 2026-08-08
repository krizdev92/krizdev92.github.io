<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'swiper/css'
import 'swiper/css/effect-fade'

const props = defineProps({
  data: { type: Object, default: () => ({}) }
})

const isLoaderFinished = useLoaderState()
const mainContainerRef = ref(null)

// Default Fallback Payload Structure
const defaultData = {
  slideshowImages: [
    '/images/home/itin-1.jpg',
    '/images/home/itin-2.jpg',
    '/images/home/itin-3.jpg'
  ],
  whyPath: {
    eyebrow: 'My Origin',
    titleMain: 'Why I Chose This',
    titleHighlight: 'Path',
    paragraph: 'Commercial tourism often strips places of their soul, turning rich heritage into mere photo opportunities. I chose this path to build something deliberate and restorative—a bridge between conscious travelers and the keepers of ancient traditions.'
  },
  philosophy: {
    eyebrow: 'Core Values',
    titleMain: 'My',
    titleHighlight: 'Philosophy',
    items: [
      { id: 1, title: 'Slowness Over Speed', text: 'We prioritize deep immersion over ticking off destinations.' },
      { id: 2, title: 'Authentic Reciprocity', text: 'Journeys must directly empower local hosts and ecological stewards.' },
      { id: 3, title: 'Cultural Reverence', text: 'Approaching every sacred space and custom with humility and curiosity.' }
    ]
  },
  whyChooseMe: {
    eyebrow: 'Difference',
    titleMain: 'Why',
    titleHighlight: 'Choose',
    titleEnd: 'Me',
    items: [
      { id: 1, title: 'Hyper-Local Connections', text: 'Direct access to village elders, master artisans, and hidden sanctuary stewards.' },
      { id: 2, title: 'Bespoke Curation', text: 'Every itinerary is built from ground zero, tailored to your pace and interests.' },
      { id: 3, title: 'End-to-End Care', text: 'Personal oversight from initial alignment to your final departure home.' }
    ]
  },
  howIDesign: {
    eyebrow: 'Methodology',
    titleMain: 'How I',
    titleHighlight: 'Design',
    steps: [
        {
            num: '01',
            title: 'Discover',
            tagline: 'Initial Alignment',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
            desc: 'We begin by listening to your travel dreams, pace preferences, and core expectations, establishing a shared vision for your upcoming journey.'
        },
        {
            num: '02',
            title: 'Decode',
            tagline: 'Uncovering Nuance',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>`,
            desc: 'We analyze your personal travel style and unspoken desires, translating raw ideas into a structured narrative tailored strictly to you.'
        },
        {
            num: '03',
            title: 'Research',
            tagline: 'Local Intelligence',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.3-6.4 2.1 2-6.3z"/></svg>`,
            desc: 'Our boots-on-the-ground regional experts identify hidden pathways, authentic encounters, and seasonal gems unavailable on public channels.'
        },
        {
            num: '04',
            title: 'Design',
            tagline: 'Architecting Route',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/></svg>`,
            desc: 'We draft a balanced day-by-day blueprint, harmonizing immersive cultural experiences with ample breathing room and luxury stays.'
        },
        {
            num: '05',
            title: 'Refine',
            tagline: 'Collaborative Polish',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
            desc: 'Together, we review every single detail, tweaking pacing, dining options, and private transfers until the itinerary feels entirely seamless.'
        },
        {
            num: '06',
            title: 'Connect',
            tagline: 'Human Synergy',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            desc: 'We brief our trusted local hosts, private drivers, and specialist guides to ensure every transition on the ground is warm and effortless.'
        },
        {
            num: '07',
            title: 'Deliver',
            tagline: 'Unfolding Journey',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
            desc: 'Your bespoke journey comes alive with 24/7 concierge support, allowing you to completely immerse yourself in every unscripted moment.'
        }
    ]
  },
  beyondTravel: {
    eyebrow: 'Impact',
    titleMain: 'Beyond',
    titleHighlight: 'Travel',
    items: [
      { id: 1, title: 'Direct Artisan Support', text: '80% of trip expenditures directly enter regional micro-economies.' },
      { id: 2, title: 'Zero-Single-Use Plastics', text: 'Rigorous plastic-free supply chains across all expedition routes.' },
      { id: 3, title: 'Ecological Restoration', text: 'Active native tree planting for every traveler welcomed.' }
    ]
  }
}

// Deep computed merge to ensure fallbacks are always present
const active = computed(() => {
  return {
    slideshowImages: props.data?.slideshowImages?.length ? props.data.slideshowImages : defaultData.slideshowImages,
    whyPath: props.data?.whyPath || defaultData.whyPath,
    philosophy: props.data?.philosophy || defaultData.philosophy,
    whyChooseMe: props.data?.whyChooseMe || defaultData.whyChooseMe,
    howIDesign: props.data?.howIDesign || defaultData.howIDesign,
    beyondTravel: props.data?.beyondTravel || defaultData.beyondTravel,
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  // Set initial hidden states
  gsap.set('.reveal-elem', { y: 25, opacity: 0 })
  gsap.set('.design-card', { y: 30, opacity: 0 })

  const playAnimations = () => {
    // Reveal text blocks sequentially on scroll
    const sections = gsap.utils.toArray('.text-block')
    
    sections.forEach((section) => {
      const elems = section.querySelectorAll('.reveal-elem')
      gsap.to(elems, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true
        }
      })
    })

    // Reveal How I Design Cards
    gsap.to('.design-card', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#how-i-design-grid',
        start: 'top 85%',
        once: true
      }
    })
  }

  if (isLoaderFinished.value) {
    playAnimations()
  } else {
    const unwatch = watch(isLoaderFinished, (finished) => {
      if (finished) { playAnimations(); unwatch() }
    })
  }
})
</script>

<template>
  <section ref="mainContainerRef" class="w-full bg-[#F9F8F6] px-6 sm:px-10 md:px-16 lg:px-24 py-4 md:py-6 flex flex-col lg:flex-row relative gap-12 lg:gap-16">
    
    <!-- ================= MOBILE / TABLET SLIDESHOW (< 1024px) ================= -->
    <div class="block lg:hidden w-full sm:max-w-md md:max-w-xl mx-auto aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative mb-4">
      <Swiper
        :modules="[Autoplay, EffectFade]"
        effect="fade"
        :fadeEffect="{ crossFade: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :loop="true"
        :allowTouchMove="false"
        class="absolute inset-0 w-full h-full"
      >
        <SwiperSlide v-for="(img, i) in active.slideshowImages" :key="`mob-img-${i}`">
          <img :src="img" alt="Gallery" class="w-full h-full object-cover swiper-cinematic-img" />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- ================= SCROLLING TEXT CONTENT ================= -->
    <div class="w-full lg:w-[60%] flex flex-col gap-10 md:gap-14">
      
      <!-- 1. Why I Chose This Path -->
      <div class="text-block flex flex-col items-start text-left">
        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ active.whyPath.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-5 font-serif font-light">
          {{ active.whyPath.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ active.whyPath.titleHighlight }}</span>
        </h2>
        <p class="reveal-elem font-sans text-sm md:text-base lg:text-[15px] leading-[1.9] text-[#1A1A1A] font-light">
          {{ active.whyPath.paragraph }}
        </p>
      </div>

      <!-- 2. My Philosophy -->
      <div class="text-block flex flex-col items-start text-left">
        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ active.philosophy.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-8 font-serif font-light">
          {{ active.philosophy.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ active.philosophy.titleHighlight }}</span>
        </h2>
        <ul class="w-full flex flex-col gap-6">
          <li v-for="item in active.philosophy.items" :key="item.id" class="reveal-elem flex items-start gap-4">
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

      <!-- 3. Why Choose Me -->
      <div class="text-block flex flex-col items-start text-left">
        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ active.whyChooseMe.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-8 font-serif font-light">
          {{ active.whyChooseMe.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ active.whyChooseMe.titleHighlight }}</span> {{ active.whyChooseMe.titleEnd }}
        </h2>
        <ul class="w-full flex flex-col gap-6">
          <li v-for="item in active.whyChooseMe.items" :key="item.id" class="reveal-elem flex items-start gap-4">
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

      <!-- 4. How I Design (Dark Cards) -->
      <div class="text-block flex flex-col items-start text-left">

        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ active.howIDesign.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-10 font-serif font-light">
          {{ active.howIDesign.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ active.howIDesign.titleHighlight }}</span>
        </h2>
        
        <!-- Dark Cards Grid -->
        <div id="how-i-design-grid" class="w-full grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
          <div 
            v-for="step in active.howIDesign.steps" 
            :key="step.num"
            class="design-card bg-gradient-to-br from-[#301916] to-[#2a1510] rounded-xl p-6 md:p-8 flex flex-col shadow-lg hover:-translate-y-1.5 transition-transform duration-300 ease-out"
          >
          
            <!-- Watermark -->
            <div class="absolute top-5 right-5 w-20 h-20 text-[#C47551]/30 pointer-events-none" v-html="step.icon"></div>

            <span class="text-[10px] text-[#C47551] font-bold font-sans text-sm md:text-base uppercase mb-2">
              {{ step.num }}
            </span>
            <h4 class="text-xl md:text-2xl font-serif text-[#F9F8F6] font-medium leading-tight">{{ step.title }}</h4>
            <span class="text-xs text-[#C47551] font-bold tracking-[0.2em] uppercase mb-1 md:mb-2 mt-1">{{ step.tagline }}</span>
            <p class="text-[13px] md:text-[14px] font-sans text-[#F9F8F6]/80 font-light leading-[1.8] mt-auto">
              {{ step.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- 5. Beyond Travel -->
      <div class="text-block flex flex-col items-start text-left">
        <h3 class="reveal-elem flex items-center gap-4 mb-1 md:mb-2 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#1A1A1A]/70 uppercase">
          <span>{{ active.beyondTravel.eyebrow }}</span>
          <span class="w-12 h-[1px] bg-[#1A1A1A]/20"></span>
        </h3>
        <h2 class="reveal-elem text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.2] text-[#703e19] mb-8 font-serif font-light">
          {{ active.beyondTravel.titleMain }} <span class="text-[#c47551] italic font-normal capitalize">{{ active.beyondTravel.titleHighlight }}</span>
        </h2>
        <ul class="w-full flex flex-col gap-6">
          <li v-for="item in active.beyondTravel.items" :key="item.id" class="reveal-elem flex items-start gap-4">
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

    <!-- ================= DESKTOP STICKY SLIDESHOW (>= 1024px) ================= -->
    <div class="hidden lg:block w-[40%] relative">
      <!-- Sticky container tied to viewport height -->
      <div class="sticky top-28 w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
        <Swiper
          :modules="[Autoplay, EffectFade]"
          effect="fade"
          :fadeEffect="{ crossFade: true }"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :loop="true"
          :allowTouchMove="false"
          class="absolute inset-0 w-full h-full"
        >
          <SwiperSlide v-for="(img, i) in active.slideshowImages" :key="`desk-img-${i}`">
            <img :src="img" alt="Gallery" class="w-full h-full object-cover swiper-cinematic-img" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Continuous smooth cinematic zoom */
.swiper-slide .swiper-cinematic-img {
  transform: scale(1);
  transition: transform 6s ease-out;
}
.swiper-slide-active .swiper-cinematic-img {
  transform: scale(1.06);
}
</style>