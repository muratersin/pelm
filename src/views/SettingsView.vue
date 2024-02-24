<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import NavigationList from '@/components/navigation/NavigationList.vue'
import { SETTINGS_NAV_LIST_ITEMS } from '@/constants/navigation'
</script>

<template>
  <PageLayout title="Settings">
    <NavigationList :items="SETTINGS_NAV_LIST_ITEMS" />
  </PageLayout>
</template>
