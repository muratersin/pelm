<script setup lang="ts">
import logger from '@/helpers/logger'

interface Props {
  src: string
  alt: string
}

defineProps<Props>()

const onError = () => {
  logger.error('Image Load error')
}
</script>

<template>
  <img :src="src" :alt="alt" @error="onError" />
</template>
