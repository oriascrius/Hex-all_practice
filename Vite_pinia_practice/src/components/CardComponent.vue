<template>
  <div class="card">
    <!--  class="card-img-top" -> bootstrap5 卡片 預設圖片 class 寫法 -->
    <img
      class="card-img-top"
      :src="product.imageUrl"
      alt="商品圖片"
    />
    <!-- bootstrap5 卡片 -->
    <div class="card-body">
      <h6 class="card-title">
        {{ product.title }}
        <span class="float-end">$ {{ product.price }}</span>
      </h6>
      <input
        type="number"
        class="form-control mb-2"
        min="1"
        v-model.number="num"
        max="20"
      >
      <a
        href="#"
        class="btn btn-outline-success w-100"
        @click.prevent="addToCart(product.id, num)"
      >加入購物車</a>
    </div>
  </div>
</template>

<script>
import cartStore from "../stores/cartStore.js"
import { mapActions } from "pinia"

export default {
  props: ["product"],
  data() {
    return {
      num: 1,
    }
  },
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
  },
};
</script>