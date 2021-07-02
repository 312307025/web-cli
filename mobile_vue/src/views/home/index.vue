<template>
  <div class="container">
    <div class="box">
      <p class="title">常用工具</p>
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item icon="home-o" text="路由跳转" to="/createForm" v-if="isAuth('/createForm')">
          <van-image width="54px" height="54px" :src="require('./icon_1.png')" />
          <p class="titleTxt">创建预约单</p>
        </van-grid-item>
        <van-grid-item icon="chat-o" text="URL 跳转" to="/booking" v-if="isAuth('/booking')">
          <van-image width="54px" height="54px" :src="require('./icon_2.png')" />
          <p class="titleTxt">预约看房</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- <div class="box">
      <p class="title">其他工具</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.box {
  margin-top: 16px;
}
.box:first-child {
  margin-top: 0;
}
.title {
  margin-bottom: 16px;
  color: #4a4a4a;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
}
.titleTxt {
  font-size: 24px;
  color: #000;
  margin-top: @margin-md;
}
</style>
