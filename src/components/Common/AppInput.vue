<script setup lang="ts">
interface Props {}

defineProps<Props>()

const model = defineModel()
</script>

<template>
  <div class="flex">
    <input v-model="model" v-bind="$attrs" class="border rounded border-stone-500 flex-1 p-2" />
  </div>
</template>
