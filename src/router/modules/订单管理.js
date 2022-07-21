import Layout from '@/layout'

export default {
  path: '/orders',
  name: 'orders',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/订单管理'),
    meta: {
      title: '订单管理', icon: 'example'
    }
  }]
}
