<script setup lang="ts">
import { computed } from 'vue'
import AppImage from '@/components/AppImage.vue'
import { formatDate } from '@/helpers/date'

interface Props {
  book: BookListItem
}

defineProps<Props>()

const date = computed(() => (date: number) => formatDate(date))
</script>

<template>
  <div class="h-24 w-full shadow-sm flex mb-1 bg-white rounded items-center p-2">
    <AppImage :src="book.coverUrl" :alt="book.title" class="rounded w-14" />
    <div class="ml-4 flex-1 truncate">
      <div class="font-semibold text-gray-800 truncate">
        {{ book.title }}
      </div>
      <div class="text-gray-500">{{ book.authors }}</div>
      <div class="text-gray-300 flex justify-end">{{ date(book.createdAt) }}</div>
    </div>
  </div>
</template>
