<script setup lang="ts">
import { ref } from 'vue'

import PageLayout from '@/components/layout/PageLayout.vue'
import IconImport from '@/components/icons/IconImport.vue'
import logger from '@/helpers/logger'
import { parseNConvertToJson } from '@/helpers/file'
import AppButton from '@/components/common/AppButton.vue'

const fileInput = ref()
const loading = ref(false)
const titles = ref<string[]>([])
const data = ref<string[][]>([])
const headerDataMap = ref({})

const handleChange = async () => {
  if (loading.value) {
    logger.warn('File convertation already in progress...')
    return
  }

  try {
    loading.value = true
    const file = fileInput.value.files[0] as File

    const { headers, genericJsonArray } = await parseNConvertToJson(file)
    logger.info('Parsed file: ', {
      titles,
      genericJsonArray
    })
    //FIXME:
    titles.value = headers
    data.value = genericJsonArray
  } catch (err) {
    logger.error('File conver error: ', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageLayout title="Import Library">
    <div v-if="titles.length === 0">
      <div
        class="border border-gray-400 rounded p-9 flex justify-center items-center flex-col"
        role="button"
        @click="fileInput.click"
      >
        <span class="mb-2 font-semibold">Chose a .xlsx file for import</span>
        <IconImport />
      </div>
      <input ref="fileInput" id="idd" type="file" hidden accept=".xlsx" @change="handleChange" />
    </div>
    <div v-else>
      <div class="flex justify-between mb-4 mt-4">
        <AppButton class="w-32">Back</AppButton>
        <AppButton class="w-32" type="primary">Map Your Data</AppButton>
      </div>

      <div class="overflow-y-auto">
        <table class="border-collapse border border-slate-400">
          <thead>
            <tr>
              <th class="border border-slate-300 p-1"></th>
              <th v-for="title in titles" :key="title" class="border border-slate-300 p-1">
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in data" :key="i">
              <th scope="row" class="border">{{ i + 1 }}</th>
              <td
                v-for="d in item"
                :key="d + i"
                class="border border-slate-300 p-1 max-w-40 truncate ..."
              >
                {{ d }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </PageLayout>
</template>
