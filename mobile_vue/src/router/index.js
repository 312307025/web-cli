import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'

// Vue.use(Router)

/* Layout */
import Layout from '@/Layout'

/**
 * Note: 路由配置项
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    meta: {
      title: '登录',
      isSkipLoading: true
    },
  },
  {
    path: '/notPermission',
    component: () => import('@/views/notPermission'),
    name: 'notPermission',
    meta: {
      title: '没有权限',
      isSkipLoading: true
    },
  },
  {
    path: '/systemMaintenance',
    component: () => import('@/views/systemMaintenance'),
    name: 'systemMaintenance',
    meta: {
      title: '系统维护',
      isSkipLoading: true
    },
  },
  {
    path: '/pollution',
    component: () => import('@/views/pollution'),
    name: 'pollution',
    meta: {
      title: '系统异常',
      isSkipLoading: true
    },
  },
  {
    path: 'normal',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'index',
        meta: {
          title: '欢迎页面',
          type: 0
        },
      },
      {
        path: '/404',
        component: () => import('@/views/404'),
        name: '404',
        meta: {
          title: '页面不存在',
          type: 1
        },
      },
    ]
  },
  // {
  //   path: '/',
  //   redirect: '/systemMaintenance',
  //   redirect: to => {
  //     if (store.state.globel.hasHome) {
  //       return '/home'
  //     } else {
  //       return '/index'
  //     }
  //   }
  // }
]

export default new Router({
  // mode: process.env.NODE_ENV !== 'development' ? 'hash' : 'history', // 去掉url中的#
  mode: 'history', // 去掉url中的#
  base: process.env.VUE_APP_BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
