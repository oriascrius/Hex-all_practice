<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only" label />
          Email address
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only" label />
          Password
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 登入 、 cookie ( 這邊的目的將 Cookie 存入 )
    signIn() {
      // .env 環境變數路徑 + API 方法
      const api = `${process.env.VUE_APP_API}admin/signin`;
      // vue3-loading-overlay 效果 啟動
      this.isLoading = true;
      // post 發送 請求
      this.$http.post(api, this.user).then((res) => {
        // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
        this.isLoading = false;
        // 假設 登入成功 狀態時
        if (res.data.success) {
          // 將 res.data 的 token、expired 存到變數
          const { token, expired } = res.data;
          // hexToken : 是自定義名稱 ， expired 日期使用 new Date 轉換
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          // 轉址到 dashboard 頁面
          this.$router.push('/dashboard');
        }
      });
    },
  },
};
</script>
