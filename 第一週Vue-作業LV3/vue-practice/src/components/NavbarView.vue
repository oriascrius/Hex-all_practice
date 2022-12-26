<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand ms-5" href="#">松柏食光</a>
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
          <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li class="nav-item me-4">
              <a class="nav-link active" aria-current="page" href="#">商品</a>
            </li>
            <li class="nav-item me-4">
              <a class="nav-link" href="#">訂單</a>
            </li>
            <li class="nav-item me-4">
              <a class="nav-link" href="#">優惠券</a>
            </li>
            <li class="nav-item me-4">
              <a class="nav-link" href="#" @click.prevent="logout">登出</a>
            </li>
          </ul>
          <!-- <span class="navbar-text"> Navbar text with an inline element </span> -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  // 登出
  logout() {
    // .env 環境變數路徑 + API 方法
    const api = `${process.env.Vue_APP_API}logout`;
    // post 發送請求
    this.$http.post(api, this.user).then((res) => {
      // 假如登出成功
      if (res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>
