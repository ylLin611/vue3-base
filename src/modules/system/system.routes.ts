import Layout from '@/layout/Layout.vue'

export default [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'test',
        component: () => import('./test/views/Test.vue'),
        name: 'AuthRole',
        meta: { title: 'test', activeMenu: '/system/user' },
      },
    ],
  },
]
