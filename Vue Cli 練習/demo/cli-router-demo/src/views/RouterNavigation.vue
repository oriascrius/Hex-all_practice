<template>
  <button
    type="button"
    @click="getRoute"
  >getRoute</button>
  <button
    type="button"
    @click="push"
  >
    Push</button>
  <button
    type="button"
    @click="replace"
  >
    Replace</button>
  <button
    type="button"
    @click="go"
  >
    Go</button>
  <hr />
  <button
    type="button"
    @click="addRoute"
  >
    新增路由</button>
</template>

<script>
export default {
  methods: {
    // 包含歷史紀錄
    // 這裡呈現 去 About 的頁面
    push() {
      // this.$router.push('這裡放網址');
      this.$router.push({
        name: 'about',
      });
    },
    // 沒有歷史紀錄，指的像是 上一頁歷史記錄會沒有
    replace() {
      this.$router.replace({
        name: 'about',
      });
    },
    // 操作歷史紀錄
    go() {
      // 這裡會呈現一開始在 A，按下 B 去到 B 後，再按 go 就會回到 A，但不同於上一頁
      // (1) go 功能：透過歷史紀錄來操作路由。
      // (2) 上下頁功能：依照目前所點擊的頁數來對應資料，單純用來渲染畫面。
      // 如果點擊 A 商品、再點擊 B 商品，只有 Vue Router 的 go 功能可以回到 A 商品頁面。
      this.$router.go(-1);
    },
    // 取得長用參數
    // 課程展示了 getRoute 按鈕 如下兩種呈現 取得、呼叫
    getRoute() {
      // 取得 路由 的屬性
      // https://next.router.vuejs.org/zh/api/#routelocationnormalized
      // 範例 : this.$route.fullPath (目前網址)
      // console.log(this.$route);

      // 呼叫 路由 的方法
      // https://next.router.vuejs.org/zh/api/#router-方法
      // 範例 : this.$router.go(-1) (目前網址)
      // console.log(this.$router);
    },
    // 延伸介紹
    // 按下按鈕就可臨時增加路由，等同 router -> index.js 內的操作
    // http://localhost:8080/#/newabout 就會到這頁面
    addRoute() {
      this.$router.addRoute({
        path: '/newabout',
        name: 'newabout',
        component: () => import('./AboutView.vue'),
      });
    },
  },
};
</script>
