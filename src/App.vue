<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

import NavigationBar from '@/components/navigation/NavigationBar.vue'
import { NAV_BAR_ITEMS } from '@/constants/navigation'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()

onBeforeMount(() => {
  bookStore.fetchBooks()
})
</script>

<template>
  <main class="overflow-y-auto overflow-x-hidden">
    <RouterView />
  </main>
  <header>
    <NavigationBar :items="NAV_BAR_ITEMS" />
  </header>
</template>
