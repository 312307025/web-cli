/**
 * 混入时，确保你的表格数据请求函数名为getTableDataList，而不是其它命名
 */
const tablePagesMixin = {
  components: {
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      list: [],
      routerName: this.$route.name,
      pageParam: {},
      loading: false,
      finished: false,
      refreshing: false,
      firstAuto: false, // 第一次先自动查询一次报表 在searchBox里面的社区搜索条件有设置empty为false的话，这里需要改为false，不然会出现查询两次的问题
      defaultSearchObj: null,
    }
  },
  created() {
    if (this.searchObj) {
      this.defaultSearchObj = JSON.parse(JSON.stringify(this.searchObj))
    }
  },
  mounted() {
    this.page = 1
    this.size = 10
    setTimeout(() => {
      if (this.firstAuto) this.getTableDataListHandle()
    }, 10)
  },
  methods: {
    // 触发查询
    search() {
      this.refreshing = true
      this.onRefresh()
    },
    /**
     * 切换页码 新增了isTabPage与tabPageKey两个参数用于处理页面时tab来分功能的。即路由相同，里面有俩个页面的。比如推送虚拟58房源这类的。
     * @param {Boolean} isTabPage 是否启用子分页
     * @param {String} tabPageKey 子分页的key值，用于获取分页与存储分页数据
     */
    pageCur(page) {
      this.page = page
      this.getTableDataListHandle()
    },
    // 切换每页条数
    sizeCount(size) {
      this.size = size
      if (this.page === 1) {
        this.getTableDataList()
      }
    },
    onLoad() {
      if (this.refreshing) {
        this.page = 1
        this.list = []
        this.refreshing = false
      }
      this.pageCur(this.page)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    getTableDataListHandle() {
      this.getTableDataList().finally(() => {
        this.page++
        this.loading = false
        if (this.page * this.size >= this.total) this.finished = true
      })
    },
    resetSearchFrom() {
      if (this.defaultSearchObj) {
        this.searchObj = JSON.parse(JSON.stringify(this.defaultSearchObj))
      }
    }
  },
}

export default tablePagesMixin
