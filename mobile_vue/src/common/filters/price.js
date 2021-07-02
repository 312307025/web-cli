/**
 * 价格过滤器
 */
import Vue from 'vue'
Vue.filter('price', function (value) {
  return priceFilter(value)
})

Vue.prototype.priceFilter = priceFilter

function priceFilter (value) {
  if (!value && value !== 0 && value !== '0') {
    return '——'
  }
  if (typeof value === 'string') {
    value = Number(value)
  }
  let minus = ''
  value < 0 ? minus = '-' : ''
  value = value.toFixed(2)
  if (minus) {
    value = value.replace('-', '')
  }
  const arr = value.split('.')
  let priceInt = ''
  let num = arr[0]
  while (num.length > 3) {
    priceInt = ',' + num.slice(-3) + priceInt
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    priceInt = minus + num + priceInt + '.' + arr[1]
  }
  return priceInt
}
