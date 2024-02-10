<script setup lang="ts">
import { ref, onMounted } from 'vue'

import BookList from '@/components/book/BookList.vue'
import BookListItem from '@/components/book/BookListItem.vue'
import BookListTopBar from '@/components/book/BookListTopBar.vue'
import { getBooks } from '@/services/book.service'
import logger from '@/helpers/logger'

const books = ref<BookListItem[]>()

onMounted(() => {
  fetchBooks()
})

const fetchBooks = async () => {
  try {
    const res = await getBooks()
    logger.info(res)
    books.value = res
  } catch (err) {
    logger.error(err)
  } finally {
    logger.info('done')
  }
}
</script>

<template>
  <BookListTopBar />
  <BookList>
    <BookListItem v-for="item in books" :key="item.id" :book="item" />
  </BookList>
</template>
