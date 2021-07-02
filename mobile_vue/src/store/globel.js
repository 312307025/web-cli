import userApi from '@/common/api/userApi'
import houseApi from '@/common/api/houseApi'
import { getToken, removeToken } from '@/common/util/auth'
import { getTreeItemByValue } from '@/common/util'
import moduleRouter from '@/router/module'
import { constantRoutes } from '@/router'

const user = {
  state: {
    accessToken: getToken(),
    projectId: '1101072456829186060', // 请求移动端PMS资源树
    memberId: '',
    userId: '',
    name: '',
    phone: '',
    communityInfo: {
      communityId: null, // 社区ID
      communityName: null, // 社区名称
      rentTypeId: null, // 出租类型
      type: null, // 属于哪种出租类型的社区 1是房屋 2是房间 3是床位
      typeName: null, // 出租类型名称
      brandId: null, // 品牌类型
      brandName: null, // 品牌类型名称
      communityAreaId: null, // 社区区域ID
      communityHouseTypeId: null, // 房屋类型
      communityLabelIds: null, // 社区标签ID；多个标签用,隔开
      communityStatusId: null, // 社区状态
      communityStatusName: null, // 社区状态名称
      decorationType: null, // 装修类型
      manageTypeId: null, // 管理类型
      manageTypeName: null, // 管理类型名称
      companyId: null, // 公司ID
      bookFlag: null, // 是否接受预定，1 是 0 否
      communityAliasName: null, // 社区别名
      communityFax: null, // 传真
      communityPhone: null, // 电话
      communityCode: null, // 社区编码
      communityEmail: null, // 电子邮件
      principalId: null, // 社区总部负责人ID
    },
    permissions: new Set(),
    addRoutes: [],
    resourceList: [],
    isAddDynamicMenuRoutes: false, // 判断路由是否加载完成
    hasHome: false, // 判断是否有home的路由
    pageParam: {},
    breadcrumbList: [], // 头部面包屑列表
  },
  actions: {
    // 获取用户信息
    GetInfo({ commit, state, rootState }) {
      return new Promise((resolve, reject) => {
        userApi.getUserInfo()
          .then(res => {
            if (res && res.success) {
              commit('SETMEMBERID', res.data.memberId)
              commit('SETUSERID', res.data.userId)
              commit('SETNAME', res.data.userName)
              commit('SETPHONE', res.data.phone)
              resolve(res.data)
            } else {
              reject(error)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户可以访问的资源
    Permissions({ commit, state, rootState }) {
      const userId = state.userId
      const projectId = state.projectId
      return new Promise(resolve => {
        // 向后端请求路由数据
        let permissions = new Set()
        userApi.getResourceListByUserId({ userId, projectId }).then(res => {
          res.data.map((item, index) => {
            if (item.url != '') {
              permissions.add(item.url)
            }
          })
          commit('SETPERMISSIONS', permissions)
          resolve(res.data)
        })
      })
    },
    // 获取菜单栏
    GenerateRoutes({ commit, state, rootState }) {
      const userId = state.userId
      const projectId = state.projectId
      return new Promise(resolve => {
        // 向后端请求路由数据
        userApi.getResourceTreeByUserId({ userId, projectId }).then(res => {
          const accessedRoutes = []
          filterAsyncRouter(res.data, accessedRoutes)
          commit('SETRESOURCELIST', accessedRoutes)
          commit('SETHASHOME', hasHome)
          resolve(accessedRoutes)
        })
      })
    },
    // 获取社区信息
    communityInfo({ commit, state, rootState }) {
      const communityId = state.userInfo.communityId
      return new Promise(resolve => {
        // 向后端请求路由数据
        houseApi.getCommunityByID({ communityId }).then(res => {
          commit('SETCOMMUNITYINFO', res.data)
          resolve(res.data)
        })
      })
    },
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        userAPI.verifyLogou({ accessToken: state.accessToken }).then(() => {
          commit('SET_TOKEN', '')
          commit('SETISADDDYNAMICMENUROUTES', false)
          removeToken()
          localStorage.clear()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        console.log('退出登录')
        commit('SET_TOKEN', '')
        commit('SETISADDDYNAMICMENUROUTES', false)
        removeToken()
        resolve()
      })
    },
  },
  mutations: {
    SETCOMMUNITYINFO(state, params) {
      state.communityInfo = params
    },
    SETACCESSTOKEN(state, params) {
      state.accessToken = params
    },
    SETMEMBERID(state, params) {
      state.memberId = params
    },
    SETUSERID(state, params) {
      state.userId = params
    },
    SETNAME(state, params) {
      state.name = params
    },
    SETPHONE(state, params) {
      state.phone = params
    },
    SETPERMISSIONS(state, params) {
      state.permissions = params
    },
    SETRESOURCELIST(state, params) {
      state.addRoutes = params
      state.resourceList = constantRoutes.concat(params)
    },
    SETISADDDYNAMICMENUROUTES(state, params) {
      state.isAddDynamicMenuRoutes = params
    },
    SETHASHOME(state, params) {
      state.hasHome = params
    },
  },
}
let hasHome = false // 存在/home的权限
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, routes = []) {
  return asyncRouterMap.filter(route => {
    let item = getTreeItemByValue(moduleRouter, route.path, { value: 'path' })
    if (item.component) {
      // Layout组件特殊处理
      route.component = item.component
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, routes)
    }
    if (route.path === '/home') hasHome = true
    route.name = item.name
    route.meta = {
      ...item.meta,
      id: route.id,
      title: route.title,
      isMenu: route.isMenu,
      picUrl: route.picUrl,
    }
    // 使用children的模式会有问题，懒得改递归方法了，直接用个新数组存吧
    routes.push({ ...route, children: [] })
    return true
  })
}

// export const loadView = (view) => { // 路由懒加载
//   return (resolve) =>  require([`@/views/${view}`], resolve)
// }

export default user
