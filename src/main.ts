import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { DBService } from '@/services/db.service'
import logger from './helpers/logger'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const start = async () => {
  try {
    await DBService.instance.init()
    app.mount('#app')
  } catch (err) {
    logger.error(err)
  }
}
start()

// TODO: use teleport component  for modal
// handle offline status ans show toast message
// toast message component
// modal component
// spinner component
