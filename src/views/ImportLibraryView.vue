<script setup lang="ts">
import { ref, reactive } from 'vue'

import { fetchBooks } from '@/services/book.service'
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

const onFileParsingCompleted = (result: { headers: string[]; data: string[][] }) => {
  headers.value = result.headers
  data.value = result.data
  step.value = 2
  completedProgress.total = result.data.length
}

const save = async (mappedHeaders: any, index = 0) => {
  try {
    loading.value = true
    const bookObject = data.value[index]
    const book: any = {}
    logger.info(Object.assign({}, book))
    Object.keys(mappedHeaders).forEach((header) => {
      book[header] = bookObject[mappedHeaders[header]]
    })

    const result = await fetchBooks({ isbn: book.isbn, title: book.title })
    const [firstItem] = result?.items || []
    book.coverUrl = firstItem?.volumeInfo?.imageLinks?.thumbnail
    console.log(book, book.coverUrl)
    setTimeout(() => save(mappedHeaders, index + 1), 300)
  } catch (err) {
    logger.error('Save book error: ', err)
  } finally {
    loading.value = false
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
  </PageLayout>
</template>
