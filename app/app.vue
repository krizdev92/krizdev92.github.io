<script setup>
import { onMounted } from 'vue';
// Aligned with your updated SCSS structure
import '~/assets/scss/main.scss'

onMounted(() => {
  // Disable the browser's native scroll memory
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Force position to absolute top on every initialization
  window.scrollTo(0, 0);
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