<script setup lang="ts">
import { computed } from 'vue'
import AppLoader from '@/components/common/AppLoader.vue'

interface Props {
  type?: 'primary' | 'danger' | 'success' | 'default'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default'
})

const classNames = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-lime-400'
    case 'default':
      return 'bg-gray-100'
    case 'danger':
      return 'bg-red-400'
    default:
      return ''
  }
})
</script>

<template>
  <button
    v-bind="$attrs"
    class="block border font-semibold py-1 px-4 rounded"
    :class="classNames"
    :disabled="loading"
  >
    <AppLoader v-if="loading" class="mx-auto" />
    <div v-else>
      <slot />
    </div>
  </button>
</template>
