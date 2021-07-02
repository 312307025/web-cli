import { http } from './../http'
const house = 'house' // 房源服务名

export default {
  // 通过社区id查询社区
  getCommunityByID: data => http.get(house + '/community/query/one', data, true),
  // 通过社区id查询房型列表
  getcommunityHouseStyleListByID: data => http.get(house + '/communityHouseStyle/query/list', data, true),
}
