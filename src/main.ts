import { createApp } from 'vue'  
import ElementPlus from 'element-plus'  
import 'element-plus/dist/index.css'
import App from './App.vue'  
import CookiePlugin from './cookiePlugin';
import timeago from 'vue-timeago3';



const app = createApp(App)  
app.use(ElementPlus)  
app.use(timeago)
app.use(CookiePlugin, {
    expires: 7 // 设置默认的过期时间为7天
  })
app.mount('#app')