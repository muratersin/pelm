<script setup lang="ts">
import { ref } from 'vue'
import logger from '@/helpers/logger'
import { DEFAULT_COVER_URI } from '@/constants/book'

interface Props {
  src: string
  alt: string
}

defineProps<Props>()
const imageRef = ref()

const onError = () => {
  logger.error('Image Load error')
  loadedmetadata()
}

const loadedmetadata = () => {
  if (imageRef.value?.naturalHeight === 1) {
    imageRef.value.src = DEFAULT_COVER_URI
  }
}
</script>

<template>
  <img ref="imageRef" :src="src" :alt="alt" @error="onError" @load="loadedmetadata" />
</template>
