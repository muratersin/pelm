<script setup lang="ts">
import { onMounted, ref } from 'vue'
import XLSX from 'xlsx'

import AppButton from '@/components/common/AppButton.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { getBooks } from '@/services/book.service'
import logger from '@/helpers/logger'

const loading = ref<boolean>(false)
const books = ref<Book[]>([])

onMounted(() => {
  getData()
})

const getData = async () => {
  try {
    books.value = await getBooks()
  } catch (err) {
    logger.error(err)
  } finally {
    loading.value = false
  }
}

const exportLib = (fileType: 'xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(books.value)
  const workbook = XLSX.utils.book_new(worksheet)
  XLSX.writeFile(workbook, 'Pelm.xlsx')
}
</script>

<template>
  <PageLayout title="Export Library">
    <div class="flex flex-col justify-center items-center">
      <p class="my-4">You have {{ books.length }} book.</p>
      <AppButton @click="exportLib('xlsx')" :loading="loading"> Export as .xlsx file </AppButton>
    </div>
  </PageLayout>
</template>
