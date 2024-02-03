<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  type?: 'error' | 'success' | 'warning' | 'info'
}
const props = defineProps<Props>()

const className = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-red-100 border-red-300'
    case 'success':
      return 'bg-green-100 border-green-300'
    case 'warning':
      return 'bg-yellow-100 border-yellow-300'
    case 'info':
    default:
      return ''
  }
})
</script>

<template>
  <div class="border rounded px-2 py-1 font-semibold text-gray-600" :class="className">
    <slot />
  </div>
</template>
