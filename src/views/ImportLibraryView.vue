<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { addBook, fetchNFillMissingFields } from '@/services/book.service'
import PageLayout from '@/components/layout/PageLayout.vue'
import FileSelect from '@/components/import-library/FileSelect.vue'
import DataPresentation from '@/components/import-library/DataPresentation.vue'
import MapHeader from '@/components/import-library/MapHeader.vue'
import ImportProgress from '@/components/import-library/ImportProgress.vue'
import logger from '@/helpers/logger'
import { useBookStore } from '@/stores/book'

const router = useRouter()
const bookStore = useBookStore()
const headers = ref<string[]>([])
const data = ref<string[][]>([])
const step = ref<number>(1)
const loading = ref<boolean>(false)
const completedProgress = reactive<{ total: number; completed: number }>({
  total: 0,
  completed: 0
})

const onFileParsingCompleted = (result: { headers: string[]; data: string[][] }) => {
  headers.value = result.headers
  data.value = result.data
  step.value = 2
  completedProgress.total = result.data.length
}

const save = async (mappedHeaders: any) => {
  try {
    for (const bookObject of data.value) {
      loading.value = true
      let book: any = {}

      Object.keys(mappedHeaders).forEach((header) => {
        book[header] = bookObject[mappedHeaders[header]]
      })

      try {
        book = await fetchNFillMissingFields(book, { isbn: book.isbn, title: book.title })
      } catch (err) {
        logger.error("Couln't find cover image.", err)
      } finally {
        await addBook(book)
        logger.info(book)
      }

      completedProgress.completed += 1
    }
  } catch (err) {
    logger.error('Save book error: ', err)
  } finally {
    await bookStore.fetchBooks()
    loading.value = false
    step.value = 1
    router.push('/')
  }
}
</script>

<template>
  <PageLayout title="Import Library">
    <div class="px-5">
      <ImportProgress
        v-if="loading"
        :total="completedProgress.total"
        :completed="completedProgress.completed"
      />
      <FileSelect v-else-if="step === 1" @completed="onFileParsingCompleted" />
      <DataPresentation
        v-else-if="step === 2"
        :headers="headers"
        :data="data"
        @goBack="step = 1"
        @goNext="step = 3"
      />
      <MapHeader v-else-if="step === 3" :headers="headers" @goBack="step = 2" @save="save" />
    </div>
  </PageLayout>
</template>
