<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { THEME_COLORS } from '@/constants/theme'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<template>
  <PageLayout title="Theme">
    <div class="w-full flex flex-wrap">
      <div
        @click="appStore.themeColor = 'slate'"
        class="bg-slate-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'gray'"
        class="bg-gray-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'stone'"
        class="bg-stone-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'red'"
        class="bg-red-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'orange'"
        class="bg-orange-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'amber'"
        class="bg-amber-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'yellow'"
        class="bg-yellow-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'lime'"
        class="bg-lime-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'green'"
        class="bg-green-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'emerald'"
        class="bg-emerald-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'teal'"
        class="bg-teal-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'cyan'"
        class="bg-cyan-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'sky'"
        class="bg-sky-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'blue'"
        class="bg-blue-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'indigo'"
        class="bg-indigo-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'violet'"
        class="bg-violet-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'purple'"
        class="bg-purple-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'fuchsia'"
        class="bg-fuchsia-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'pink'"
        class="bg-pink-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
      <div
        @click="appStore.themeColor = 'rose'"
        class="bg-rose-500 rounded w-10 h-10 mr-4 mb-4"
      ></div>
    </div>
  </PageLayout>
</template>
