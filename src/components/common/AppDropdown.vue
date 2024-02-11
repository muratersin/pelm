<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  items: { text: string; value: string; class?: string }[]
}

const emit = defineEmits(['action'])
defineProps<Props>()

const isOpen = ref<boolean>(false)

const change = (v: string) => {
  emit('action', v)
}

window.addEventListener('click', () => {
  isOpen.value = false
})

const toggle = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div @click.prevent="toggle" class="relative">
    <div>
      <slot />
    </div>
    <div
      class="absolute transition-all bg-white border rounded shadow-sm z-10 right-0"
      :class="{ 'h-auto visible': isOpen, 'h-0 hidden': !isOpen }"
    >
      <ul>
        <li
          v-for="item in items"
          :key="item.value"
          @click.prevent="change(item.value)"
          class="px-6 py-2 flex hover:bg-slate-400 border"
          :class="item.class"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
