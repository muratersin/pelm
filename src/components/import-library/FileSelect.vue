<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import logger from '@/helpers/logger'
import { parseNConvertToJson } from '@/helpers/file'
import IconImport from '@/components/icons/IconImport.vue'

const fileInput = ref()
const loading = ref(false)

const emit = defineEmits<{
  completed: [result: { headers: string[]; data: any }]
}>()

const handleFileChange = async () => {
  if (loading.value) {
    logger.warn('File convertation already in progress...')
    return
  }

  try {
    loading.value = true
    const file = fileInput.value.files[0] as File
    const { headers, genericJsonArray } = await parseNConvertToJson(file)

    logger.info('Parsed file headers: ', headers)
    logger.info('Parsed file data: ', genericJsonArray)

    emit('completed', { headers, data: genericJsonArray })
  } catch (err) {
    logger.error('File conver error: ', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="border border-gray-400 rounded p-9 flex justify-center items-center flex-col"
    role="button"
    @click="fileInput.click"
  >
    <span class="mb-2 font-semibold">Chose a .xlsx file for import</span>
    <IconImport />
  </div>
  <input ref="fileInput" id="idd" type="file" hidden accept=".xlsx" @change="handleFileChange" />
</template>
