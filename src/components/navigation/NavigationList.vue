<script setup lang="ts">
import NavigationItem from './NavigationItem.vue'

interface Props {
  items: NavItem[]
}

defineProps<Props>()
</script>

<template>
  <nav class="w-full h-full">
    <NavigationItem v-for="item of items" kind="list" :key="item.to" :item="item" />
  </nav>
</template>
