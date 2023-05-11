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
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '我的', keepAlive: false }
      },
      {
        path: '/schedule',
        name: 'schedule',
        component: () => import('@/views/schedule/index.vue'),
        meta: { title: '进度查询', keepAlive: false }
      }
    ]
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/goApply',
        name: 'goApply',
        component: () => import('@/views/goApply/index.vue'),
        meta: { title: '立即申请', keepAlive: false }
      },
      {
        path: '/user/idcard',
        name: 'idcard',
        component: () => import('@/views/user/idcard/index.vue'),
        meta: { title: '实名认证', keepAlive: false }
      },
      {
        path: '/user/updateIdInfo',
        name: 'updateIdInfo',
        component: () => import('@/views/user/idcard/updateIdInfo.vue'),
        meta: { title: '更新身份信息', keepAlive: false }
      },
      {
        path: '/user/changeTel',
        name: 'changeTel',
        component: () => import('@/views/user/changeTel/index.vue'),
        meta: { title: '更新手机号', keepAlive: false }
      },
      {
        path: '/user/systemInfo',
        name: 'systemInfo',
        component: () => import('@/views/user/systemInfo/index.vue'),
        meta: { title: '系统信息', keepAlive: false }
      }
    ]
  }
]
