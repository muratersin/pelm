<script setup lang="ts">
import AppModal from '@/components/common/AppModal.vue'
import BookListItem from './BookListItem.vue'

interface Props {
  books: Book[]
}

interface Emits {
  (e: 'selected', book: Book): void
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <AppModal full>
    <div class="relative">
      <div
        class="flex top-0 right-2 justify-center absolute bg-gray-200 h-12 w-12 border rounded-full items-center"
        @click="emit('close')"
      >
        X
      </div>
      <div class="max-h-[500px] overflow-y-auto">
        <BookListItem
          v-for="book in books"
          :key="book.title"
          :book="book"
          lean
          @click="emit('selected', book)"
        />
      </div>
    </div>
  </AppModal>
</template>
