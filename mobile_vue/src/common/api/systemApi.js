import axios from 'axios'
import lodash from 'lodash'
import { Dialog } from 'vant'
import moment from 'moment'
/** 【系统服务的接口】 **/

// 检查版本号是否最新，不是的话，提示项目更新。
const checkVersion = lodash.throttle(function () {
  // 节省资源开资，在一定事件内，重复调用该方法仅会执行一次
  let time = moment().format('YYYYMMDDHHmm')
  time = time.substring(0, time.length - 1)
  if (localStorage.getItem('VERSION_CHECKED_TIME') === time) return false
  return axios.get('/version.json?date=' + time).then(res => {
    if (res.status === 200) {
      localStorage.setItem('VERSION_CHECKED_TIME', time)
      if (res.data.VERSION !== VERSION) {
        Dialog.alert({
          title: '更新提示',
          message: '项目已经更新，为了防止页面异常，请您刷新页面！'
        }).then(() => {
          window.location.reload(true)
        })
      }
    }
    return res
  })
}, 1500)

// 检查是否是维护状态，是的话，调整到/systemMaintenance维护页面。
const checkMaintenance = lodash.throttle(function () {
  return axios.get('/version.json').then(res => {
    if (res.status === 200) {
      if (res.data.maintenance) {
        return true
      }
    }
    return false
  })
}, 150)

export default {
  /** 【系统服务的接口】 **/
  checkVersion,
  checkMaintenance
}
