<template>
  <div id="app">
    <router-view v-if="isAddDynamicMenuRoutes || isSkipLoading"></router-view>
    <div class="route-loading" v-else>
      <van-loading size="60" color="#1989fa" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() { },
  computed: {
    ...mapGetters(['isAddDynamicMenuRoutes']),
    isSkipLoading() {
      return Boolean(this.$route && this.$route.meta && this.$route.meta.isSkipLoading)
    }
  },
}
</script>

<style lang="less" scoped>
.route-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
