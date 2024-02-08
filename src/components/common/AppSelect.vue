<script setup lang="ts">
type Props = {
  value?: string | number
  options: Array<{ name: string; value: string | number; disabled?: boolean }>
}

defineProps<Props>()
const emit = defineEmits<{
  change: [value: string | number]
}>()
</script>

<template>
  <select v-bind="$attrs" class="bg-transparent border rounded py-1 px-2" @change="e => emit('change', e.target.value)">
    <option>Select...</option>
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
      :selected="option.value === value"
      :disabled="option.disabled"
    >
      {{ option.name }}
    </option>
  </select>
</template>
