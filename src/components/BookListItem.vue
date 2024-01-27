<script setup lang="ts">
import logger from '@/helpers/logger'
import AppImage from './AppImage.vue'

type ListBook = {
  id: string
  name: string
  author: string
  cover: string
}

interface Props {
  book: ListBook
}

defineProps<Props>()

const onDragStart = () => {
  console.log('aheya')
}
</script>

<template>
  <div
    class="h-24 w-full shadow-sm flex mb-2 bg-white rounded items-center p-2"
    @dragstart="onDragStart"
  >
    <AppImage :src="book.cover" :alt="book.name" class="rounded h-full w-auto" />
    <div class="ml-4">
      <div class="font-semibold text-gray-800">{{ book.name }}</div>
      <div class="text-gray-500">{{ book.author }}</div>
    </div>
  </div>
</template>
