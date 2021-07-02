<template>
  <div>
    <div class="header" @click="check">
      <div class="img">
        <h1>系统维护升级中</h1>
      </div>
    </div>
    <div class="main">
      <img class="img" :src="require('@/assets/systemMaintenance.png')">
      <p class="subtitle">维护升级时间预计</p>
      <p class="time">2020年5月27日 22:00 到 2020年5月28日 5:00</p>
      <p class="tip">请在升级完成后再次刷新访问</p>
    </div>
  </div>
</template>
<script>
import systemApi from '@/common/api/systemApi'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.check()
    setInterval(() => {
      this.check()
    }, 600000)
  },
  methods: {
    check () {
      systemApi.checkMaintenance().then(flag => {
        if (!flag) {
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

.header {
  padding: 5px 10px;
  box-shadow: 0px 2px 6px 0px rgba(15, 16, 17, 0.3);
}

.header .img {
  height: 60px;
  line-height: 60px;
  background-image: url('~@/assets/logo.png');
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 120px auto;
  text-align: center;
}

.header h1 {
  margin: 0;
}

.main {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.main .img {
}

p {
  margin: 0 0 10px 0;
}

.subtitle {
  font-size: 20px;
}

.time {
  font-size: 24px;
  font-weight: bold;
}

.tip {
  font-size: 16px;
  color: #666;
}

@media screen and (max-width: 600px) {
  body {
    background: #000;
  }
}
</style>
