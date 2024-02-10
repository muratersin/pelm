import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/views/HomeView.vue')
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: () => import('@/views/BookDetailView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue')
    },
    {
      path: '/settings/import',
      name: 'import',
      component: () => import('@/views/ImportLibraryView.vue')
    },
    {
      path: '/settings/export',
      name: 'export',
      component: () => import('@/views/ExportLibraryView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/views/StatsView.vue')
    }
  ]
})

export default router
