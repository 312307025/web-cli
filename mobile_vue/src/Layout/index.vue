<template>
  <div class="layout">
    <van-nav-bar v-if="nav.title || nav.show" :title="nav.title" :left-text="nav.left.text" :right-text="nav.right.text" :left-arrow="nav.left.arrow" @click-left="nav.left.click" @click-right="nav.right.click" fixed placeholder />
    <div class="inner" :class="minHeight">
      <!-- <keep-alive>
        <router-view v-if="$route.meta.isKeep"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.isKeep"></router-view> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: [
        {
          text: '',
          arrow: false,
        },
        {
          text: '返回',
          arrow: true,
          click: () => {
            this.$router.back()
          }
        }
      ],
      right: [
        {
          text: '',
          arrow: false,
        },
      ],
      nav: {},
    }
  },
  computed: {
    minHeight() {
      let result = ''
      if (this.nav.title || this.nav.show) {
        result = 'onlyHeader'
      }
      return result
    }
  },
  mounted() {
  },
  watch: {
    '$route.meta': {
      handler(newVal, oldVal) {
        if (newVal) {
          this.nav.title = newVal.title
          this.nav.show = newVal.show
          switch (newVal.type) {
            case 0:
              this.nav.left = this.left[0]
              this.nav.right = this.right[0]
              break
            case 1:
              this.nav.left = this.left[1]
              this.nav.right = this.right[0]
              break

            default:
              this.nav.left = this.left[0]
              this.nav.right = this.right[0]
              break
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  background-color: @background-color;
}
.inner {
  min-height: 100vh;
}
.inner.onlyHeader {
  min-height: calc(100vh - 92px);
}
</style>
