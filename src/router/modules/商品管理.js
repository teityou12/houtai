import Layout from '@/layout'

export default {
  path: '/goods',
  name: 'goods',
  component: Layout,

  meta: {
    title: '商品管理', icon: 'form'
  },

  children: [
    {
      path: '/goodslist', name: 'goodslist', component: () => import('@/views/商品管理/商品列表/index.vue'), meta: {
        title: '商品列表', icon: 'table'
      }

    },

    {
      path: '/goods/add', name: 'goodsadd', component: () => import('@/views/商品管理/商品列表/components/Add.vue'),
      meta: { title: '添加商品' },
      hidden: true
    },

    {
      path: '/classindex', name: 'classindex', component: () => import('@/views/商品管理/分类参数/index.vue'), meta: {
        title: '分类参数', icon: 'table'
      }
    },
    {
      path: '/goodsclass', name: 'goodsclass', component: () => import('@/views/商品管理/商品分类/index.vue'), meta: {
        title: '商品分类', icon: 'table'
      }
    }
  ]

}
