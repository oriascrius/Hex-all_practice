<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">範例作品</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    // 登出
    logout() {
      // .env 環境變數路徑 + API 方法
      const api = `${process.env.VUE_APP_API}logout`;
      // vue3-loading-overlay 效果 啟動
      this.isLoading = true;
      // post 發送 請求
      this.$http.post(api, this.user).then((res) => {
        // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
        this.isLoading = false;
        // 假設 登出成功 狀態時
        if (res.data.success) {
          // 轉址到 login 頁面
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>
