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
      component: () => import('@/pages/hospital/index.vue'),
      children: [
        {
          path: 'register',
          component: () => import('@/pages/hospital/register/index.vue')
        },
        {
          path: 'notice',
          component: () => import('@/pages/hospital/notice/index.vue')
        },
        {
          path: 'close',
          component: () => import('@/pages/hospital/close/index.vue')
        },
        {
          path: 'detail',
          component: () => import('@/pages/hospital/detail/index.vue')
        },
        {
          path: 'search',
          component: () => import('@/pages/hospital/search/index.vue')
        },
        {
          path: '',
          redirect: '/doctor/hospital/register'
        },
      ]
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