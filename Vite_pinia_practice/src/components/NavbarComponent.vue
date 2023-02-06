<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">松柏食光</span>
      <button
        type="button"
        class="btn"
      >
        購物車<span class="badge rounded-pill bg-danger">{{ cart.length }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
// navbar 元件 - CDN 方式
// const { mapState } = Pinia;

// 改成 npm 方式
import { mapState } from "pinia";
// 引入 寫好的 Pinia 購物車元件
import cartStore from "../stores/cartStore.js";

export default {
  template: `<nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">松柏食光</span>
      <button type="button" class="btn">
        購物車<span class="badge rounded-pill bg-danger">{{ cart.length }}</span>
      </button>
    </div>
  </nav>`,
  // 購物車商品項目 -> 顯示數量
  computed: {
    ...mapState(cartStore, ["cart"]),
  },
};
</script>