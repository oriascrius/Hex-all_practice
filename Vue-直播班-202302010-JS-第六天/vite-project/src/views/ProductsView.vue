<template>
  <div>
    商品列表
    <table>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td><img
              :src="item.imageUrl"
              alt="商品圖片"
              width="100"
              height="100"
            ></td>
          <td>
            <RouterLink :to="`/product/${item.id}`">連結到單一商品頁面</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data() {
    return {
      products: []
    }
  },
  components: {
    RouterLink
  },
  mounted() {
    this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`).then((res) => {
      this.products = res.data.products;
    })
  }
}
</script>