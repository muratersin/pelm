<script setup lang="ts">
import { computed, ref } from 'vue'

import AppSelect from '@/components/common/AppSelect.vue'
import { BOOK_DATA_HEADERS } from '@/constants/database'

type Props = {
  headers: string[]
}

const props = defineProps<Props>()

const mappedHeaders = ref<string[][]>()
const options = computed(() =>
  props.headers.map((h) => ({
    name: h,
    value: h
  }))
)
</script>

<template>
  <div>Map your headers</div>
  <div
    v-for="header of BOOK_DATA_HEADERS"
    :key="header.name"
    class="border-b py-4 flex justify-between"
  >
    <div class="w-1/2">{{ header.displayedName }}</div>
    <div class="w-1/2"><AppSelect :options="options" /></div>
  </div>
</template>
