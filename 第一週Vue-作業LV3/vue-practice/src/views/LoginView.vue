<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6 text-center fw-bold">
        <h1 class="h3 mb-5 font-weight-normal fw-bold">後台管理系統</h1>
        <!-- Email -->
        <div class="mb-4 col-8 mx-auto">
          <label for="inputEmail" class="sr-only mb-3">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            v-model="user.username"
          />
        </div>
        <!-- Email -->
        <div class="mb-2 col-8 mx-auto">
          <label for="inputPassword" class="sr-only mb-3">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="mt-5">
          <!-- 雖然上方有點擊事件不做預設觸發，但這裡需要改成 type="button" 嗎-->
          <button class="btn btn-success col-3" type="submit">登入</button>
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
    // 登入、cookie
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user).then((res) => {
        // 假如登入成功後
        if (res.data.success) {
          // 將 res.data 的 cookie、expired 存入到變數
          const { token, expired } = res.data;
          // hexToken -> 是自定義名稱，expired -> 日期使用 new Date 轉換
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          // 轉址到 dashboard 頁面
          console.log(res);
        }
      });
    },
  },
};
</script>
