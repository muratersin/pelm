<script setup lang="ts">
import BookList from '@/components/Book/BookList.vue'
import BookListItem from '@/components/Book/BookListItem.vue'

const items: BookListItem[] = new Array(20).fill(null).map((d, i) => ({
  id: i + '-index',
  name: 'The Call of The Wild',
  author: 'Jack London',
  createdAt: '21/12/2024',
  cover: 'https://m.media-amazon.com/images/I/71orgV40k1L._SL1360_.jpg'
}))
</script>

<template>
  <BookList>
    <BookListItem v-for="item in items" :key="item.id" :book="item" />
  </BookList>
</template>
