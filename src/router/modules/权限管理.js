import Layout from '@/layout'

export default {
  path: '/authority',
  name: 'authority',
  component: Layout,
  meta: {
    title: '权限管理', icon: 'password'
  },
  children: [
    {
      path: '/rolesist', name: 'rolesist', component: () => import('@/views/权限管理/角色列表/index.vue'), meta: {
        title: '角色列表', icon: 'table'
      }
    },
    {
      path: '/powerlist', name: 'powerlist', component: () => import('@/views/权限管理/权限列表/index.vue'), meta: {
        title: '权限列表', icon: 'table'
      }
    }

  ]
}
