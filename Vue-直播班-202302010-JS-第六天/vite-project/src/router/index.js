import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/apple',
      component: () => import('../views/AppleView.vue'),
    },
    // 商品列表
    {
      path: '/products',
      component: () => import('../views/ProductsView.vue'),
    },
    // 單一商品
    {
      path: '/product/:id', // 動態路由
      component: () => import('../views/ProductView.vue'),
    },
    // 後臺頁面
    {
      path: '/admin', 
      component: () => import('../views/admin/DashboardView.vue'),
      // 子路由，不用寫 /
      // 後臺頁面的商品列表
      children: [
       {
        path: 'products', 
        component: () => import('../views/admin/AdminProducts.vue'),
       },
      ],
    },
  ]
})

export default router
