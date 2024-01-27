<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, type Component } from 'vue'

import IconHome from '@/components/icons/IconHome.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconPieChart from '@/components/icons/IconPieChart.vue'

const route = useRoute()
interface NavItem {
  icon: Component
  to: string
}

const navItems: NavItem[] = [
  { to: '/stats', icon: IconPieChart },
  { to: '/', icon: IconHome },
  {
    to: '/settings',
    icon: IconSettings
  }
]

const isCurrent = computed(() => (path: string) => route.path === path)
</script>

<template>
  <nav class="w-full h-full flex border-t shadow-lg shadow-lime-500">
    <RouterLink
      :key="item.to"
      v-for="item of navItems"
      :to="item.to"
      class="flex items-center flex-1 justify-center p-3 text-gray-600"
      :class="{ 'text-lime-500': isCurrent(item.to) }"
    >
      <component :is="item.icon"></component>
    </RouterLink>
  </nav>
</template>
