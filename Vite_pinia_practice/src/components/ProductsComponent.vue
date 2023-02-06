<template>
  <div class="row row-cols-3 my-4 g-4">
    <div
      class="col"
      v-for="product in sortProducts"
      :key="product.id"
    >
      <CardComponent :product="product"></CardComponent>
    </div>
  </div>
</template>

<script>
// 商品列表 元件

// 引入 寫好的 Pinia 商品元件
import productsStore from "../stores/productsStore.js";
// 引入 寫好的 Pinia 購物車元件
import cartStore from "../stores/cartStore.js";

import CardComponent from "./CardComponent.vue";

// 使用 Pinia 的 mapState -> 再用 computed 控制
// 使用 Pinia 的 mapAction -> 再用 methods 控制
// CDN 方式
// const { mapState, mapActions } = Pinia;
// NPM 方式
import { mapState, mapActions } from "pinia";

export default {
  // getters -> 對應 computed
  // 以下陣列放 store/productsStore.js 中 getters 的方法
  // mapState -> 對應 const { mapState, mapActions } = Pinia;
  // productsStore -> 對應 import productsStore from "../store/productsStore.js";
  // [] 內放的就是 store/productsStore.js 內 getters 所有方法
  computed: {
    ...mapState(productsStore, ["sortProducts"]),
  },
  // actions -> 對應 methods
  // 以下陣列放 store/cartStore.js 中 actions 的方法
  // mapActions -> 對應 const { mapState, mapActions } = Pinia;
  // cartStore -> 對應 import cartStore from "../store/cartStore.js";
  // [] 內放的就是 store/cartStore.js 內 actions 所有方法
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
  },
  components: {
    CardComponent,
  }
};

</script>