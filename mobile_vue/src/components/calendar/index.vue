<template>
  <div>
    <van-field readonly clickable name="calendar" :value="time" :label="label" :placeholder="placeholder" @click="show = true" @click-right-icon.stop="clear" :rules="rules" :input-align="inputAlign" :error-message-align="inputAlign" :style="inputStyle" :right-icon="rightIcon" />
    <van-calendar :type="type" :show-confirm="false" v-model="show" @confirm="confirm" allow-same-day :minDate="minDate || dMinDate" :maxDate="maxDate || dMaxDate" />
  </div>
</template>

<script>
export default {
  props: {
    // 可用 single(选择单个日期)、range(选择日期区间)
    type: {
      type: String,
      default: 'single'
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    rules: {
      type: Array,
      default: []
    },
    value: {
      type: [String, Array],
      default: null
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    inputStyle: {
      type: Object,
      default: 'left'
    },
    minDate: {
      type: Date,
      default: null
    },
    maxDate: {
      type: Date,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dMinDate: this.$time().subtract(10, 'years').toDate(),
      dMaxDate: this.$time().add(10, 'years').toDate(),
      time: null,
      show: false
    }
  },
  computed: {
    rightIcon() {
      return this.time && this.clearable ? 'cross' : 'arrow-down'
    }
  },
  methods: {
    // 清空值
    clear() {
      if (this.rightIcon === 'arrow-down') this.show = true
      if (!this.clearable) return false
      let temp
      if (this.type === 'range') {
        temp = []
      } else {
        temp = null
      }
      this.updata(temp)
    },
    confirm(val) {
      let date
      if (this.type === 'range') {
        // 选择日期区间
        let [start, end] = val
        start = this.$time(start).format('YYYY-MM-DD')
        end = this.$time(end).format('YYYY-MM-DD')
        this.time = `${start} - ${end}`
        date = [start, end]
      } else {
        this.time = this.$time(val).format('YYYY-MM-DD')
        date = this.time
      }
      this.updata(date)
      this.show = false
    },
    updata(val) {
      this.$emit('input', val)
      this.$emit('confirm', val)
      this.$emit('change', val)
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (Array.isArray(newVal)) {
          this.time = newVal.join(' - ')
        } else {
          this.time = newVal
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>
