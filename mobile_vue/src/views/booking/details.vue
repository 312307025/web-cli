<template>
  <div class="container">
    <div class="item">
      <div class="item-left">
        <!-- 头像 -->
        <van-image round width="24px" height="24px" :src="formItem.headImage" />
        <p class="text">{{ formItem.name }}</p>
      </div>
      <div class="item-center">
        <p class="text">{{ formItem.phone }}</p>
        <p class="text">预约日期:{{ formItem.meetTime }}</p>
        <p class="text">预约社区:{{ formItem.communityName }}</p>
      </div>
      <div class="item-right">
        <p class="text">{{ getLabelByValue(statusList, formItem.status)}}</p>
      </div>
    </div>
    <div class="details-inner">
      <van-cell center title="来源渠道" :value="getLabelByValue(seeRoomSourceList, formItem.seeRoomSource)" />
      <van-cell center title="意向房型" :value="formItem.houseStyleName" />
      <van-cell center title="价格范围" :value="price" />
      <van-cell center title="期望入住时间" :value="formItem.arrivalDate" />
      <van-cell center title="备注" :value="formItem.remark" :value-class="{remark: formItem.remark && formItem.remark.length > 10}" />
    </div>
    <van-button class="submit-btn" @click="$router.go(-1)" round block type="danger" native-type="submit">关闭</van-button>
  </div>
</template>

<script>
import handle from '@/common/mixins/handle'
import { statusList, seeRoomSourceList } from './status'
import { extendHasValue } from '@/common/util'
import API from './model'

export default {
  mixins: [handle],
  data() {
    return {
      formItem: {
        headImage: null,
        name: null,
        phone: null,
        communityName: null,
        meetTime: null,
        followTime: null,
        status: null,
        seeRoomSource: null,
        houseStyleName: null,
        priceMin: null,
        priceMax: null,
        arrivalDate: null,
        remark: null,
      },
      type: 'look',
      statusList,
      seeRoomSourceList,
    }
  },
  computed: {
    price() {
      let { priceMin, priceMax } = this.formItem
      let result = ''
      if (!priceMin) priceMin = 0
      if (!priceMax) priceMax = 0
      if (priceMin || priceMax) return priceMin + ' - ' + priceMax
      return result
    }
  },
  mounted() {
    this._runInit()
  },
  methods: {
    look(query) {
      this.type = 'look'
      this.getDetails(query.id)
      this.formItem.headImage = query.headImage
    },
    getDetails(id) {
      if (id) {
        API.selectSeeRoomOrderById({ bookSeeRoomId: id }).then(res => {
          if (res && res.success) this.formItem = extendHasValue(this.formItem, res.data)
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
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
}
.item-left {
  width: 130px;
  text-align: center;
  line-height: 44px;
  min-height: 44px;
}
.item-left .text {
  .text-overflow();
  margin-top: @margin-xs;
}
.item-left .van-image {
  vertical-align: top;
  margin-top: @margin-md;
}
.item-center {
  padding: @padding-xs;
  flex: 1 1 auto;
  width: 0;
}
.item-center .text {
  .text-overflow();
  line-height: 44px;
  min-height: 44px;
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
  margin-right: @margin-md;
}
.details-inner {
  margin-top: @margin-md;
}
.submit-btn {
  margin-top: @margin-md;
}
.remark {
  text-align: left;
}
</style>
