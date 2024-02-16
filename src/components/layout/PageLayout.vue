<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div :class="`bg-rose-200`">
    <div class="px-2 py-4 text-center">
      <span class="text-xl mx-auto font-semibold">{{ title }}</span>
    </div>
    <div class="bg-white p-2 rounded-t-3xl">
      <slot></slot>
    </div>
  </div>
</template>
