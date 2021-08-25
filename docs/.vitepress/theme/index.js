/*
 * @Author: web.王晓冬
 * @Date: 2021-08-21 15:12:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-25 16:43:09
 * @Description: file content
 */
import theme from 'vitepress/dist/client/theme-default'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import './styles/index.css'
import {
  registerComponents
} from './register-components'

import 'vue3-video-play/dist/style.css'
const isClient = typeof window == 'object'
export default {
  ...theme,
  async enhanceApp({
    app,
    router,
    siteData
  }) {
    if (isClient) {
      // await import('vue3-video-play').then((m) => {
      //   app.use(m.default)
      // })
      await import('../../../lib/index.js').then((m) => {
        app.use(m.default)
      })
    }
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.

    registerComponents(app)
  }
}