import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/IndexView.vue'),
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: '/product/:id',
        name: '產品頁面',
        component: () => import('../views/ProductView.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/ErrorView.vue'),
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/ProductsView.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/OrdersView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
