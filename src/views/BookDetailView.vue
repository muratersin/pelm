<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppTopBar from '@/components/common/AppTopBar.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import { getBookById } from '@/services/book.service'
import logger from '@/helpers/logger'
import AppImage from '@/components/common/AppImage.vue'
import AppModal from '@/components/common/AppModal.vue'
import { formatDate } from '@/helpers/date'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconXCircle from '@/components/icons/IconXCircle.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
const route = useRoute()
const loading = ref<boolean>(true)
const book = ref<Book>()
const noteMode = ref<'show' | 'edit' | undefined>(undefined)

const getBook = async () => {
  try {
    const result = await getBookById(route.params.id as unknown as number)
    result.note = result.note || ''
    book.value = result
  } catch (err) {
    logger.error(err)
  } finally {
    loading.value = false
  }
}

const saveNote = async () => {
  await bookStore.updateBook(Object.assign({}, book.value))

  noteMode.value = undefined
}

onBeforeMount(getBook)
</script>

<template>
  <div class="px-8">
    <AppTopBar title="Book">
      <template v-slot:right> <IconEdit class="w-5" @click="noteMode = 'show'" /> </template>
    </AppTopBar>
    <div v-if="loading" class="flex justify-center">
      <AppLoader />
    </div>
    <div v-else-if="book">
      <div class="flex">
        <div class="w-1/3">
          <AppImage :src="book?.coverUrl" :alt="book.title ?? 'Book'" class="shadow-lg rounded" />
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
      <AppModal v-if="noteMode !== undefined" full>
        <div class="w-full">
          <div class="flex justify-between mb-4">
            <span class="font-semibold">Note</span>
            <IconXCircle @click="noteMode = undefined" />
          </div>
          <div v-if="noteMode === 'edit'">
            <textarea
              rows="5"
              cols="33"
              placeholder="note"
              class="w-full border p-1 rounded"
              v-model="book.note"
            >
            </textarea>
          </div>
          <div v-else>
            {{ book?.note || 'There is no note.' }}
          </div>
          <div class="flex justify-end mt-4">
            <AppButton v-if="noteMode === 'edit'" @click="saveNote" type="primary">
              Save
            </AppButton>
            <AppButton v-else type="primary" @click="noteMode = 'edit'"> Edit </AppButton>
          </div>
        </div>
      </AppModal>
    </div>
  </div>
</template>
