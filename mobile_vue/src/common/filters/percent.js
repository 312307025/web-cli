/**
 * 百分号过滤器 保留两位小数
 */
import Vue from 'vue'
Vue.filter('percent', function(value) {
  return percentFilter(value)
})

Vue.prototype.percentFilter = percentFilter

function percentFilter(value) {
  let temp = Number(value)
  if (isNaN(temp)) {
    return '——'
  } else {
    var str = (temp * 100).toFixed(2)
    str += "%"
    return str
  }
}
