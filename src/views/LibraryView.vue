<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BookList from '@/components/book/BookList.vue'
import BookListItem from '@/components/book/BookListItem.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import AppModal from '@/components/common/AppModal.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { deleteBookById } from '@/services/book.service'
import logger from '@/helpers/logger'
import AppButton from '@/components/common/AppButton.vue'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
const router = useRouter()
const loading = ref<boolean>(false)
const bookToBeDeleted = ref<Book | null>(null)

const onAction = (actionName: 'delete' | 'update', id: number, title: string) => {
  logger.info('Show delete modal for: ', { actionName, id, title })

  if (actionName === 'delete') {
    bookToBeDeleted.value = {
      id,
      title
    }
  } else if (actionName === 'update') {
    router.push(`/update/${id}`)
  }
}

const deleteBook = async () => {
  const id = bookToBeDeleted.value?.id

  try {
    if (id) {
      await deleteBookById(id)
      bookStore.deleteBook(id)
    }

    bookToBeDeleted.value = null
  } catch (err) {
    logger.error(err)
  }
}
</script>

<template>
  <div class="p-2">
    <div class="flex justify-end">
      <RouterLink to="/add">
        <AppButton type="primary" class="text-white bg-lime-600 py-1 px-1 rounded-full">
          <IconPlus class="m-1" />
        </AppButton>
      </RouterLink>
    </div>
  </div>
  <div class="w-full bg-white shadow p-2 sticky top-0 z-10">
    <AppInput v-model="bookStore.searchText" placeholder="Search by title or author" clearabled />
  </div>
  <div v-if="loading" class="flex justify-center items-center h-full">
    <AppLoader />
  </div>
  <BookList>
    <RouterLink v-for="item in bookStore.filteredBooks" :key="item.id" :to="`/book/${item.id}`">
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
