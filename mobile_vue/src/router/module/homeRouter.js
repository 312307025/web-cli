export const homeRouter = [
  {
    path: '/home',
    component: () => import('@/views/home'),
    name: 'home',
    meta: {
      title: '首页'
    },
  }
]
