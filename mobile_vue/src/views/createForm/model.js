import { http } from '@/common/http'
const operation = 'operation' // 运营服务

export default {
  // 存储预约信息
  addSeeRoomOrder: data => http.post(operation + '/bookSeeRoom/addSeeRoomOrder', data, true),
}
