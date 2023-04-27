import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import tabBar from '@/layout/tabBar.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/',
    name: 'tabBar',
    component: tabBar,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail/index.vue'),
        meta: { title: '详情页', keepAlive: false }
      }
    ]
  }
]
