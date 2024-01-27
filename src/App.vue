<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <main class="overflow-y-auto overflow-x-hidden">
    <RouterView />
  </main>
  <header>
    <NavigationBar />
  </header>
</template>
