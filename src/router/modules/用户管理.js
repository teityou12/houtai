import Layout from '@/layout'

export default {

  path: '/users',
  name: 'users',
  component: Layout,
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children:
    [
      {
        path: '', component: () => ('@/views/用户管理'), children: [
          { path: '/users/userslist', component: () => ('@/views/用户管理/用户列表'), meta: { title: '用户列表', icon: 'table' } }

        ]
      }

    ]
}

