import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LibraryView.vue')
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
      path: '/settings/theme',
      name: 'theme',
      component: () => import('@/views/ThemeSettingsView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('@/views/StatsView.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/views/BookFormView.vue')
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('@/views/BookFormView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
