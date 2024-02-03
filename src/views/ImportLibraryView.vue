<script setup lang="ts">
import { ref } from 'vue'

import PageLayout from '@/components/layout/PageLayout.vue'
import FileSelect from '@/components/import-library/FileSelect.vue'
import DataPresentation from '@/components/import-library/DataPresentation.vue'
import MapHeader from '@/components/import-library/MapHeader.vue'

const headers = ref<string[]>([])
const data = ref<string[][]>([])
const step = ref<number>(1)

const onFileParsingCompleted = (result: { headers: string[]; data: string[][] }) => {
  headers.value = result.headers
  data.value = result.data
  step.value = 2
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
    <MapHeader v-else-if="step === 3" :headers="headers" />
  </PageLayout>
</template>
