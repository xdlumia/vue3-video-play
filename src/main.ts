/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 10:25:40
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-20 18:13:59
 * @Description: file content
 */
import { createApp } from 'vue'
import App from './App.vue'
import vue3videoPlay from 'vue3-video-play';
console.log(vue3videoPlay)
const app = createApp(App)
app.use(vue3videoPlay)

app.mount('#app')
