import { http } from './../http'
const userauth = 'userauth' // 用户信息服务名
const organization = 'organization'// 组织架构服务端口名

export default {
  loginByWorkWechatPhone: data => http.post(userauth + '/verify/loginByWorkWechatPhone', data, true), // 测试登录接口
  verifyLogou: data => http.post(userauth + '/verify/logout', data, true), // 登出
  getUserInfo: data => http.get(userauth + '/tokenInfo/getUserInfo', data), // 获取用户信息
  getResourceListByUserId: (data) => http.get(organization + '/roleResourceRelate/getResourceListByUserId', data), // 根据员工id查询所有资源信息
  getResourceTreeByUserId: (data) => http.get(organization + '/roleResourceRelate/getResourceTreeByUserId', data), // 根据员工id查询所有资源信息 以树的形式
}
