<script setup lang="ts">
import BookListItem from '@/components/BookListItem.vue'

const items = new Array(120).fill(null).map((d, i) => ({
  id: i,
  name: 'The Call of The Wild',
  author: 'Jack London',
  cover: 'https://m.media-amazon.com/images/I/71orgV40k1L._SL1360_.jpg'
}))
</script>

<template>
  <div class="bg-lime-50 p-2">
    <BookListItem v-for="item in items" :key="item.id" :book="item" />
  </div>
</template>
