import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import '@/assets/css/global.css'

//axios是基于promise的HTTP库，它不是vue的第三方插件
import axios from 'axios'
//vue-axios是axios集成到Vue.js的小包装器
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(ElementPlus)
app.config.globalProperties.$axios = axios
app.use(VueAxios,axios)
// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.use(store).use(router).mount('#app')

