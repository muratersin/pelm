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
// fetch cover image google api books or openlib or alternate
// use backend for proxy googleapi
// https://www.reddit.com/r/webdev/comments/z6oj76/api_that_returns_basic_information_about_books/
