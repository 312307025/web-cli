import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router/index.js'
import store from '../store'
import systemApi from '@/common/api/systemApi'
import lodash from 'lodash'
import { setTimeout } from 'timers'
import { Toast } from 'vant'
let service = axios.create({
  timeout: 60000
})
Vue.prototype.$http = service
const apiUrl = '/api/'

let pending = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken
let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
      pending[p].f() //执行取消操作
      pending.splice(p, 1) //把这条记录从数组中移除
    }
  }
}

export const http = {
  get: (path, data, loading = false, headers, spin = false) =>
    service
      .get(apiUrl + path, {
        params: data,
        headers,
        loading,
        spin
      })
      .then(res => {
        return handleSuccess(res.data, data)
      })
      .catch(err => {
        if (err.response) {
          return handleError(err.response, data)
        } else {
          return Promise.reject(err)
        }
      }),
  post: (path, data, loading = false, headers, spin = false) =>
    service
      .post(apiUrl + path, qs.parse(data), {
        headers,
        loading,
        spin
      })
      .then(res => {
        return handleSuccess(res.data, data)
      })
      .catch(err => {
        if (err.response) {
          return handleError(err.response, data)
        } else {
          return Promise.reject(err)
        }
      }),
  put: (path, data, loading = false, headers, spin = false) =>
    service
      .put(apiUrl + path, qs.parse(data), {
        headers,
        loading,
        spin
      })
      .then(res => {
        return handleSuccess(res.data, data)
      })
      .catch(err => {
        if (err.response) {
          return handleError(err.response, data)
        } else {
          return Promise.reject(err)
        }
      }),
  delete: (path, data, loading = false, headers, spin = false) =>
    service
      .delete(apiUrl + path, {
        params: data,
        data: data,
        headers,
        loading,
        spin
      })
      .then(res => {
        return handleSuccess(res.data, data)
      })
      .catch(err => {
        if (err.response) {
          return handleError(err.response, data)
        } else {
          return Promise.reject(err)
        }
      }),
  deleteBatch: (path, data, loading = false, headers, spin = false) =>
    service
      .delete(apiUrl + path, {
        // params: data,
        data: data,
        headers,
        loading,
        spin
      })
      .then(res => {
        return handleSuccess(res.data, data)
      })
      .catch(err => {
        if (err.response) {
          return handleError(err.response, data)
        } else {
          return Promise.reject(err)
        }
      }),
  exports: (path, data, headers) =>
    service
      .get(apiUrl + path, {
        params: data,
        headers: headers
      })
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        if (err.response) {
          return handleError(err.response, data)
        } else {
          return Promise.reject(err)
        }
      })
}
/**
 * 成功处理函数
 * @param {Object} res 请求返回的数据
 * @param {Object} params 处理函数接受的参数 params.custom == true的
 * @param {Boolean} param.custom 为true的时候，使用定制的成功处理方法，否则系统默认处理
 */
const handleSuccess = (res, params) => {
  if (params && params.custom) {
    return Promise.resolve(res)
  } else {
    if (res.code === 0 || res.success === true) {
      return Promise.resolve(res)
    } else {
      if (params && params.errorCustom) { // 为true的时候，使用定制的成功处理方法，否则系统默认处理
      } else {
        throwError(res.msg)
      }
      return Promise.reject(res)
    }
  }
}
const handleError = (res, params) => {
  let message
  const status = res.status
  const msg = res.data.message
  // 为true的时候，使用定制的成功处理方法，否则系统默认处理
  if (params && params.errorCustom) {
  } else {
    if (status === 400) {
      message = '传输数据错误'
    } else if (status === 404) {
      message = '请求接口不存在'
    } else if (status == 423) {
      return router.push('/user/black-list-change')
    } else if (status === 500) {
      message = msg
    } else if (status === 401) {
      // 假如没有权限，就不再报错了
      message = ''
    } else {
      message = '请求出错，请稍后再试'
    }
    if (message) throwError(message)
  }
  return Promise.reject(res)
}

/**
 * 抛出错误弹出框
 * @param {String} msg 错误信息
 */
const throwError = msg => {
  let duration = 5000
  let closable = false
  msg = msg || '请求发生错误，请重试'
  if (msg && msg.length > 20) {
    duration = 10000
    if (msg.length > 100) {
      duration = 0
      closable = true
    }
  }
  Toast.fail({
    message: msg,
    duration,
    closeOnClick: closable
  })
}

let close = null
let messageCount = 0
const closeMsg = res => {
  if (res.config && res.config.loading) messageCount--
  if (close && res.config && res.config.loading && messageCount === 0) {
    close.clear()
    close = null
    messageCount = 0
  }
}

// 请求前
service.interceptors.request.use(
  config => {
    // 全局社区ID，为-1时，替换为空
    const data = config.data
    config.data = JSON.stringify(data || '')
    // 优化token的获取，假如开发环境下存在可以使用的token的话，则使用该token，不在直接不使用token
    let authObj = {}
    if (config.params && config.params.unUseToken) {
      // 不使用token的操作
    } else {
      let token = store.state.globel.accessToken
      if (process.env.NODE_ENV === 'development') {
        if (token) {
          authObj = { Authorization: 'Bearer ' + token }
        }
      } else {
        authObj = { Authorization: 'Bearer ' + token }
      }
    }
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      ...authObj
    }
    if (config.loading) messageCount++
    if (config.loading && !close) {
      close = Toast.loading({
        message: '请求中...',
        duration: 0,
        overlay: config.spin
      })
    }
    removePending(config) //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method, f: c })
    })
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

let isCheck = true
// 请求后
service.interceptors.response.use(
  res => {
    closeMsg(res)
    removePending(res.config)  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    if (res && res.status === 200 && res.data && res.data.code !== 502) {

    } else {
      // 502的情况校验是否是维护中
      if (isCheck) {
        isCheck = false
        systemApi.checkMaintenance().then(flag => {
          if (flag) {
            router.replace('/systemMaintenance')
          }
        }).finally(() => {
          isCheck = true
        })
      }
    }
    return res
  },
  err => {
    console.log(err)
    closeMsg(err)
    if (err && err.response && err.response.status == 502) {
      // 502的情况校验是否是维护中
      if (isCheck) {
        isCheck = false
        systemApi.checkMaintenance().then(flag => {
          if (flag) {
            router.replace('/systemMaintenance')
          }
        }).finally(() => {
          isCheck = true
        })
      }
    }
    // 401:代表客户端错误，指的是由于缺乏目标资源要求的身份验证凭证。
    if (err && err.response && err.response.status === 401) {
      error401()
      store.dispatch('FedLogOut').then(() => {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
    }
    return Promise.reject(err)
  }
)

// 权限校验失败的提示在5秒内弹出一次
const error401 = lodash.throttle(function () {
  Toast.fail('登录失效，请重新登录！')
}, 5000)
