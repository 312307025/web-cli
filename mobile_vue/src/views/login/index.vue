<!-- 登录 -->
<template>
  <div class="container">
    <div class="route-loading" v-if="loading">
      <van-loading size="60" color="#1989fa" vertical>登录中...</van-loading>
    </div>
    <div v-else>
      异常！请重试
      <van-button type="warning" size="large" @click="login">重新登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setToken, removeToken } from '@/common/util/auth'

export default {
  data() {
    return {
      apiConfig: {},
      url: null,
      redirect_uri: null,
      loading: true,
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.wxLogin(this.$route.query.code)
    } else {
      this.login()
    }
  },
  methods: {
    // 配置企业微信
    login() {
      this.loading = true
      let redirect_uri = window.location.origin + window.location.pathname + ''
      redirect_uri = redirect_uri.replace('login', '')
      removeToken()
      this.$store.commit('setAccessToken', null)
      if (process.env.NODE_ENV !== 'development') {
        let state = 'login'
        axios.get('/api/userauth/wechat/workWechatQrAuthorize').then(res => {
          res = res.data
          let authorUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.data.appId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_base&state=' + encodeURIComponent(state) + '#wechat_redirect'
          window.location.href = authorUrl
        })
      } else {
        // 登录的手机号与工号可能会失效，可以试下工号：100251010，手机号：13212345612
        axios.post('/api/userauth/verify/loginByWorkWechatPhone?phone=13265174684&auth_type=workWechatSso').then(res => {
          let data = res.data
          if (data && data.token && data.token.access_token) {
            setToken(data.token.access_token)
            this.$store.commit('setAccessToken', data.token.access_token)
            this.$router.push('/')
          }
        })
      }
    },
    // 微信登录
    wxLogin(code) {
      axios.post('/api/userauth/verify/loginByWorkWechatUserId' + '?auth_type=workWechatSso&code=' + code).then(res => {
        res = res.data
        if (res.token && res.token.access_token) {
          setToken(res.token.access_token)
          this.$store.commit('setAccessToken', res.token.access_token)
          this.$router.push('/')
        } else {
          this.$toast.fail(res && res.msg ? res.msg : '登录请求发生错误，请稍后再试！')
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0;
}
.route-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
