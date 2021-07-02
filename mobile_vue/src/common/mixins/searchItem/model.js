import { http } from '@/common/http'
const account = 'account' // 账单服务
const house = 'house' // 房源服务

export default {
  // 查找所有费用项
  getBillSubjectList: data => http.get(account + '/billSubject/getList', data),
  // 全部社区
  getCommunity: data => http.get(house + '/community/query/all', data),
}
