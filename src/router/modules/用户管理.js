import Layout from '@/layout'

export default {

  path: '/users',
  name: 'users',
  component: Layout,
  meta: { title: '用户管理', icon: 'user' },
  children: [{
    path: '',
    name: 'users',
    component: () => import('@/views/用户管理/用户列表'),
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/用户管理/用户列表/index.vue'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  }]

}

