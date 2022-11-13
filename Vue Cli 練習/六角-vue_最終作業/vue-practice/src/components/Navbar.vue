<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
        <span class="navbar-text"> Navbar text with an inline element </span>
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
