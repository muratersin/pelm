<script setup lang="ts">
import AppImage from '@/components/AppImage.vue'

interface Props {
  book: BookListItem
}

defineProps<Props>()
</script>

<template>
  <div class="h-24 w-full shadow-sm flex mb-1 bg-white rounded items-center p-2">
    <AppImage :src="book.coverUrl" :alt="book.title" class="rounded h-full w-auto" />
    <div class="ml-4 flex-1">
      <div class="font-semibold text-gray-800">{{ book.title }}</div>
      <div class="text-gray-500">{{ book.authors }}</div>
      <div class="text-gray-300 flex justify-end">{{ book.createdAt }}</div>
    </div>
  </div>
</template>
