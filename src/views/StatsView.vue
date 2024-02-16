<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
</script>

<template>
  <PageLayout title="Stats">
    <div
      class="h-40 w-40 rounded-full border-b-4 flex justify-center items-center flex-col mx-auto mt-4"
    >
      <div class="text-3xl">Total</div>
      <div class="text-5xl font-semibold">{{ bookStore.totalBooks }}</div>
    </div>
  </PageLayout>
</template>
