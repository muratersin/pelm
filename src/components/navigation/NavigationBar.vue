<script setup lang="ts">
import NavigationItem from './NavigationItem.vue'

interface Props {
  items: NavItem[]
}

defineProps<Props>()
</script>

<template>
  <nav class="w-full h-full flex border-t">
    <NavigationItem v-for="item of items" kind="bar" :key="item.to" :item="item" />
  </nav>
</template>
