<script setup lang="ts">
interface Props {
  size: 5 | 10 | 20 | 32 | 40 | 52 | 60 | 72 | 80 | 96
}

withDefaults(defineProps<Props>(), {
  size: 32
})
</script>

<template>
  <div
    :class="`m-4 rounded w-${size} h-${size} bg-cover shadow`"
    style="background-image: url('/logo.png')"
  ></div>
</template>
