<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import AppSelect from '@/components/common/AppSelect.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppModal from '@/components/common/AppModal.vue'
import BookListItem from '@/components/book/BookListItem.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import { deleteBookById } from '@/services/book.service'
import { useBookStore } from '@/stores/book'
import logger from '@/helpers/logger'

const bookStore = useBookStore()
const router = useRouter()
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

const options = [
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Authors',
    value: 'authors'
  },
  {
    name: 'Created At',
    value: 'createdAt'
  }
]

const toggleSortType = () => {
  const sortType = bookStore.sortType === 'prev' ? 'next' : 'prev'
  bookStore.setSortType(sortType)
}

const isDesc = computed(() => bookStore.sortType === 'prev')
</script>

<template>
  <div class="p-2 bg-white">
    <div class="flex">
      <div class="w-full flex items-center justify-between">
        <div class="w-1/5 font-semibold">Sort:</div>
        <div class="w-3/5 mr-2">
          <AppSelect
            :options="options"
            :value="bookStore.sortBy"
            @change="bookStore.setSortBy"
            class="w-full"
          ></AppSelect>
        </div>
        <div class="w1/5">
          <AppButton @click="toggleSortType" type="primary" class="w-full subtheme-text">
            <component :is="isDesc ? IconArrowDown : IconArrowUp" />
          </AppButton>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full bg-white shadow-sm p-2 sticky top-0 z-10 flex items-center">
    <AppInput
      v-model="bookStore.searchText"
      placeholder="Search by title or author"
      clearabled
      class="w-full bg-white"
    />
    <RouterLink to="/add" class="mx-2">
      <IconPlus class="w-8 h-auto text-slate-700" />
    </RouterLink>
  </div>
  <div>
    <RouterLink v-for="item in bookStore.filteredBooks" :key="item.id" :to="`/book/${item.id}`">
      <BookListItem :book="item" @delete="onAction" @update="onAction" />
    </RouterLink>
  </div>
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
