<script setup lang="ts">
interface Props {
  type?: 'primary' | 'danger' | 'success'
}

withDefaults(defineProps<Props>(), {
  type: 'primary'
})
</script>

<template>
  <button v-bind="$attrs" class="block">
    <slot />
  </button>
</template>
