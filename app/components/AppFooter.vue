<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline({ paused: true })

  tl.fromTo('.footer-elem', 
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out' }
  )

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      tl.play()
      observer.disconnect()
    }
  }, { threshold: 0.1 })

  if (document.querySelector('#main-footer')) {
    observer.observe(document.querySelector('#main-footer'))
  }
})
</script>

<template>
  <footer id="main-footer" class="w-full bg-[#121415] relative overflow-hidden pt-12 md:pt-16 pb-8 border-t border-[#C47552]/20 text-[#EAE6DF]">
    
    <!-- Subtle Ambient Backdrop Radial Glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,117,82,0.08)_0%,transparent_65%)] pointer-events-none"></div>

    <div class="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10 flex flex-col">
      
      <!-- ================= CENTERED TOP BRANDING BLOCK ================= -->
      <div class="flex flex-col items-center text-center max-w-xl mx-auto mb-10 md:mb-12 footer-elem">
        <!-- Logo & Subtitle -->
        <div class="mb-4 flex flex-col items-center justify-center">
          <img src="/images/sreejith-logo.png" alt="Sree Jith Travel" class="w-36 md:w-44 h-auto filter-offwhite invert" />
          <span class="text-[10px] md:text-[11px] font-sans tracking-[0.25em] text-[#C47552] uppercase font-semibold mt-2.5">
            Travel Experience Designer
          </span>
        </div>
        
        <!-- Refined Tagline / Intro Text -->
        <p class="font-sans text-xs md:text-sm leading-relaxed text-[#EAE6DF]/70 font-light mb-4">
          Meaningful journeys. Thoughtfully crafted. Deeply connected. Experience the world with authenticity, respect, and soul.
        </p>

        <!-- Accent Rule -->
        <div class="flex items-center justify-center gap-3 w-full max-w-[140px]">
          <span class="h-[1px] flex-grow bg-[#C47552]/30"></span>
          <div class="w-1.5 h-1.5 rounded-full bg-[#C47552]"></div>
          <span class="h-[1px] flex-grow bg-[#C47552]/30"></span>
        </div>
      </div>

      <!-- ================= 2-COLUMN MAIN CONTENT GRID ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-10 md:mb-12">
        
        <!-- LEFT COLUMN: Organized Navigation & Links (Span 7) -->
        <div class="lg:col-span-7 flex flex-col footer-elem">
          
          <h4 class="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C47552] font-bold mb-4">
            Explore & Assistance
          </h4>
          <div class="w-10 h-[1px] bg-[#C47552]/40 mb-6"></div>

          <!-- Structured Links Grid -->
          <ul class="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-xs font-sans tracking-wider text-[#EAE6DF] font-medium">
            <li><NuxtLink to="/" class="hover:text-[#C47552] transition-colors duration-300">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-[#C47552] transition-colors duration-300">About Us</NuxtLink></li>
            <li><NuxtLink to="/itineraries" class="hover:text-[#C47552] transition-colors duration-300">Itineraries</NuxtLink></li>
            <li><NuxtLink to="/Services" class="hover:text-[#C47552] transition-colors duration-300">Services</NuxtLink></li>
            <li><NuxtLink to="/Impact" class="hover:text-[#C47552] transition-colors duration-300">Impact</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-[#C47552] transition-colors duration-300">Blog</NuxtLink></li>
            <li><NuxtLink to="/faq" class="hover:text-[#C47552] transition-colors duration-300">Frequently Asked Questions</NuxtLink></li>
          </ul>

          <!-- Compact Contact Row Under Links -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10">
            
            <!-- Location (Static) -->
            <div class="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span class="text-xs font-sans text-[#EAE6DF]/80">Kochi, Kerala, India</span>
            </div>

            <!-- Phone (Click to Call) -->
            <a href="tel:+919943360478" class="flex items-center gap-3 group/contact transition-colors duration-300 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 transition-transform duration-300 group-hover/contact:scale-110"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span class="text-xs font-sans text-[#EAE6DF]/80 group-hover/contact:text-white transition-colors duration-300">+91 99433 60478</span>
            </a>

            <!-- Email (Click to Mail) -->
            <a href="mailto:hello@sreejithtravel.com" class="flex items-center gap-3 group/contact transition-colors duration-300 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 transition-transform duration-300 group-hover/contact:scale-110"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span class="text-xs font-sans text-[#EAE6DF]/80 group-hover/contact:text-white transition-colors duration-300">hello@sreejithtravel.com</span>
            </a>

          </div>
        </div>

        <!-- RIGHT COLUMN: Compact Plan Your Journey Card (Span 5) -->
        <div class="lg:col-span-5 flex flex-col footer-elem">
          <div class="bg-[#1A1D1E] rounded-2xl p-6 md:p-8 border border-[#C47552]/20 shadow-xl h-full flex flex-col justify-between">
            <div>
              <h4 class="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C47552] font-bold mb-1.5">Begin Your Experience</h4>
              <p class="font-serif text-lg md:text-xl text-[#EAE6DF] font-normal mb-5 leading-snug">
                Let’s shape your next bespoke journey together.
              </p>
            </div>

            <div class="w-full mt-2">
              <NuxtLink 
                to="/planyourjourney"
                class="w-full group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#C47552] text-[#f9f8f6] hover:bg-[#f9f8f6] hover:text-[#121415] transition-all duration-300 rounded-sm shadow-sm cursor-pointer"
              >
                <span class="text-[10px] font-sans tracking-[0.2em] uppercase font-bold relative z-10">Plan Your Journey</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transform rotate-45 transition-transform duration-300 group-hover:translate-x-2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>

      <!-- ================= BOTTOM BAR ================= -->
      <div class="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 footer-elem">
        
        <!-- Social Media Icons -->
        <div class="flex items-center gap-3 order-2 md:order-1">
          <a href="#" class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#EAE6DF] hover:text-white hover:bg-[#C47552] hover:border-[#C47552] transition-all duration-300" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#EAE6DF] hover:text-white hover:bg-[#C47552] hover:border-[#C47552] transition-all duration-300" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#EAE6DF] hover:text-white hover:bg-[#C47552] hover:border-[#C47552] transition-all duration-300" aria-label="Mail">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
        </div>

        <!-- Copyright Statement -->
        <p class="font-sans text-xs text-[#EAE6DF]/60 order-1 md:order-2">
          © 2026 Sree Jith Travel. All rights reserved.
        </p>

        <!-- Privacy & Terms -->
        <div class="flex items-center gap-3 text-xs text-[#EAE6DF]/60 order-3">
          <NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
          <span class="text-white/20">•</span>
          <NuxtLink to="/terms" class="hover:text-white transition-colors">Terms & Conditions</NuxtLink>
        </div>

      </div>

    </div>
  </footer>
</template>

<style scoped>
.filter-offwhite {
  filter: invert(95%) sepia(2%) saturate(1008%) hue-rotate(338deg) brightness(110%) contrast(95%);
}
</style>