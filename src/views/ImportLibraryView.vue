<script setup lang="ts">
import { ref, reactive } from 'vue'

import { addBook, fetchBookCover } from '@/services/book.service'
import PageLayout from '@/components/layout/PageLayout.vue'
import FileSelect from '@/components/import-library/FileSelect.vue'
import DataPresentation from '@/components/import-library/DataPresentation.vue'
import MapHeader from '@/components/import-library/MapHeader.vue'
import logger from '@/helpers/logger'

const headers = ref<string[]>([])
const data = ref<string[][]>([])
const step = ref<number>(1)
const loading = ref<boolean>(false)
const completedProgress = reactive<{ total: number; completed: number }>({
  total: 0,
  completed: 0
})
const books = ref<Book[]>([])

const onFileParsingCompleted = (result: { headers: string[]; data: string[][] }) => {
  headers.value = result.headers
  data.value = result.data
  step.value = 2
  completedProgress.total = result.data.length
}

const save = async (mappedHeaders: any, index = 0) => {
  try {
    step.value = 4
    loading.value = true
    const bookObject = data.value[index]
    const book: any = {}

    Object.keys(mappedHeaders).forEach((header) => {
      book[header] = bookObject[mappedHeaders[header]]
    })

    try {
      const result = await fetchBookCover({ isbn: book.isbn, title: book.title })
      book.coverUrl = result.coverUrl
    } catch (err) {
      logger.error("Couln't find cover image.", err)
    } finally {
      logger.info(book)
      addBook(book)
      books.value.push(book as Book)
    }

    completedProgress.completed += 1

    if (index < 10) {
      save(mappedHeaders, index + 1)
    }
  } catch (err) {
    logger.error('Save book error: ', err)
  } finally {
    loading.value = false
    step.value = 1
  }
}
</script>

<template>
  <PageLayout title="Import Library">
    <FileSelect v-if="step === 1" @completed="onFileParsingCompleted" />
    <DataPresentation
      v-else-if="step === 2"
      :headers="headers"
      :data="data"
      @goBack="step = 1"
      @goNext="step = 3"
    />
    <MapHeader v-else-if="step === 3" :headers="headers" @goBack="step = 2" @save="save" />
    <div v-else-if="step === 4">
      {{ completedProgress }}
    </div>
    <div v-for="b in books" class="border m-4" :key="b.title">
      <img :src="b.coverUrl" :alt="b.title" />
      {{ b.title }}
    </div>
  </PageLayout>
</template>
