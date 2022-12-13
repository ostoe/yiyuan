import { createRouter, createWebHashHistory } from 'vue-router';

const routes1 = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'goods',
    },
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心',
    },
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车',
    },
  },
  {
    name: 'goods',
    path: '/goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情',
    },
  },
];

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'login',
    },
  },
  {

    path: '/login',
    name: 'login',
    component: () =>
      import('./view/login.vue'),
    meta: {
      title: '登录',
    },
  },

  {

    path: '/admin',
    name: 'admin',
    component: () =>
      import('./view/admin.vue'),
    meta: {
      title: '登录',
    },
  },

  {
    path: '/home',
    name: 'home',
    component: () =>
      import('./view/home.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  // const title = to.meta && to.meta.title;
  // if (title) {
  //   document.title = title;
  // }
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
});

export  default router ;
