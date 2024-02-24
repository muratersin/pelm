import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { DBService } from '@/services/db.service'
import logger from '@/helpers/logger'

const start = async () => {
  try {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)

    await DBService.instance.init()
    app.mount('#app')
  } catch (err) {
    logger.error(err)
  }
}
start()

// stats - son eklenen 3 kitap, toplam kitap sayısı Top 3 yazar ve kitap sayıları, son 15 günde eklenen kitap sayısı
