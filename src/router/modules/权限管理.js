import Layout from '@/layout'

export default {
  path: '/authority',
  name: 'authority',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/权限管理'),
    meta: {
      title: '权限管理', icon: 'password'
    }

  }]
}
