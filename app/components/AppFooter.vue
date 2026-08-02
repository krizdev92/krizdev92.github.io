<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline({ paused: true })

  tl.fromTo('.footer-elem', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out' }
  )

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      tl.play()
      observer.disconnect()
    }
  }, { threshold: 0.2 })

  if (document.querySelector('#main-footer')) {
    observer.observe(document.querySelector('#main-footer'))
  }
})
</script>

<template>
  <footer id="main-footer" class="w-full bg-[#181411] relative overflow-hidden pt-24 pb-12 border-t border-[#C47552]/20">
    
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,117,82,0.08)_0%,transparent_75%)] pointer-events-none"></div>

    <div class="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 mb-24">
        
        <div class="lg:col-span-4 flex flex-col items-start footer-elem">
          <div class="flex items-center gap-5 mb-8">
            <img src="/images/sreejith-logo.png" alt="Sreejith Travel" class="w-50 md:w-60 h-auto filter-offwhite invert" />
          </div>
          
          <p class="font-sans text-[16px] md:text-[17px] leading-[1.8] text-[#EAE6DF] font-light pr-4 mb-10 max-w-sm">
            Meaningful journeys. Thoughtfully crafted. Deeply connected. Experience the world with authenticity, respect, and soul.
          </p>
          
          <div class="flex items-center gap-5">
            <a href="#" class="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-[#EAE6DF] hover:text-[#C47552] hover:border-[#C47552] transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" class="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-[#EAE6DF] hover:text-[#C47552] hover:border-[#C47552] transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" class="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-[#EAE6DF] hover:text-[#C47552] hover:border-[#C47552] transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2 footer-elem pt-2">
          <h4 class="text-[12px] md:text-[13px] font-sans tracking-[0.2em] text-[#C47552] uppercase font-bold mb-5">Explore</h4>
          <div class="w-10 h-[1px] bg-[#C47552]/60 mb-8"></div>
          <ul class="flex flex-col gap-5">
            <li><NuxtLink to="/" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">About Us</NuxtLink></li>
            <li><NuxtLink to="/itineraries" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Itineraries</NuxtLink></li>
            <li><NuxtLink to="/Services" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Services</NuxtLink></li>
            <li><NuxtLink to="/Impact" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Impact</NuxtLink></li>
            <li><NuxtLink to="/Testimonials" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Testimonials</NuxtLink></li>
            <li><NuxtLink to="/blog" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Blog</NuxtLink></li>
            <li><NuxtLink to="/community" class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] hover:text-[#C47552] transition-colors duration-300">Community</NuxtLink></li>
          </ul>
        </div>

        <div class="lg:col-span-3 footer-elem pt-2">
          <h4 class="text-[12px] md:text-[13px] font-sans tracking-[0.2em] text-[#C47552] uppercase font-bold mb-5">Get In Touch</h4>
          <div class="w-10 h-[1px] bg-[#C47552]/60 mb-8"></div>
          
          <ul class="flex flex-col gap-6 mb-12">
            <li class="flex items-start gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF] leading-relaxed">Kochi, Kerala, India</span>
            </li>
            <li class="flex items-start gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF]">+91 98765 43210</span>
            </li>
            <li class="flex items-start gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF]">hello@sreejithtravel.com</span>
            </li>
            <li class="flex items-start gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C47552" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span class="font-sans text-[15px] md:text-[16px] text-[#EAE6DF]">Mon – Sat: 9:00 AM – 6:00 PM</span>
            </li>
          </ul>

          <NuxtLink to="/planyourjourney" class="group relative inline-flex items-center gap-4 px-8 py-4 border border-[#C47552]/50 hover:border-[#C47552] transition-colors duration-500 overflow-hidden w-full md:w-auto justify-center">
            <div class="absolute inset-0 bg-[#C47552] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"></div>
            <span class="text-[12px] font-sans tracking-[0.2em] text-[#C47552] group-hover:text-white transition-colors duration-500 relative z-10 uppercase font-bold">
              Plan Your Journey
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="relative z-10 text-[#C47552] group-hover:text-white transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </NuxtLink>
        </div>

      </div>

      <div class="pt-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 footer-elem">
        <p class="font-sans text-[14px] md:text-[15px] text-[#EAE6DF]/80">
          © 2026 Sree Jith Travel. All rights reserved.
        </p>
        <div class="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[14px] md:text-[15px] text-[#EAE6DF]/80">
          <NuxtLink to="/privacy" class="hover:text-white hover:underline underline-offset-4 transition-all">Privacy Policy</NuxtLink>
          <span class="text-white/30 hidden sm:inline">|</span>
          <NuxtLink to="/terms" class="hover:text-white hover:underline underline-offset-4 transition-all">Terms & Conditions</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.filter-offwhite {
  filter: invert(95%) sepia(2%) saturate(1008%) hue-rotate(338deg) brightness(110%) contrast(95%);
}

.filter-bronze {
  filter: invert(56%) sepia(34%) saturate(763%) hue-rotate(335deg) brightness(95%) contrast(90%);
}
</style>