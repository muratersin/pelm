<script setup lang="ts">
import { useRouter } from 'vue-router'

import IconLeft from '@/components/icons/IconLeft.vue'

const router = useRouter()
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-between items-center my-10 text-gray-600">
    <div class="w-1/4" @click="router.back">
      <IconLeft class="w-5 cursor-pointer" />
    </div>
    <div class="w-2/4 text-center">{{ title }}</div>
    <div class="w-1/4 h-1"></div>
  </div>
</template>
