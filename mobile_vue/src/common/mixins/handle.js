import { getLabelByValue, removeNull } from '@/common/util'
/**
 * 混入Tab的对象，
 */
const handle = {
  data() {
    return {
    }
  },
  methods: {
    // 初始化方法，运行初始化方法 比如 add、edit等，必须要定义
    _runInit() {
      let { type } = this.$route.query
      if (type) {
        this.type = type
      }
      if (this.type) this[this.type](this.$route.query, this.$route.params)
    },
    // 判断按钮是否可以使用的或
    canUse(list) {
      return list.includes(this.type)
    },
    // 判断按钮是否可以使用的或
    canNotUse(list) {
      return !list.includes(this.type)
    },
    // 操作成功后统一处理方法 obj.text提示语句 obj.data回调的参数 obj.cb回调方法 obj.notReset重置表单默认为false
    successHandle(obj) {
      let params = {
        text: null,
      }
      if (obj) {
        if (typeof obj === 'string') {
          params.text = obj
        } else {
          params = { ...params, ...obj }
        }
      }
      if (params.text) {
        this.$toast.success({ message: params.text, onClose: params.cb, overlay: true, closeOnClickOverlay: true })
      } else {
        params.cb && params.cb()
      }
    },
    // 操作发生错误后统一处理方法
    errorHandle(text) {
      if (text) {
        this.$toast.fail(text)
      }
      this.hideLoading(true)
    },
    showLoading() {
      this.loading = true
    },
    // 隐藏loading框 flag 是否需要延时关闭loading，在弹出框的模式下推荐使用，因为关闭弹出框是有动画效果的，可能弹出框没关闭，就可以点击按钮了。
    hideLoading(flag) {
      if (this.loading) {
        if (flag) {
          setTimeout(() => {
            this.loading = false
          }, 500)
        } else {
          this.loading = false
        }
      }
    },
    // 处理方法 自动把确认按钮的loading去掉
    handelApi(api) {
      this.showLoading()
      return api.finally(() => {
        this.hideLoading(true)
      })
    },
    getLabelByValue
  }
}

export default handle
