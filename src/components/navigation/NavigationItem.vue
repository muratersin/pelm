<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  item: NavItem
  kind: 'bar' | 'list'
}

const route = useRoute()
const props = defineProps<Props>()
const isCurrent = computed(() => {
  if (route.path === '/') {
    return route.path === props.item.to
  }

  return route.path.split('/')[1] === props.item.to.replace('/', '')
})
const isBar = computed(() => props.kind === 'bar')
const classNames = computed(() => ({
  subtheme: isCurrent.value,
  'items-center flex-1 justify-center p-3 pb-8': isBar.value,
  'w-full px-2 py-4 border-b': !isBar.value
}))
</script>

<template>
  <RouterLink :to="item.to" class="flex text-stone-700 items-center" :class="classNames">
    <component :is="item.icon"></component>
    <span v-if="!isBar && item.title" class="ml-2">{{ item.title }}</span>
  </RouterLink>
</template>
