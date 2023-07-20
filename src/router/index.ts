// 引入创建路由方法
import { createRouter, createWebHistory } from 'vue-router';

// 创建路由实例
export default createRouter({
  history: createWebHistory(), // 路由模式
  // 路由数组
  routes: [
    {
      path: '/doctor/home',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: '/doctor/hospital',
      component: () => import('@/pages/hospital/index.vue')
    },
    {
      path: '/doctor',
      redirect: '/doctor/home',
    },
  ],
  // 控制滚动行为
  scrollBehavior () {
    return {
      left: 0,
      top: 0
    }
  }
})