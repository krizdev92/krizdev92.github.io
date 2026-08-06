<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


import '~/assets/scss/main.scss'

const router = useRouter();

onMounted(() => {

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  window.scrollTo(0, 0);

  router.afterEach(() => {
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250) 
  })

});
</script>

<template>
  <div>
    <PageLoader />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>