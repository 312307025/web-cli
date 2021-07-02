<template>
  <div class='not-permission'>
    <div class="button-box">
      出现顶级域名cookie污染，请尝试点击下方按钮删除cookie或者手动清除浏览器缓存（cookie缓存）
    </div>
    <div class="logout">
      <Button type="success" @click="clear">注销当前全部域名cookie</Button>
    </div>
  </div>
</template>
<script>
import { removeAllToken } from '@/common/util/auth'

export default {
  data() {
    return {
    }
  },
  methods: {
    clear() {
      removeAllToken()
      this.$router.push('/')
    }
  }
}
</script>
