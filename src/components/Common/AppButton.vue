<script setup lang="ts">
interface Props {
  type: 'primary' | 'danger' | 'success'
}

defineProps<Props>()
</script>

<template>
  <button v-bind="$attrs">
    <slot />
  </button>
</template>
