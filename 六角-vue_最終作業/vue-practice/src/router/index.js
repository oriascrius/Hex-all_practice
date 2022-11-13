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
  // 登入畫面
  {
    path: '/login', // 網址
    component: () => import('../views/LoginView.vue'),
  },
  // 驗證登入後畫面
  {
    path: '/dashboard', // 網址
    component: () => import('../views/DashboardView.vue'),
    children: [
      // 產品列表 畫面
      {
        path: 'products', // 網址，注意這邊不用 /
        component: () => import('../views/ProductsView.vue'),
      },
      // 訂單
      {
        path: 'orders',
        component: () => import('../views/OrdersView.vue'),
      },
      // 優惠券
      {
        path: 'coupons',
        component: () => import('../views/CouponsView.vue'),
      },
    ],
  },
  // 用戶端，不需要驗證流程的 放在 user 下
  {
    path: '/user',
    component: () => import('../views/UserboardView.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCartView.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProductView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
