import { http } from '@/common/http'
const operation = 'operation' // 运营服务

export default {
  // 获取预约信息分页
  selectSeeRoomOrderList: data => http.post(operation + '/bookSeeRoom/selectSeeRoomOrderList', data, true),
  selectSeeRoomOrderById: data => http.get(operation + '/bookSeeRoom/selectSeeRoomOrderById', data, true),
}
