<script setup lang="ts">
type Props = {
  options: Array<{ name: string; value: string | number }>
}

defineProps<Props>()
</script>

<template>
  <select v-bind="$attrs" class="bg-transparent border rounded py-1 px-2">
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
