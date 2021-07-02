import router from './router'
import store from './store'
import { getToken } from '@/common/util/auth'

/* Layout */
import Layout from '@/Layout'


const whiteList = ['/login', '/notPermission', '/systemMaintenance', '/pollution', '/index', '/404']

// 统计 存在token，多次访问后台接口401的情况，次数多了，应该为顶级域名cookie污染。正确处理方式为删除顶级域名token。
let pollution = 0
let temp = 0
router.beforeEach((to, from, next) => {
  if (getToken()) {
    /* has token*/
    //
    if (pollution > 5) {
      next({ path: '/pollution' })
    }
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.state.globel.isAddDynamicMenuRoutes) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => {
          store.dispatch('GenerateRoutes').then(accessedRoutes => {
            store.commit('SETISADDDYNAMICMENUROUTES', true)
            const divRoutes = {
              path: 'Layout',
              component: Layout,
              children: accessedRoutes,
            }
            let addRoutes = []
            addRoutes.push(divRoutes)
            if (store.state.globel.hasHome) {
              addRoutes.push({ path: '/', redirect: '/home' })
            } else {
              addRoutes.push({ path: '/', redirect: '/index' })
            }
            addRoutes.push({ path: '*', redirect: '/404' })
            router.addRoutes(addRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
          store.dispatch('Permissions')
        })
          .catch(err => {
            pollution++
          })
      } else {
        if (to.matched.length !== 0) {
          next()
          //如果匹配到跳转下一页
        } else {
          //没有匹配到的话，跳转404
          next({ path: '/404' })
        }
      }
    }
  } else {
    let code = to.query.code
    let state = to.query.state
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else if (code && state) {
      // 微信登录回来了
      next(`/${state}?code=${code}`)
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
})
