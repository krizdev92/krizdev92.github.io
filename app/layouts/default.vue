<template>
  <div class="app-wrapper min-h-screen antialiased">
    <!-- Dynamic Header Component will load here -->
    <AppHeader />

    <!-- Main Content Area where pages inject automatically -->
    <main class="">
      <slot />
    </main>

    <!-- Dynamic Footer Component will load here -->
    <AppFooter />

  </div>
</template>