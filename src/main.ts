// Vue3提供createApp方法，用于创建应用实例
import { createApp } from 'vue'

// 引入vue-router
import router from '@/router'
// 引入pinia
import pinia from '@/store'

// 引入element-plus组件库
import ElementPlus from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

// 引入清除默认样式
import './style/reset.scss'

// 引入App根组件
import App from './App.vue'

// 引入头部与底部组件
import HospitalTop from './components/hospital_top/index.vue'
import HospitalBottom from './components/hospital_bottom/index.vue'

// 利用createApp方法创建应用实例，并挂载到挂载点上
const app = createApp(App)

// 全局注册
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)

// 安装
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})

// 挂载
app.mount('#app')
