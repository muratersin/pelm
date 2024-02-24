<script setup lang="ts">
import { computed } from 'vue'
import AppDropdown from '@/components/common/AppDropdown.vue'
import AppImage from '@/components/common/AppImage.vue'
import IconMore from '@/components/icons/IconMore.vue'
import { formatDate } from '@/helpers/date'

interface Props {
  book: Book
}

const props = defineProps<Props>()
const emit = defineEmits(['delete', 'update'])
const date = computed(() => (date?: number) => formatDate(date))
const ACTIONS = [
  { text: 'Delete', value: 'delete', class: 'text-red-400 font-semibold' },
  { text: 'Update', value: 'update' }
]

const onDropdownAction = (action: 'delete' | 'update') => {
  emit(action, action, props.book.id, props.book.title)
}
</script>

<template>
  <div class="h-28 w-full flex border-b bg-white items-center p-2">
    <AppImage :src="book.coverUrl" :alt="book.title || 'cover'" class="rounded w-14" />
    <div class="ml-4 flex-1 truncate">
      <div class="font-semibold text-gray-800 truncate">
        {{ book.title }}
      </div>
      <div class="text-gray-500">{{ book.authors }}</div>
      <div class="text-gray-300 flex justify-end">{{ date(book.createdAt) }}</div>
    </div>
    <div class="ml-4 h-full">
      <AppDropdown :items="ACTIONS" @action="onDropdownAction">
        <IconMore class="text-gray-500 w-5" />
      </AppDropdown>
    </div>
  </div>
</template>
