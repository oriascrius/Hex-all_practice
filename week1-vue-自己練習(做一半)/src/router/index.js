import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  // 登入
  {
    path: '/login', // 網址
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  // 驗證登入 -> 拿到 token -> 再想成放畫面的框框
  {
    path: '/dashboard', // 網址
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    children: [
      // 產品列表
      {
        path: 'products', // 網址 -> 子網址這裡不用加上 /
        name: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
