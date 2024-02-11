<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppTopBar from '@/components/common/AppTopBar.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import { getBookById } from '@/services/book.service'
import logger from '@/helpers/logger'
import AppImage from '@/components/common/AppImage.vue'
import { formatDate } from '@/helpers/date'

const route = useRoute()
const loading = ref<boolean>(true)
const book = ref<Book>()

const getBook = async () => {
  try {
    const result = await getBookById(route.params.id)
    book.value = result
  } catch (err) {
    logger.error(err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(getBook)
</script>

<template>
  <div class="px-8">
    <AppTopBar title="Book" />
    <div v-if="loading" class="flex justify-center">
      <AppLoader />
    </div>
    <div v-else-if="book">
      <div class="flex">
        <div class="w-1/3">
          <AppImage :src="book?.coverUrl" :alt="book.title" class="shadow-lg rounded" />
        </div>
        <div class="ml-4 w-2/3">
          <div class="font-semibold text-xl">{{ book.title }}</div>
          <div class="text-sm text-gray-600">
            by <span class="text-lime-700">{{ book.authors }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-around my-10">
        <div class="text-center text-gray-600 w-1/3 border-r px-2">
          <div class="font-semibold">{{ book.pageSize || '564' }}</div>
          <div class="text-sm text-gray-400">Pages</div>
        </div>
        <div class="text-center text-gray-600 w-1/3 px-2">
          <div class="font-semibold">{{ book?.publishDate || '-' }}</div>
          <div class="text-sm text-gray-400">Released</div>
        </div>
        <div class="text-center text-gray-600 w-1/3 border-l px-2">
          <div class="font-semibold">{{ formatDate(book.createdAt, 'detail') || '-' }}</div>
          <div class="text-sm text-gray-400">Added</div>
        </div>
      </div>
      <div v-if="book.publisher" class="font-semibold text-sm border-b py-2 text-gray-500">
        <span>Publisher - </span> <span class="text-lime-700">{{ book.publisher }}</span>
      </div>
      <div v-if="book.categories" class="font-semibold text-sm border-b py-2 text-gray-500">
        <span>Categories - </span> <span class="text-lime-700">{{ book.categories }}</span>
      </div>
      <div v-if="book.summary" class="mt-4">
        <h4 class="font-semibold mb-2">Summary</h4>
        <p class="text-gray-600">{{ book.summary }}</p>
      </div>
    </div>
  </div>
</template>
