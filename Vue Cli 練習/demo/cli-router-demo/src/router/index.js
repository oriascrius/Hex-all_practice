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
  // 練習用 - > views/NewPage.vue
  {
    path: '/newpage',
    name: '新增頁面',
    component: () => import('../views/NewPage.vue'),
    // 子路由
    children: [
      {
        // 子路由 路徑不用 '/a'
        path: 'a',
        component: () => import('../views/ComponentA.vue'),
      },
      {
        // 子路由 不用 /
        path: 'b',
        component: () => import('../views/ComponentB.vue'),
      },
      {
        // :id，id 是 動態 的
        path: 'dynamicRouter/:id',
        component: () => import('../views/DynamicRouter.vue'),
      },
      {
        // 動態路由搭配 Props
        path: 'dynamicRouterByProps/:id',
        component: () => import('../views/DynamicRouterByProps.vue'),
        props: (route) => {
          console.log('route', route);
          return {
            id: route.params.id,
          };
        },
      },
      {
        path: 'routerNavigation',
        component: () => import('../views/RouterNavigation.vue'),
      },
      {
        // NamedView.vue'
        path: 'namedView',
        component: () => import('../views/NamedView.vue'),
        // 子路由
        children: [
          {
            // 路徑 c2a，是指 left 是 ComponentC，right 是 ComponentA
            path: 'c2a',
            // 這裡有加 s，因為 components 下放多個
            components: {
              left: () => import('../views/ComponentC.vue'),
              right: () => import('../views/ComponentA.vue'),
            },
          },
          {
            // 路徑 a2b，是指 left 是 ComponentA，right 是 ComponentB
            path: 'a2b',
            // 這裡有加 s，因為 components 下放多個
            components: {
              left: () => import('../views/ComponentA.vue'),
              right: () => import('../views/ComponentB.vue'),
            },
          },
        ],
      },
    ],
  },
  // 404 頁面
  // http://localhost:8080/#/，網址後接隨便錯誤網址，會呈現 404 頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
  // 重新導向 頁面
  // http://localhost:8080/#/newpage，網址後接隨便錯誤網址，會導向 home 頁面
  {
    path: '/newpage/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

// 路由選項
const router = createRouter({
  // history 是 路由選項裡面的功能
  history: createWebHashHistory(),
  routes,
  // linkActiveClass 是 路由選項裡面的功能，當選擇時高亮
  // 路由啟動時，連結會呈現 active 狀態
  // active 是 bootstrap 樣式
  // 這邊當初有問題，我沒有加就有類似點擊高亮了
  // linkActiveClass: 'active',

  // 在页面之间导航时控制滚动的函数
  scrollBehavior(to, from, savedPosition) {
    // `to` 和 `from` 都是路由地址
    // `savedPosition` 可以为空，如果没有的话。
    console.log(to, from, savedPosition);
    // fullpath 可以在上面 console.log 看到三個參數
    if (to.fullpath.match('newPage')) {
      return {
        top: 500,
      };
    }
    return {

    };
  },
});

export default router;
