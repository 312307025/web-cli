<template>
  <div class="wrap">
    <div class="fixed-box fixed-tabs">
      <div class="fixed-inner">
        <van-tabs v-model="active" border @change="tabChange">
          <van-tab title="全部"></van-tab>
          <van-tab title="筛选"></van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 数据列表 -->
    <div v-show="!active">
      <div class="fixed-box fixed-search">
        <div class="fixed-inner">
          <van-search style="text-align: left;" v-model="searchObj.contractInfo" show-action placeholder="请输入客户名称/手机号码" @search="search">
            <template #action>
              <van-button type="danger" @click="okSearch" size="small">搜索</van-button>
            </template>
          </van-search>
        </div>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list class="container" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <!-- 卡片 -->
          <div class="item" v-for="(item, index) in list" :key="index" @click="goDetails(item)">
            <div class="item-left">
              <!-- 头像 -->
              <van-image round width="24px" height="24px" :src="item.headImage" />
              <p class="text">{{ item.name | phone }}</p>
            </div>
            <div class="item-center">
              <p class="text">{{ item.phone }}</p>
              <p class="text">预约社区:{{ item.communityName }}</p>
              <p class="text">预约日期:{{ item.meetTime }}</p>
              <p class="text">最后跟进:{{ item.followTime }}</p>
            </div>
            <div class="item-right">
              <p class="text">{{ getLabelByValue(statusList, item.status)}}</p>
              <div class="more">
                更多
                <van-icon class="iconArrow" name="arrow" />
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 筛选区域 -->
    <van-form ref="form" @submit="onSubmit" class="search-form" v-show="active">
      <!-- 预约社区 -->
      <van-cell value="预约社区" />
      <div class="input-cell">
        <communityFullSelect ref="communityFullSelect" v-model="searchObj.communityId" label="" placeholder="请选择预约社区" :clearable="true"></communityFullSelect>
      </div>

      <van-cell value="预约日期" />
      <!-- 预约日期 -->
      <div class="input-cell">
        <calendar v-model="searchObj.meetTime" type="range" placeholder="请选择预约日期" :clearable="true"></calendar>
      </div>

      <van-cell value="预约单状态" />
      <!-- 预约日期 -->
      <div class="input-cell status-list">
        <van-button :type="searchObj.status === item.value ? 'danger' : 'default'" v-for="(item, index) in statusList" :key="index" @click="searchObj.status = item.value">{{item.label}}</van-button>
      </div>
      <!-- 按钮 -->
      <div class="input-cell submit-list">
        <van-button size="large" type="default" round @click="resetSearch">重置</van-button>
        <van-button size="large" type="danger" round @click="okSearch">确认</van-button>
      </div>
    </van-form>
    <!-- <van-empty description="没有任何的预约单" /> -->
  </div>
</template>

<script>
import tablePagesMixin from '@/common/mixins/tablePagesMixin'
import calendar from '@/components/calendar'
import communityFullSelect from '@/components/communityFullSelect'
import { removeNull, getLabelByValue, extendHasValue } from '@/common/util'
import { statusList } from './status'
import { mapGetters } from 'vuex'
import API from './model'

export default {
  mixins: [tablePagesMixin],
  components: { calendar, communityFullSelect },
  data() {
    return {
      searchObj: {
        communityId: null,
        meetTime: [],
        contractInfo: null,
        status: null,
      },
      useSearchObj: {},
      active: 0,
      statusList,
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters(['memberId', 'userId']),
  },
  methods: {
    // 切换筛选条件后记录滚动位置，返回时候回到之前的位置
    tabChange() {
      if (this.active) {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      } else {
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollTop)
        })
      }
    },
    // 重置搜索
    resetSearch() {
      this.useSearchObj = {}
      this.resetSearchFrom()
      this.search()
      this.scrollTop = 0
    },
    // 确认搜索条件
    okSearch() {
      this.useSearchObj = { ...this.searchObj }
      this.search()
      this.scrollTop = 0
      this.active = 0
    },
    getReq() {
      let params = {
        current: this.page,
        size: this.size,
        userId: this.userId,
        ...this.useSearchObj
      }
      if (params.meetTime && params.meetTime.length) {
        params.startFromDate = params.meetTime[0]
        params.endOfDate = params.meetTime[1]
      }
      delete params.meetTime
      return removeNull(params)
    },
    getTableDataList() {
      const req = this.getReq()
      return API.selectSeeRoomOrderList(req).then(res => {
        if (res && res.data) {
          res = res.data
          this.total = res.total
          this.list.push(...res.records)
        }
      })
    },
    goDetails(item) {
      this.$router.push({
        // name: 'bookingDetails',
        path: '/booking/bookingDetails',
        query: {
          id: item.bookSeeRoomId,
          headImage: item.headImage,
          type: 'look'
        }
      })
    },
    getLabelByValue
  }
}
</script>

<style lang="less" scoped>
.wrap {
}
.container {
  background: transparent;
  box-sizing: border-box;
  padding-bottom: 0;
}
.fixed-box.fixed-tabs {
  height: 88px;
}
.fixed-box.fixed-search {
  height: 116px;
}
.fixed-inner {
  z-index: 100;
  position: fixed;
  width: 100%;
  background: #fff;
}
.item {
  display: flex;
  background: #fff;
  align-items: stretch;
  padding: @padding-md @padding-xs;
  margin-top: @margin-md;
  border-radius: 20px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.15);
  font-size: @font-base;
}
.item:first-child {
  margin-top: 0;
}
.item-left,
.item-right {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
}
.item-left {
  width: 130px;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.item-left .text {
  .text-overflow();
  margin-top: @margin-xs;
}
.item-center {
  padding: @padding-xs;
  flex: 1 1 auto;
  width: 0;
}
.item-center .text {
  .text-overflow();
  line-height: 44px;
  color: @side-color;
}
.item-center .text:first-child {
  color: @text-color;
}
.item-right {
  justify-content: space-between;
}
.item-right .text {
  color: @red;
  text-align: right;
}
.item-right .more {
  color: @side-color;
}

// 筛选栏
.search-form {
  padding: @padding-md;
}
.input-cell {
  padding: @padding-md;
  background: #fff;
}
.search-form .input-cell + .van-cell {
  margin-top: @margin-base;
}
.search-form /deep/ .van-field {
  padding: @padding-base;
  // margin: 20px 32px;
  border: 1px solid #d9d9d9;
}
.status-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.status-list .van-button {
  flex: 0 0 auto;
  width: 22%;
  padding: 0;
  text-align: center;
  margin-top: @margin-base;
}
.submit-list {
  background: transparent;
  margin-top: @margin-base;
  display: flex;
  justify-content: space-between;
}
.submit-list .van-button {
  flex: 0 0 auto;
  width: 45%;
  padding: 0;
  text-align: center;
}
</style>
