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
// refactor
// stats - son eklenen 3 kitap, toplam kitap sayısı
// stats
// fill missing fields from google api and add alternate apis
// fetch data with isbn or title when added new
// convert radio sort buttons to select and btn
// paginate with scroll
