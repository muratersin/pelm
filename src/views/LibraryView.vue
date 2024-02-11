<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import BookList from '@/components/book/BookList.vue'
import BookListItem from '@/components/book/BookListItem.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import AppModal from '@/components/common/AppModal.vue'
import { getBooks, deleteBookById } from '@/services/book.service'
import { convertToBookListItem } from '@/helpers/book'
import logger from '@/helpers/logger'
import AppButton from '@/components/common/AppButton.vue'

const books = ref<Array<BookListItem>>()
const searchText = ref<string>('')
const loading = ref<boolean>(true)
const bookToBeDeleted = ref<Book | null>(null)

onMounted(() => {
  fetchBooks()
})

const filteredBooks = computed(() =>
  books.value?.filter((book) => {
    if (!searchText.value || searchText.value.length < 3) return true

    const reg = new RegExp(searchText.value, 'gi')

    return reg.test(book.title)
  })
)

const fetchBooks = async () => {
  try {
    books.value = convertToBookListItem(await getBooks())
  } catch (err) {
    logger.error(err)
  } finally {
    loading.value = false
  }
}

const onAction = (actionName: 'delete' | 'update', id: number, title: string) => {
  logger.info('Show delete modal for: ', { actionName, id, title })

  if (actionName === 'delete') {
    bookToBeDeleted.value = {
      id,
      title
    }
  }
}

const deleteBook = async () => {
  const id = bookToBeDeleted.value?.id

  if (id) {
    await deleteBookById(id)
    books.value = books.value?.filter((b: BookListItem) => b.id !== id)
  }

  bookToBeDeleted.value = null
}
</script>

<template>
  <!-- <div class="h-32">filter and sort</div> -->
  <div class="w-full bg-white shadow p-2 sticky top-0">
    <AppInput v-model="searchText" placeholder="Search by title or author" clearabled />
  </div>
  <div v-if="loading" class="flex justify-center items-center h-full">
    <AppLoader />
  </div>
  <BookList>
    <RouterLink v-for="item in filteredBooks" :key="item.id" :to="`/book/${item.id}`">
      <BookListItem :book="item" @delete="onAction" @update="onAction" />
    </RouterLink>
  </BookList>
  <AppModal v-if="bookToBeDeleted">
    <div>
      <p>Are you sure to delete "{{ bookToBeDeleted.title }}".</p>
      <div class="flex mt-4 w-full justify-end">
        <AppButton @click="bookToBeDeleted = null">No</AppButton>
        <div class="mx-2"></div>
        <AppButton type="danger" @click="deleteBook">Yes</AppButton>
      </div>
    </div>
  </AppModal>
</template>
