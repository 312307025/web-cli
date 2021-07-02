<template>
  <div class='not-permission'>
    <div class="button-box">
      没有资源权限
    </div>
    <div class="logout">
      <Button type="success" @click="logout">注销当前登录</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style scoped>
.not-permission {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  .button-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 525px;
    height: 80px;
    margin: auto;
    .icon-button {
      width: 220px;
      height: 80px;
      display: inline-block;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 80px;
      cursor: pointer;
    }
    .button-blue {
      background: #fff;
      background-size: 100% 100%;
      margin-right: 80px;
    }
    .button-orange {
      background: #fff;
      background-size: 100% 100%;
    }
  }
  .logout {
    position: absolute;
    right: 32px;
    top: 22px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
