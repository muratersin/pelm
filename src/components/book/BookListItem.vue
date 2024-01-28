<script setup lang="ts">
import AppImage from '@/components/AppImage.vue'

interface Props {
  book: BookListItem
}

defineProps<Props>()

const onDragStart = () => {
  console.log('aheya')
}
</script>

<template>
  <div
    class="h-24 w-full shadow-sm flex mb-1 bg-white rounded items-center p-2"
    @dragstart="onDragStart"
  >
    <AppImage :src="book.cover" :alt="book.name" class="rounded h-full w-auto" />
    <div class="ml-4 flex-1">
      <div class="font-semibold text-gray-800">{{ book.name }}</div>
      <div class="text-gray-500">{{ book.author }}</div>
      <div class="text-gray-300 flex justify-end">{{ book.createdAt }}</div>
    </div>
  </div>
</template>
