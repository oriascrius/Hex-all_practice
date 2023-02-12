<template>
  <div>
    單一商品頁面
    {{ product }}
    <img
      :src="product.imageUrl"
      alt="單一商品圖片"
      height="200"
      width="200"
    >
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    // console.log(this.$route); // 屬性
    const { id } = this.$route.params // 從網址取得 id，再丟給 API
    // console.log(this.$router);  // 方法
    // this.$router.push('/');
    this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`).then((res) => {
      this.product = res.data.product;
    })
  }
}
</script>