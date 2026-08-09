<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  post: {
    type: Object,
    default: () => ({
      title: 'Tracking the Elusive Snow Leopard in Spiti Valley',
      subtitle: 'A high-altitude journey into the freezing deserts of the Himalayas in search of the ghost of the mountains.',
      date: 'August 12, 2026',
      readTime: '6 min read',
      author: {
        name: 'Sreejith Raghavan',
        role: 'Founder & Lead Designer',
        avatar: '/images/home/itin-1.jpg'
      },
      heroImg: '/images/home/itin-1.jpg',
      tags: ['#Wildlife', '#Himalayas', '#Expedition'],
      contentSections: [
        {
          type: 'paragraph',
          text: 'The air at fourteen thousand feet does not merely enter your lungs; it introduces itself with a sharp, crisp bite that reminds you of your absolute fragility. In the high-altitude cold desert of Spiti Valley, winter is not a season—it is a sovereign state of existence. For months, the passes are choked with snow, villages are cut off from the lower plains, and the mountains belong entirely to the wind, the blue sheep, and the grey ghost.'
        },
        {
          type: 'heading',
          text: 'The Silence of the High Passes'
        },
        {
          type: 'paragraph',
          text: 'Tracking leopards requires a fundamental surrender of modern pacing. You do not conquer a mountain here; you wait for it to acknowledge you. Our local guide, Tenzin, has spent forty winters scanning these jagged shale slopes. His eyes can distinguish between a wind-blown boulder and the amber-ringed gaze of a predator at eight hundred meters with terrifying precision.'
        },
        {
          type: 'quote',
          text: 'In the realm of the snow leopard, silence is not an absence of sound; it is the primary language of survival.'
        },
        {
          type: 'paragraph',
          text: 'Days blend together in a meditative rhythm of dawn scans with high-powered spotting scopes, steaming cups of butter tea shared in stone-walled kitchens, and long evening conversations around iron wood-stoves about ancient trade routes that once connected India to Tibet.'
        }
      ]
    })
  }
})

const containerRef = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo('.blog-fade', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.value, start: 'top 80%', once: true } }
  )
})
</script>

<template>
  <article ref="containerRef" class="w-full bg-[#F9F8F6] mt-20 pt-12 pb-20 px-6 sm:px-10 md:px-16 lg:px-24">
    
    <!-- Header Meta & Title -->
    <div class="max-w-4xl mx-auto flex flex-col items-center text-center blog-fade mb-10 md:mb-14">
      <div class="flex items-center gap-3 mb-4">
        <span v-for="tag in post.tags" :key="tag" class="text-[10px] bg-[#703e19]/10 text-[#703e19] px-2.5 py-1 rounded-md font-sans uppercase font-bold tracking-widest">
          {{ tag }}
        </span>
      </div>

      <h1 class="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#703e19] font-light leading-[1.15] mb-6">
        {{ post.title }}
      </h1>

      <p class="font-sans text-base md:text-lg text-[#1A1A1A]/80 font-light leading-relaxed max-w-2xl mb-8">
        {{ post.subtitle }}
      </p>

      <!-- Author Bar -->
      <div class="flex items-center gap-4 pt-6 border-t border-[#1A1A1A]/10 w-full justify-center">
        <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#703e19]/20">
          <img :src="post.author.avatar" :alt="post.author.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col text-left">
          <span class="font-serif text-base text-[#703e19] font-medium">{{ post.author.name }}</span>
          <span class="font-sans text-xs text-[#1A1A1A]/60">{{ post.date }} &bull; {{ post.readTime }}</span>
        </div>
      </div>
    </div>

    <!-- Cinematic Hero Image -->
    <div class="max-w-6xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mb-14 md:mb-20 blog-fade">
      <img :src="post.heroImg" :alt="post.title" class="w-full h-full object-cover" />
    </div>

    <!-- Body Content Stream -->
    <div class="max-w-3xl mx-auto flex flex-col gap-8 blog-fade">
      <template v-for="(section, idx) in post.contentSections" :key="idx">
        
        <p v-if="section.type === 'paragraph'" class="font-sans text-base md:text-[17px] text-[#1A1A1A]/90 font-light leading-[1.9]">
          {{ section.text }}
        </p>

        <h2 v-else-if="section.type === 'heading'" class="font-serif text-2xl md:text-3xl text-[#703e19] font-medium mt-6 mb-2">
          {{ section.text }}
        </h2>

        <div v-else-if="section.type === 'quote'" class="my-8 p-8 md:p-10 rounded-2xl bg-white border-l-4 border-[#703e19] shadow-sm">
          <p class="font-serif text-xl md:text-2xl text-[#703e19] italic leading-relaxed">
            "{{ section.text }}"
          </p>
        </div>

      </template>
    </div>

  </article>
</template>