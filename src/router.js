import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';


const routes = [
    {
    name: 'redirect',
    path: '/:',
    redirect: {
      name: 'home',
    },
  },
  // {
  //   name: 'notFound',
  //   path: '/:path(.*)+',
  //   redirect: {
  //     name: 'home',
  //   },
  // },
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
    // params: { userCode: 'gets removed' },
    component: () =>
      import('./view/home.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// router.beforeEach((to, from, next) => {
//   // const title = to.meta && to.meta.title;
//   // if (title) {
//   //   document.title = title;
//   // }
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// });

export  default router ;
