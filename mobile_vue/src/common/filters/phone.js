/**
 * 手机号过滤器
 */
import Vue from 'vue'
Vue.filter('phone', function (value) {
  return phoneFilter(value)
})

Vue.prototype.phoneFilter = phoneFilter

function phoneFilter(value) {
  const reg = /^(\d{3})\d{4}(\d{4})$/
  if (value || value === 0) {
    return value.replace(reg, '$1****$2')
  }
  return value
}
