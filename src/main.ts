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

// kitap adı, yazar ve ekleme tarihine göre sıralama
// default kitap adı olcak
// fill missing fields from google api and add alternate apis
// kitap eklerken isbn ve title dan  gelecek
// pinia itegration
// refactor
// stats - son eklenen 3 kitap, toplam kitap sayısı
