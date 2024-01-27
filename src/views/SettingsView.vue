<script setup lang="ts">
import PageLayout from '@/components/Layout/PageLayout.vue'
import NavigationList from '@/components/Navigation/NavigationList.vue'
import { SETTINGS_NAV_LIST_ITEMS } from '@/constants/navigation'
</script>

<template>
  <PageLayout title="Settings">
    <NavigationList :items="SETTINGS_NAV_LIST_ITEMS" />
  </PageLayout>
</template>
