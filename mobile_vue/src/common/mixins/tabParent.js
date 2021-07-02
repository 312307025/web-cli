/**
 * 混入Tab的对象，
 */
const tabParent = {
  components: {},
  data() {
    return {
      tabsId: 'name1',
      params: {}
    }
  },
  created: function() {
    let { query } = this.$route
    this.params = query
    this.changeTab(query)
    if (this.changeTabThen) this.changeTabThen()
  },
  methods: {
    changeTab(params) {
      params = { ...this.params, ...params }
      if (params.tabsId) {
        this.tabsId = params.tabsId
      } else {
        params.tabsId = this.tabsId
      }
      this.$router.replace({
        path: this.$route.path,
        query: params
      })
    },
    change(e, e2) {
      this.changeTab({ tabsId: e })
    }
  }
}

export default tabParent
