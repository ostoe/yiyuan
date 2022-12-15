import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'login',
    },
    meta: {
      title: '核酸标记查询'
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
      title: '核酸查询导出'
    },
  },

  {
    path: '/home',
    name: 'home',
    meta: {
      title: '核酸标记查询'
    },
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
