<template>
  <!-- 全部社区的社区选择 -->
  <div>
    <van-field readonly clickable :label="label" :value="name" :placeholder="placeholder" @click="show = true" @click-right-icon.stop="clear" :rules="rules" :input-align="inputAlign" :error-message-align="inputAlign" :style="inputStyle" :right-icon="rightIcon" />
    <van-popup v-model="show" round position="bottom">
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" />
      <van-picker :value-key="nameLabel" show-toolbar :columns="filterCommunityList" @cancel="show = false" @confirm="confirm" />
    </van-popup>
  </div>
</template>

<script>
import { getLabelByValue } from '@/common/util'
import communityList from '@/common/mixins/searchItem/communityList'

export default {
  mixins: [communityList],
  props: {
    label: {
      type: String,
      default: '社区'
    },
    placeholder: {
      type: String,
      default: '请选择社区'
    },
    rules: {
      type: Array,
      default: []
    },
    value: {
      type: String,
      default: null
    },
    idLabel: {
      type: String,
      default: 'communityId'
    },
    nameLabel: {
      type: String,
      default: 'communityName'
    },
    inputAlign: {
      type: String,
      default: 'left'
    },
    inputStyle: {
      type: Object,
      default: 'left'
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchVal: null,
      id: null,
      show: false
    }
  },
  computed: {
    name() {
      return getLabelByValue(this.communityList, this.id, { label: this.nameLabel, value: this.idLabel })
    },
    filterCommunityList() {
      if (this.searchVal) {
        return this.communityList.filter(item => item.communityName.indexOf(this.searchVal) !== -1)
      } else {
        return this.communityList
      }
    },
    rightIcon() {
      return this.name && this.clearable ? 'cross' : 'arrow-down'
    }
  },
  methods: {
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
      return getLabelByValue(this.communityList, val, { label: this.nameLabel, value: this.idLabel })
    },
    getItem(val) {
      return getLabelByValue(this.communityList, val, { label: this.nameLabel, value: this.idLabel, entire: true })
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
