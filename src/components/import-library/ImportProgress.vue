<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  total: number
  completed: number
}

const props = defineProps<Props>()

const percent = computed(() => Math.ceil((props.completed / props.total) * 100))
const progressBarStyle = computed(() => ({
  width: `${percent.value}%`
}))
</script>

<template>
  <div class="flex justify-center mt-10">
    <div class="w-full text-center">
      <div class="mb-4">{{ total }} / {{ completed }}</div>
      <div class="border-2 border-lime-500 rounded-full w-full h-7 relative">
        <div class="font-semibold z-50 absolute right-1">{{ percent }}%</div>
        <div
          :style="progressBarStyle"
          class="h-full bg-lime-300 rounded-full absolute top-0 left-0 z-0"
        ></div>
      </div>
    </div>
  </div>
  <div class="text-slate-500 w-full text-center mt-4">Librarry importing from file...</div>
</template>
