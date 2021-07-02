/**
 * 保留两位小数
 */
import Vue from 'vue'
Vue.filter('fxed', function(value) {
  return fxedFilter(value)
})

Vue.prototype.fxedFilter = fxedFilter

function fxedFilter(value) {
  let temp = Number(value)
  if (isNaN(temp)) {
    return '——'
  } else {
    return temp.toFixed(2)
  }
}
