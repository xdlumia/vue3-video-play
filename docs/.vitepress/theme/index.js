/*
 * @Author: web.王晓冬
 * @Date: 2021-08-21 15:12:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-21 15:15:54
 * @Description: file content
 */
import theme from 'vitepress/dist/client/theme-default'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import {
  registerComponents
} from './register-components'

// import '../../../src/styles/index.css'
// import './styles/index.css'

export default {
  ...theme,
  enhanceApp({
    app,
    router,
    siteData
  }) {
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.

    registerComponents(app)
  }
}