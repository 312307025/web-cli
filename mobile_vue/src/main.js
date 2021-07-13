import Vue from "vue"
import App from "./App.vue"
import store from "./store"
// 引入全局适配rem方法
import 'lib-flexible/flexible.js'
import 'normalize.css'
import '@/css/common.css'
// 全局过滤器
import '@/common/filters'

// 路由
import router from './router'
import './permission'

// 挂载全局 权限方法
import { isAuth } from '@/common/util/auth'
Vue.prototype.isAuth = isAuth

// 时间库
import time from 'moment'
Vue.prototype.$time = time

// 全局统一配色
import color from '@/common/color'
Vue.prototype.$color = color

// 使用样式库vant
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator' // 适配PC端
Vue.use(Vant)

// 关闭打包生成生产环境日志
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
