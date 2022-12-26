<template>
  <div>
    <Navbar></Navbar>
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
// import src / components / Navbar.vue 進來再區域註冊
import Navbar from '../components/NavbarView.vue';

export default {
  // 區域註冊，對應 import
  components: {
    Navbar,
  },
  // 確認是否維持登入狀態（檢測用戶是否持續登入 - 把 cookie 的 token 取出以及 token 發送）
  created() {
    // 在登入後，取得 cookie，將 cookie 內的 token 取出
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log(token);
    // 每次發送 API，夾帶 token 在 Headers 裡面
    this.$http.defaults.headers.common.Authorization = token;
    // .env 環境變數名稱 + API 方法
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      console.log(res);
      // 假如燈速失敗，返回登入畫面
      if (!res.data.success) {
        this.$router.push('login');
      }
    });
  },
};
</script>
