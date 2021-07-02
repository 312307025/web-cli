<template>
  <!-- 弹出下拉框选择 -->
  <div>
    <van-field readonly clickable :label="label" :value="name" :placeholder="placeholder" @click="showHandle" @click-right-icon.stop="clear" :rules="rules" :input-align="inputAlign" :error-message-align="inputAlign" :right-icon="rightIcon" />
    <van-popup v-model="show" round position="bottom">
      <van-picker :value-key="nameLabel" show-toolbar :columns="list" @cancel="show = false" @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
import { getLabelByValue } from '@/common/util'

export default {
  props: {
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
      default: () => { return [] }
    },
    value: {
      type: String,
      default: null
    },
    idLabel: {
      type: String,
      default: 'value'
    },
    nameLabel: {
      type: String,
      default: 'label'
    },
    list: {
      type: Array,
      default: () => { return [] }
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    clickBefore: {
      type: Function,
      default: () => {
        return new Promise((resolve => { resolve() }))
      }
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: null,
      // name: null,
      show: false
    }
  },
  computed: {
    name() {
      return getLabelByValue(this.list, this.id, { label: this.nameLabel, value: this.idLabel })
    },
    rightIcon() {
      return this.name && this.clearable ? 'cross' : 'arrow-down'
    }
  },
  methods: {
    showHandle() {
      this.clickBefore().then(() => {
        this.show = true
      })
    },
    // 清空值
    clear() {
      if (this.rightIcon === 'arrow-down') this.show = true
      if (!this.clearable) return false
      let temp = {}
      temp[this.idLabel] = null
      temp[this.nameLabel] = null
      this.name = null
      this.id = null
      this.updata(temp)
    },
    confirm(val) {
      this.updata(val)
      this.show = false
    },
    updata(val) {
      this.id = val[this.idLabel]
      this.$emit('input', val[this.idLabel])
      this.$emit('confirm', val)
      this.$emit('change', val)
    },
    getLabel(val) {
      return getLabelByValue(this.list, val, { label: this.nameLabel, value: this.idLabel })
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.id = newVal
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style>
</style>
