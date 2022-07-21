import Layout from '@/layout'

export default {
  path: '/data',
  name: 'data',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/数据统计'),
    meta: {
      title: '数据统计', icon: 'link'
    }
  }]
}
