const getters = {
  token: (state) => state.globel.token,
  memberId: (state) => state.globel.memberId,
  userId: (state) => state.globel.userId,
  name: (state) => state.globel.name,
  phone: (state) => state.globel.phone,
  communityInfo: (state) => state.globel.communityInfo,
  permissions: (state) => state.globel.permissions,
  resourceList: (state) => state.globel.resourceList,
  isAddDynamicMenuRoutes: (state) => state.globel.isAddDynamicMenuRoutes,
}
export default getters
