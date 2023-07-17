// Vue3提供createApp方法，用于创建应用实例
import { createApp } from 'vue'

// 引入App根组件
import App from './App.vue'

// 利用createApp方法创建应用实例，并挂载到挂载点上
const app = createApp(App)

// 挂载
app.mount('#app')
