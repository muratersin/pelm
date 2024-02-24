import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getItem } from '@/services/storage.service'
import { THEME_COLORS } from '@/constants/theme'

export const useAppStore = defineStore('app', () => {
  const themeColor = ref<string>(getItem('themeColor') || THEME_COLORS[0])

  return {
    themeColor
  }
})
