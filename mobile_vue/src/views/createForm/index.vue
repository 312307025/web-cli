<template>
  <div class="container">
    <van-form @submit="ok" label-width="7.2em">
      <!-- 姓名 -->
      <van-field v-model="formItem.name" maxlength="20" show-word-limit name="姓名" label="姓名" placeholder="请输入姓名" :rules="[{ required: true, message: '姓名不能为空' }]" input-align="right" error-message-align="right" />

      <!-- 电话 -->
      <van-field v-model="formItem.phone" name="联系电话" label="联系电话" type="tel" placeholder="请输入联系电话" :maxlength="11" :rules="[{ required: true, message: '请填写您的手机号码！' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}]" input-align="right" error-message-align="right" />

      <!-- 预约社区 -->
      <communityFullSelect ref="communityFullSelect" v-model="formItem.communityId" label="预约社区" placeholder="请选择预约社区" inputAlign="right" :rules="[{ required: true, message: '预约社区不能为空' }]" @change="communityChange"></communityFullSelect>

      <!-- 看房日期 -->
      <calendar v-model="formItem.meetTime" label="看房日期" placeholder="请选择看房日期" inputAlign="right" :rules="[{ required: true, message: '预约日期不能为空' }]">
      </calendar>

      <div class="infoTit">更多信息（选填）</div>

      <!-- 意向房型 -->
      <selectPopup ref="houseStyleSelect" v-model="formItem.houseStyleId" label="意向房型" placeholder="请选择意向房型" :list="formItem.houseStyleList" inputAlign="right" :clickBefore="houseStyleClickBefore"></selectPopup>

      <!-- 价格范围 -->
      <van-field v-model="formItem.priceMin" type="digit" label="可接受最低价格" placeholder="请输入价格" input-align="right" error-message-align="right" maxlength="10" />

      <!-- 价格范围 -->
      <van-field v-model="formItem.priceMax" type="digit" label="可接受最高价格" placeholder="请输入价格" input-align="right" error-message-align="right" maxlength="10" />

      <!-- 期待入住时间 -->
      <calendar v-model="formItem.arrivalDate" label="期待入住时间" placeholder="请选择期待入住时间" inputAlign="right">
      </calendar>

      <van-field v-model="formItem.remark" autosize maxlength="100" show-word-limit rows="2" type="textarea" name="备注" label="备注" placeholder="请输入备注" style="margin-bottom:20px" />
      <van-button round block type="info" native-type="submit" :loading="loading">提交</van-button>
    </van-form>
  </div>
</template>

<script>
import { extendHasValue } from '@/common/util'
import handle from '@/common/mixins/handle'
import calendar from '@/components/calendar'
import selectPopup from '@/components/selectPopup'
import communityFullSelect from '@/components/communityFullSelect'
import houseApi from '@/common/api/houseApi'
import API from './model'
import { mapGetters } from 'vuex'

export default {
  mixins: [handle],
  components: { calendar, communityFullSelect, selectPopup },
  data() {
    return {
      formItem: {
        seeRoomSource: 3, // 来源 企业微信
        name: null, // 姓名
        phone: null, // 联系电话
        communityName: null, // 社区姓名
        communityPicture: null, // 社区图片
        communityId: null, // 社区id
        meetTime: null, // 看房日期
        houseStyleId: null, // 意向房型
        houseStyleName: null, // 意向房型
        priceMax: null, // 最高价
        priceMin: null, // 最低价
        arrivalDate: null, // 期待入住时间
        remark: null, // 备注
        houseStyleList: [], // 房型列表
      },
      titles: {
        add: '新增',
        edit: '更新',
      },
      type: 'add',
    }
  },
  computed: {
    ...mapGetters(['memberId', 'userId']),
  },
  mounted() { },
  methods: {
    add(params) {
      this.type = 'add'
      this.modal = true
    },
    edit(params) {
      this.formItem = extendHasValue(this.formItem, params)
      this.type = 'edit'
      this.modal = true
    },
    // 点击确认后
    ok() {
      let obj = { ...this.formItem }
      let community = this.$refs.communityFullSelect.getItem(obj.communityId)
      if (community) {
        obj.communityName = community.communityName
        obj.communityPicture = community.imageUrl
      }
      obj.houseStyleName = this.$refs.houseStyleSelect.getLabel(obj.houseStyleId)
      delete obj.houseStyleList
      if (obj.meetTime === this.$time().format('YYYY-MM-DD')) {
        obj.meetTime = this.$time().format('YYYY-MM-DD HH:mm:ss')
      } else {
        obj.meetTime = obj.meetTime + ' 09:00:00'
      }
      this.handelApi(API.addSeeRoomOrder(obj).then(res => {
        if (res && res.success) {
          this.successHandle({ text: res.msg ? res.msg : '新增成功!', cb: () => { this.$router.replace({ name: 'home' }) } })
        }
      }))
    },
    // 选择社区
    communityChange() {
      this.getHouseStyleList()
      this.formItem.houseStyleId = null
      this.formItem.houseStyleName = null
    },
    // 查询房型列表
    getHouseStyleList() {
      let { communityId } = this.formItem
      this.formItem.houseStyleList = []
      if (communityId) {
        houseApi.getcommunityHouseStyleListByID({ communityId }).then(res => {
          if (res && res.data) {
            this.formItem.houseStyleList = res.data.map(item => {
              item.value = item.houseStyleId
              item.label = item.houseStyleName
              return item
            })
          }
        })
      }
    },
    // 打开房型选择款前
    houseStyleClickBefore() {
      return new Promise((resolve, reject) => {
        if (this.formItem.communityId) {
          resolve()
        } else {
          this.$toast.fail('请先选择社区')
          reject('请先选择社区')
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.double-stepper {
  width: 100%;
  text-align: center;
}
.number-wrap {
  margin-left: auto;
}
.infoTit {
  padding: @padding-base;
  line-height: 44px;
  padding: @padding-lg 0 @padding-md 0;
  font-size: @font-md;
}
</style>
