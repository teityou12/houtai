import Layout from '@/layout'

export default {
  path: '/goods',
  name: 'name',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/商品管理'),
    meta: {
      title: '商品管理', icon: 'form'
    }
  }]
}
