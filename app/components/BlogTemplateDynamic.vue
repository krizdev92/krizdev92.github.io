<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  post: { type: Object, required: true }
})

const containerRef = ref(null)

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.utils.toArray('.dynamic-block').forEach((block) => {
    gsap.fromTo(block, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: block, start: 'top 85%', once: true } }
    )
  })
})
</script>

<template>
  <article ref="containerRef" class="w-full bg-[#F9F8F6] pt-32 pb-24 px-6 sm:px-10 md:px-16 lg:px-24">
    
    <!-- ================= HEADER SECTION ================= -->
    <div class="max-w-[90rem] mx-auto flex flex-col mb-12 lg:mb-16">
      <nav class="flex items-center gap-2 font-sans text-[10px] md:text-xs tracking-widest text-[#1A1A1A]/50 uppercase mb-8">
        <template v-for="(crumb, idx) in post.header.breadcrumbs" :key="idx">
          <span class="hover:text-[#703e19] transition-colors cursor-pointer">{{ crumb }}</span>
          <span v-if="idx < post.header.breadcrumbs.length - 1">/</span>
        </template>
      </nav>

      <div class="flex flex-col items-start max-w-4xl w-full">
        <h3 class="flex items-center gap-4 mb-4 text-[10px] lg:text-[11px] font-sans tracking-[0.3em] text-[#C47551] uppercase">
          <span class="w-12 h-[1px] bg-[#C47551]/50"></span>
          <span>{{ post.header.eyebrow }}</span>
        </h3>
        
        <h1 class="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-8">
          <span class="text-[#703e19] font-normal">{{ post.header.titleMain }}&nbsp;</span>
          <span class="text-[#C47551] italic font-light">{{ post.header.titleHighlight }}</span>
        </h1>
        
        <!-- Meta & Share Row -->
        <div class="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#1A1A1A]/10 pt-6">
          <span class="font-sans text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-bold">
            Published &mdash; {{ post.header.date }}
          </span>

          <!-- Share Actions -->
          <div class="flex items-center gap-3">
            <span class="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-bold mr-2">Share</span>
            
            <button aria-label="Share on WhatsApp" class="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#25D366] hover:border-transparent hover:text-white transition-all text-[#1A1A1A]">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
            <button aria-label="Share Link" class="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#703e19] hover:border-transparent hover:text-white transition-all text-[#1A1A1A]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Cover Image -->
    <div class="max-w-[90rem] mx-auto w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl mb-16 lg:mb-24 relative">
      <img :src="post.header.coverImg" class="w-full h-full object-cover" />
    </div>

    <!-- ================= BODY & TOC GRID ================= -->
    <div class="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      
      <!-- STICKY TABLE OF CONTENTS -->
      <aside v-if="post.toc && post.toc.length" class="hidden lg:flex lg:col-span-3 flex-col sticky top-32 self-start z-20">
        <h4 class="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-6">In This Story</h4>
        <ul class="flex flex-col gap-4 border-l border-[#1A1A1A]/10 pl-5 relative">
          <li v-for="item in post.toc" :key="item.id">
            <button @click="scrollToSection(item.id)" class="font-serif text-[17px] text-[#1A1A1A]/60 hover:text-[#703e19] transition-colors text-left outline-none">
              {{ item.label }}
            </button>
          </li>
        </ul>
      </aside>

      <!-- DYNAMIC CONTENT BLOCKS -->
      <div class="w-full" :class="post.toc && post.toc.length ? 'lg:col-span-9 lg:col-start-4' : 'lg:col-span-12 lg:col-start-1'">
        
        <div v-for="(block, idx) in post.contentBlocks" :key="idx" :id="block.sectionId" class="dynamic-block mb-4 md:mb-6 w-full flex flex-col">
          
          <!-- 0. EDITORIAL PARAGRAPH -->
          <p v-if="block.type === 'paragraph-editorial'" class="font-sans text-[15px] md:text-[17px] text-[#1A1A1A]/85 leading-[1.95] font-light" :class="{'first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-serif first-letter:text-[#703e19] first-letter:mt-1': block.dropCap}">
            {{ block.text }}
          </p>

          <!-- 1. NORMAL PARAGRAPH -->
          <p v-if="block.type === 'paragraph-normal'" class="indent-4 font-sans text-[15px] md:text-[17px] text-[#1A1A1A]/85 leading-[1.95] font-light">
            {{ block.text }}
          </p>

          <!-- 2. STANDALONE SUBTITLE -->
          <h2 v-else-if="block.type === 'subtitle'" class="font-serif text-3xl md:text-4xl text-[#703e19] font-normal my-4 tracking-tight">
            {{ block.text }}
          </h2>

          <!-- 3. MULTI-COLUMN TEXT -->
          <div v-else-if="block.type === 'multi-column'" class="columns-1 md:columns-2 gap-10 font-sans text-[14.5px] md:text-[15.5px] text-[#1A1A1A]/85 leading-[1.9] font-light">
            {{ block.text }}
          </div>

          <!-- 4. FULL WIDTH IMAGE -->
          <div v-else-if="block.type === 'full-image'" class="w-full rounded-3xl overflow-hidden aspect-[16/10] my-4 shadow-md">
            <img :src="block.img" class="w-full h-full object-cover" />
          </div>

          <!-- 5. THUMBNAIL SLIDER (Supports Autoplay) -->
          <BlogThumbnailSlider v-else-if="block.type === 'slider'" :images="block.images" :autoplay="block.autoplay" class="my-6" />

          <!-- 6. TRUE 1:1 MASONRY GRID (4x7, 4x3, 4x4) -->
          <div v-else-if="block.type === 'masonry'" class="w-full relative max-w-3xl flex justify-items-center mx-auto aspect-[8/7]">
            <div class="masonry-container w-full flex gap-3 md:gap-4 my-6">
                <!-- Left Side (Split vertically into exact 4/7 and 3/7 ratios to mimic 4x3 and 4x5) -->
                <div class="w-1/2 h-full flex flex-col gap-3 md:gap-4">
                  <div class="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm" style="flex: 4;">
                    <img :src="block.images[0]" class="w-full h-full object-cover" />
                  </div>
                  <div class="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm" style="flex: 3;">
                    <img :src="block.images[1]" class="w-full h-full object-cover" />
                  </div>
                </div>
                <!-- Right Side (Split vertically into exact 3/7 and 5/7 ratios to mimic 4x3 and 4x5) -->
                <div class="w-1/2 h-full flex flex-col gap-3 md:gap-4">
                  <div class="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm" style="flex: 3;">
                    <img :src="block.images[2]" class="w-full h-full object-cover" />
                  </div>
                  <div class="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm" style="flex: 4;">
                    <img :src="block.images[3]" class="w-full h-full object-cover" />
                  </div>
                </div>
            </div>
          </div>

          <!-- 7. YOUTUBE VIDEO -->
          <div v-else-if="block.type === 'youtube'" class="w-full aspect-video rounded-3xl overflow-hidden shadow-xl bg-black my-6 relative">
            <iframe :src="`https://www.youtube.com/embed/${block.videoId}?modestbranding=1&rel=0`" class="absolute inset-0 w-full h-full border-0" allowfullscreen></iframe>
          </div>

          <!-- 8. UNORDERED LIST (Escaping Checkmark) -->
          <div v-else-if="block.type === 'list-unordered'" class="flex flex-col gap-4 my-4">
            <h3 v-if="block.title" class="font-serif text-2xl text-[#703e19] mb-2">{{ block.title }}</h3>
            <ul class="flex flex-col gap-3">
              <li v-for="(item, i) in block.items" :key="i" class="flex items-start gap-4">
                <!-- Outer circle radius 8, checkmark path breaks out to x=20 -->
                <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-[#C47551] shrink-0 mt-0.5">
                  <circle cx="10" cy="12" r="8" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
                  <path d="M6 12l4 4 10-11" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="font-sans text-base text-[#1A1A1A]/85 font-light leading-relaxed">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 9. REGULAR ORDERED LIST -->
          <div v-else-if="block.type === 'list-ordered-regular'" class="flex flex-col gap-4 my-4 pl-2 md:pl-6">
            <h3 v-if="block.title" class="font-serif text-2xl text-[#703e19] mb-2">{{ block.title }}</h3>
            <ol class="list-decimal list-outside flex flex-col gap-3 font-sans text-base md:text-[17px] text-[#1A1A1A]/85 font-light marker:text-[#C47551] marker:font-bold">
              <li v-for="(item, i) in block.items" :key="i" class="pl-2 leading-[1.8]">{{ item }}</li>
            </ol>
          </div>

          <!-- 10. DECORATED ORDERED LIST -->
          <div v-else-if="block.type === 'list-ordered'" class="flex flex-col gap-6 my-4">
            <h3 v-if="block.title" class="font-serif text-2xl text-[#703e19] mb-2">{{ block.title }}</h3>
            <div v-for="(item, i) in block.items" :key="i" class="flex gap-5 items-start bg-white p-5 md:p-6 rounded-2xl border border-[#1A1A1A]/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <span class="font-serif text-4xl text-[#703e19]/20 font-bold shrink-0 leading-none">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="flex flex-col gap-1">
                <h4 class="font-serif text-lg text-[#1A1A1A] font-medium">{{ item.title }}</h4>
                <p class="font-sans text-[15px] text-[#1A1A1A]/70 font-light leading-relaxed">{{ item.text }}</p>
              </div>
            </div>
          </div>

          <!-- 11. STATEMENT QUOTE TYPE A (Central) -->
          <div v-else-if="block.type === 'quote-a'" class="flex flex-col items-center text-center px-4 md:px-12 py-10 my-8">
            <span class="text-[#703e19]/20 font-serif text-8xl leading-none h-12">"</span>
            <p class="font-serif text-2xl md:text-3xl lg:text-4xl text-[#703e19] italic leading-[1.5] font-light mb-6 tracking-wide">
              {{ block.text }}
            </p>
            <span v-if="block.author" class="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#C47551]">&mdash; {{ block.author }}</span>
          </div>

          <!-- 12. STATEMENT QUOTE TYPE B (Split) -->
          <div v-else-if="block.type === 'quote-b'" class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 my-10 bg-white rounded-3xl overflow-hidden shadow-sm border border-[#1A1A1A]/5">
            <div class="p-8 md:p-12 flex flex-col justify-center">
              <span class="text-[#703e19]/30 font-serif text-6xl leading-none h-8">"</span>
              <p class="font-serif text-xl md:text-2xl text-[#703e19] font-medium leading-[1.6] mb-4">{{ block.text }}</p>
              <span class="font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold">&mdash; {{ block.author }}</span>
            </div>
            <div class="relative w-full h-[300px] md:h-full">
              <img :src="block.img" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
            </div>
          </div>

          <!-- 13. AUTHOR'S TIP BOX -->
          <div v-else-if="block.type === 'tip-box'" class="bg-[#F2EFE9] p-8 md:p-10 rounded-3xl border-l-4 border-[#C47551] flex flex-col gap-3 my-6">
            <h4 class="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#703e19] flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              {{ block.title }}
            </h4>
            <p class="font-sans text-[15px] text-[#1A1A1A]/80 font-light leading-relaxed">{{ block.text }}</p>
          </div>

          <!-- 14. SPLIT STATIC (Text / Image) -->
          <div v-else-if="block.type === 'split-static'" class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center my-8">
            <div class="w-full aspect-square rounded-3xl overflow-hidden shadow-sm" :class="block.align === 'right' ? 'md:order-2' : ''">
              <img :src="block.img" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col gap-4" :class="block.align === 'right' ? 'md:order-1' : ''">
              <h3 v-if="block.title" class="font-serif text-2xl text-[#703e19] font-medium">{{ block.title }}</h3>
              <p class="font-sans text-[15px] md:text-base text-[#1A1A1A]/80 font-light leading-[1.8]">{{ block.text }}</p>
            </div>
          </div>

          <!-- 15. SPLIT STICKY (Long Text / Sticky Image) -->
          <div v-else-if="block.type === 'split-sticky'" class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start my-10">
            <div class="md:col-span-5 w-full self-start md:sticky md:top-32" :class="block.align === 'right' ? 'md:order-2' : ''">
              <div class="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md border border-[#1A1A1A]/10">
                <img :src="block.img" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="md:col-span-7 flex flex-col gap-6" :class="block.align === 'right' ? 'md:order-1' : ''">
              <h3 v-if="block.title" class="font-serif text-3xl text-[#703e19] font-medium mb-2">{{ block.title }}</h3>
              <p v-for="(p, i) in block.paragraphs" :key="i" class="font-sans text-[15.5px] md:text-[16.5px] text-[#1A1A1A]/85 font-light leading-[1.9]">
                {{ p }}
              </p>
            </div>
          </div>

          <!-- 16. SPLIT STICKY LIST (Unordered List / Sticky Image) -->
          <div v-else-if="block.type === 'split-sticky-list'" class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start my-10">
            <div class="md:col-span-5 w-full self-start md:sticky md:top-32" :class="block.align === 'right' ? 'md:order-2' : ''">
              <div class="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md border border-[#1A1A1A]/10">
                <img :src="block.img" class="w-full h-full object-cover" />
              </div>
            </div>
            <div class="md:col-span-7 flex flex-col gap-4" :class="block.align === 'right' ? 'md:order-1' : ''">
              <h3 v-if="block.title" class="font-serif text-3xl text-[#703e19] font-medium mb-4">{{ block.title }}</h3>
              <ul class="flex flex-col gap-4">
                <li v-for="(item, i) in block.items" :key="i" class="flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-[#C47551] shrink-0 mt-0.5">
                    <circle cx="10" cy="12" r="8" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
                    <path d="M6 12l4 4 10-11" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="font-sans text-[15.5px] text-[#1A1A1A]/85 font-light leading-[1.7]">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 17. INLINE CTA CARD -->
          <div v-else-if="block.type === 'cta'" class="w-full bg-[#703e19] text-[#F9F8F6] p-10 md:p-14 rounded-3xl shadow-xl flex flex-col items-center text-center gap-6 my-10 relative overflow-hidden group">
            <svg class="absolute top-0 right-0 w-32 h-32 text-white/5 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.2L18.4 19H5.6L12 6.2z"/></svg>
            <h3 class="font-serif text-3xl md:text-4xl italic font-light relative z-10">{{ block.title }}</h3>
            <p class="font-sans text-sm md:text-base opacity-80 max-w-xl font-light relative z-10">{{ block.text }}</p>
            <NuxtLink :to="block.link" class="mt-2 bg-[#F9F8F6] text-[#703e19] px-8 py-3.5 rounded-lg font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#C47551] hover:text-white transition-colors relative z-10 shadow-lg">
              {{ block.btnText }}
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>
  </article>
</template>