/**
 * 判断有效手机号码
 * @method isMobile
 * @param {Number} mobile 手机号码
 */
export function isMobile(mobile) {
  return /^1\d{10}$/.test(mobile)
}

/**
 * 判断有效身份证号
 * @method isCardNo
 * @param {Number} card 身份证号
 */
// ^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|
// (^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$
export function isCardNo(cardNo) {
  return /^((\d{15})|(\d{17}([0-9]|X))|(\w\d{9}))$/.test(cardNo)
}

// 判断字符是否为空的方法
export function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '') {
    return true
  } else {
    return false
  }
}
/**
 * 校验如果是数字（包含正负整数，0以及正负浮点数）就返回true
 **/
export function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}

/**
 * 去除字符串两端空格
 * @method trimString
 * @param {String} str 被处理字符串
 * @return {String} 期望字符串
 */
export function trimString(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 去除字符串两端空格
 * @method filterNull
 */
export function filterNull(str) {
  return str === null ? '-' : str
}

export function isNull(data) {
  if (data === null || data === 'null' || data === '') {
    return true
  } else {
    return false
  }
}

// 加法 解决float类型运算bug
export const FloatAdd = (a, b) => {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e
}
// 减法 解决float运算bug b不要是负数，原理是a-b,假如b是负数的话，负负为正，就会变成加法了。
export const FloatSub = (a, b) => {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e
}
// 乘法 解决float运算bug
export const mul = (a, b) => {
  var c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) { }
  try {
    c += e.split('.')[1].length
  } catch (f) { }
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}
// 除法 解决float运算bug
export const div = (a, b) => {
  var c,
    d,
    e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) { }
  try {
    f = b.toString().split('.')[1].length
  } catch (g) { }
  return (c = Number(a.toString().replace('.', ''))), (d = Number(b.toString().replace('.', ''))), mul(c / d, Math.pow(10, f - e))
}

/**
 * 快捷通过value获取label的值（用于select的数据）如 let list = [{label: '测试', value: 5}];传入value为5，可以获得label的值
 * @param {Array} list 被遍历的数组
 * @param {String} value 被判断的值
 * @param {Object} params 默认参数
 */
export function getLabelByValue(list, value, params) {
  let option = {
    label: 'label',
    value: 'value',
    entire: false,
    ...params
  }
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i][option.value] === value) {
      return option.entire ? list[i] : list[i][option.label]
    }
  }
  return ''
}

/**
 * 能把规格一样的数组统一转化为map对象
 * @param {Array} list 被遍历的数组
 * @param {Object} params 默认参数
 */
export function getMapByList(list, params) {
  let map = new Map()
  let option = {
    value: 'value',
    ...params
  }
  for (let i = 0, len = list.length; i < len; i++) {
    map.set(list[i][option.value], list[i])
  }
  return map
}

/**
 * 通过value来删除数组对应的值
 * @param {Array} list 被遍历的数组
 * @param {String} value 被判断的值
 * @param {Object} params 默认参数
 */
export function deleteItemByValue(list, value, params) {
  let option = {
    value: 'value',
    ...params
  }
  let result = []
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i][option.value] !== value) {
      result.push(list[i])
    }
  }
  return result
}

/**
 * 遍历树通过value获取对应的值
 * @param {Array} tree 被遍历的数组
 * @param {String} value 被判断的值
 * @param {Object} params 默认参数
 */
export function getTreeItemByValue(tree, value, params) {
  let option = {
    value: 'value',
    ...params
  }
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i][option.value] === value) {
      return tree[i]
    }
    if (tree[i].children && tree[i].children.length) {
      let childrenResult = getTreeItemByValue(tree[i].children, value, params)
      if (childrenResult) {
        return childrenResult
      }
    }
  }
  return ''
}
/**
 * 遍历树,对树的每一个参数进行处理
 * @param {Array} tree 被遍历的数组
 * @param {Function} callback 被判断的值
 */
export function batchTreeDo(tree, callback) {
  for (let i = 0, len = tree.length; i < len; i++) {
    callback(tree[i])
    if (tree[i].children && tree[i].children.length) {
      batchTreeDo(tree[i].children, callback)
    }
  }
}

// 获取CheckBox的Map对象
export function getCheckBoxMap(facilitiesList, params) {
  let facilitiesMap = new Map()
  for (let i = 0, len = facilitiesList.length; i < len; i++) {
    facilitiesMap.set(facilitiesList[i][params.value] + '', facilitiesList[i][params.label])
  }
  return facilitiesMap
}
// 获取CheckBox的label,传入String:xxx,xxx2,xxx3……的字符串，里面的值是checkbox选择的value
export function getCheckBoxString(text, list, params) {
  let option = {
    label: 'label',
    value: 'value',
    ...params
  }
  let facilitiesMap = getCheckBoxMap(list, option)
  let result = ''
  if (text) {
    let arr = text.split(',')
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i]) {
        let key = arr[i] + ''
        let label = facilitiesMap.get(key)
        if (label) {
          result += label + ','
        }
      }
    }
    result = result.slice(0, result.length - 1)
  }
  return result
}

/**
 * 格式化手机号码,使中间的号码变成星星号
 * @param {Array} list 被遍历的数组
 */
export function parsePhoneStar(phone) {
  let star = '*****'
  let phoneStart = phone.slice(0, 3)
  let phoneEnd = phone.slice(8, 11)
  return phoneStart + star + phoneEnd
}

/**
 * 让被覆盖对象里面的值被覆盖对象覆盖。只会覆盖被覆盖对象存在的值
 * @param {Object} mainObj 被覆盖的对象
 * @param {Object} extraObj 覆盖对象
 * @param {Array} filter 过滤key列表 内部为字符串
 */
export function extendHasValue(mainObj, extraObj, filter = []) {
  let result = { ...mainObj }
  for (let key in mainObj) {
    if (extraObj[key] !== undefined && extraObj[key] !== null && extraObj[key] !== '' && !filter.includes(key)) {
      result[key] = extraObj[key]
    }
  }
  return result
}

/**
 * 去掉对象里面等于null与undefined与''的属性
 * @param {Object} option 对象
 */
export function removeNull(option) {
  if (!option) {
    return
  }
  for (var attr in option) {
    if (option[attr] === null || option[attr] === undefined || option[attr] === '') {
      delete option[attr]
      continue
    }
    if (typeof option[attr] === 'object') {
      removeNull(option[attr])
    }
  }
  return option
}

/**
 * 通过文件的url获取文件名称 例如：https://abc.com/file/123.xml 使用方法会获得123.xml
 * @param {String} url 地址
 * @param {Number} number 超过Number长度的文件名称会进行省略。0的话即为不省略。例如：123456.xml中，假如number为3的话，会变成123…….xml文件
 */
export function getUrlFileName(url, number) {
  let fileFullName = ''
  if (url) {
    let index = url.lastIndexOf('/') // '/所在的最后位置'
    fileFullName = url.substr(index + 1) // 截取文件名称字符串
    let pointIndex = fileFullName.lastIndexOf('.') // 最后.的位置
    let fileName = fileFullName.substr(0, pointIndex)
    let suffix = fileFullName.substr(pointIndex + 1)
    if (number) {
      fileName = fileName.substr(0, number) + '...'
    }
    fileFullName = fileName + '.' + suffix
  }
  return fileFullName
}

/**
   * 精确度的计数保留法 adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number}      The adjusted value.
   */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value)
  }
  value = +value
  exp = +exp
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN
  }
  // Shift
  value = value.toString().split('e')
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
  // Shift back
  value = value.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
}
// 精确度的计数保留法 四舍五入 0.15 -> 0.2
export function round(value, exp) {
  return decimalAdjust('round', value, exp)
}
// 精确度的计数保留法 向下取整计算 0.15 -> 0.1
export function floor(value, exp) {
  return decimalAdjust('floor', value, exp)
}
// 精确度的计数保留法 向上取整计算 0.15 -> 0.2
export function ceil(value, exp) {
  return decimalAdjust('ceil', value, exp)
}

// 把百分号四舍五入为个位数 并返回百分号
export function parPercentRound(string) {
  if (string.indexOf('%') !== -1) {
    let num = Number(string.replace('%', ''))
    return round(num, 0) + '%'
  } else {
    return string
  }
}

// 把数字转为百分号
export function parPercent(val) {
  if (val) {
    return mul(val, 100) + '%'
  } else {
    return val
  }
}

// 把数字转为中文
export function SectionToChinese(num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    alert("Number is wrong!")
    return "Number is wrong!"
  }
  var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九")
  var BB = new Array("", "十", "百", "千", "万", "亿", "点", "")
  var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = ""
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
          re = BB[4] + re
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re
    k++
  }
  if (a.length > 1) //加上小数部分(如果有小数部分)
  {
    re += BB[6]
    for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]
  }
  return re
}
