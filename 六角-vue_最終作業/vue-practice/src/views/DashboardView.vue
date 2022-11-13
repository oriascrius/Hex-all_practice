<template>
  <Navbar></Navbar>
  <!-- <div class="container-fuild"> -->
  <!-- <router-view /> -->
  <div class="container-fluid mt-3 position-relative">
    <!-- 吐司 -> 回饋訊息 -->
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';
// 將 src/components/Navbar.vue import 進來
import Navbar from '../components/Navbar.vue';

export default {
  // 區域註冊 有對應 import
  components: {
    Navbar,
    ToastMessages,
  },
  // 外層 provide 給內層 或是 內層的內層，內層部分 inject 回應，就不用 每一層 都要 props or emit ( 也不用import )
  provide() {
    return {
      emitter,
    };
  },
  // 這裡目的 -> 確認是否維持登入狀態 ( 檢測用戶是否持續登入 - 把 cookie 的 token 取出 以及 token 發送 )
  created() {
    // 在 登入後 取得 Cookie 後，將 Cookie 內的 Token 取出
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log(token);
    //  每次發送 API 時，自動夾帶 Token 在 Headers 裡面
    this.$http.defaults.headers.common.Authorization = token;
    // .env 環境變數路徑 + API 方法
    const api = `${process.env.VUE_APP_API}api/user/check`;
    // vue3-loading-overlay 效果 啟動
    this.isLoading = true;
    this.$http.post(api, this.user).then((res) => {
      // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
      this.isLoading = false;
      console.log(res);
      // 假如 登入失敗 回去登入頁面
      if (!res.data.success) {
        this.$router.push('/login');
      }
      // 課程 - vue - 加入錯誤的訊息回饋 留言登入成功如何做  提到的 之後回來補
      // 登入到 產品列表 時，會顯示登入成功，
      // this.emitter.emit('push-message', {
      //   style: 'success',
      //   title: '登入成功',
      // });
    });
  },
};
</script>
