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
    <div class="flex">
      <div class="w-full">
        <div class="mb-2 border p-2 rounded">
          <div class="font-semibold mb-2">Sort Type</div>
          <div class="flex">
            <div class="mr-10">
              <input
                type="radio"
                id="prev"
                name="sortType"
                value="prev"
                @click="bookStore.setSortType('prev')"
                :checked="bookStore.sortType === 'prev'"
              />
              <label for="prev" class="ml-1">asc</label>
            </div>
            <div>
              <input
                type="radio"
                id="next"
                name="sortType"
                value="next"
                @click="bookStore.setSortType('next')"
                :checked="bookStore.sortType === 'next'"
              />
              <label for="next" class="ml-1">desc</label>
            </div>
          </div>
        </div>
        <div class="border p-2 rounded">
          <div class="font-semibold">Sort By</div>
          <div class="flex">
            <div class="mr-10">
              <input
                type="radio"
                id="title"
                name="sortBy"
                value="title"
                :checked="bookStore.sortBy === 'title'"
                @click="bookStore.setSortBy('title')"
              />
              <label for="title" class="ml-1">Title</label>
            </div>
            <div class="mr-10">
              <input
                type="radio"
                id="authors"
                name="sortBy"
                value="authors"
                :checked="bookStore.sortBy === 'authors'"
                @click="bookStore.setSortBy('authors')"
              />
              <label for="authors" class="ml-1">Author</label>
            </div>
            <div>
              <input
                type="radio"
                id="create"
                name="sortBy"
                value="created"
                :checked="bookStore.sortBy === 'createdAt'"
                @click="bookStore.setSortBy('createdAt')"
              />
              <label for="create" class="ml-1">Create</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full bg-white shadow p-2 sticky top-0 z-10 flex items-center">
    <AppInput
      v-model="bookStore.searchText"
      placeholder="Search by title or author"
      clearabled
      class="w-full"
    />
    <RouterLink to="/add" class="mx-2">
      <IconPlus class="w-8 h-auto text-slate-700" />
    </RouterLink>
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
