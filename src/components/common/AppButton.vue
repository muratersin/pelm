<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'primary' | 'danger' | 'success' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default'
})

const classNames = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-lime-300'
    case 'default':
      return 'bg-gray-200'
    default:
      return ''
  }
})
</script>

<template>
  <button
    v-bind="$attrs"
    class="block border shadow-sm font-semibold p-2 rounded"
    :class="classNames"
  >
    <slot />
  </button>
</template>
