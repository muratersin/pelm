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
    <div class="mt-8 bg-gray-50 rounded shadow-sm p-2">
      <div class="text-3xl mb-4">Top Authors</div>
      <div v-for="item of bookStore.topAuthors" :key="item[0]" class="my-3 flex justify-between">
        <span class="font-semibold mr-2 w-full border-b">{{ item[0] }}</span>
        <span>{{ item[1] }}</span>
      </div>
    </div>
  </PageLayout>
</template>
