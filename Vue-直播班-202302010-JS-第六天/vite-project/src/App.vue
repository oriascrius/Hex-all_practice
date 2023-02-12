<script>
// Composition API 轉 Option API
import { RouterLink, RouterView } from 'vue-router'
// 解構方式取得 .env 檔案中的環境變數
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data() {
    return {
      isLoading: false,
    }
  },
  components: {
    RouterLink,
    RouterView,
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000)

    // 每一個元件都要 import
    // axios.get

    // main.js 全域加入後，就可以直接用 this.$http.get 等於於 axios.get
    // this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`).then((res) => {
    //   console.log(res);
    // })
  },
}
</script>

<template>
  <header>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/apple">apple</RouterLink>
      <RouterLink to="/products">商品頁面</RouterLink> |
      <RouterLink to="/admin/products">後臺商品頁面</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
