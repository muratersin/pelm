<script setup lang="ts">
import IconXCircle from '@/components/icons/IconXCircle.vue'

interface Props {
  clearabled?: boolean
}

defineProps<Props>()

const model = defineModel()
</script>

<template>
  <div class="flex justify-between border rounded border-stone-500 flex-1 p-2">
    <input v-model="model" v-bind="$attrs" class="w-full" />
    <IconXCircle v-if="clearabled" />
  </div>
</template>
