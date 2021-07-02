/**
 * 混入
 */
import API from './model'

const mixin = {
  data() {
    return {
      communityList: [],
    }
  },
  methods: {
    // 查询社区全部区域配置数据
    getCommunityList() {
      if (window.localStorage) {
        let obj = window.localStorage.getItem('communityListObj')
        if (obj) {
          obj = JSON.parse(obj)
          if (obj.version === this.$time().format('YYYYMMDDHH')) {
            this.communityList = obj.list
            if (this.communityListThen) this.communityListThen(this.communityList)
          } else {
            this.getCommunityListApi()
          }
        } else {
          this.getCommunityListApi()
        }
      } else {
        this.getCommunityListApi()
      }
    },
    getCommunityListApi() {
      API.getCommunity().then(res => {
        if (res && res.data) {
          this.communityList = res.data.map(item => {
            return {
              key: item.communityId,
              value: item.communityId,
              label: item.communityName,
              communityId: item.communityId,
              communityName: item.communityName,
              communityStatusName: item.communityStatusName,
              communityAreaId: item.communityAreaId,
              imageUrl: item.imageUrl,
            }
          })
          let obj = {
            version: this.$time().format('YYYYMMDDHH'),
            list: this.communityList
          }
          window.localStorage.setItem('communityListObj', JSON.stringify(obj))
          if (this.communityListThen) this.communityListThen(this.communityList)
        }
      })
    },
  },
  mounted() {
    this.getCommunityList()
  }
}

export default mixin
