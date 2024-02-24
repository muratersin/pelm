<script setup lang="ts">
import { ref } from 'vue'
import XLSX from 'xlsx'

import AppButton from '@/components/common/AppButton.vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
const loading = ref<boolean>(false)

const exportLib = () => {
  const worksheet = XLSX.utils.json_to_sheet(bookStore.books)
  const workbook = XLSX.utils.book_new(worksheet)
  XLSX.writeFile(workbook, 'Pelm.xlsx')
}
</script>

<template>
  <PageLayout title="Export Library">
    <div class="flex flex-col justify-center items-center">
      <p class="my-4">You have {{ bookStore.books.length }} book.</p>
      <AppButton @click="exportLib" :loading="loading"> Export as .xlsx file </AppButton>
    </div>
  </PageLayout>
</template>
