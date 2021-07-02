export const operationRouter = [
  {
    path: '/createForm',
    component: () => import('@/views/createForm'),
    name: 'createForm',
    meta: {
      title: '创建预约单',
      type: 1
    },
  },
  {
    path: '/booking',
    component: () => import('@/views/booking'),
    name: 'booking',
    meta: {
      title: '预约看房',
      type: 1,
      isKeep: true
    },
  },
  {
    path: '/booking/bookingDetails',
    component: () => import('@/views/booking/details'),
    name: 'bookingDetails',
    meta: {
      title: '预约看房详情',
      type: 1
    },
  }
]
