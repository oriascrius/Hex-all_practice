<script>
import NavbarComponent from './components/NavbarComponent.vue';
import ProductsComponent from './components/ProductsComponent.vue';
import CartComponent from './components/CartComponent.vue';

export default {
  components: {
    NavbarComponent,
    ProductsComponent,
    CartComponent,
  }
}
</script>

<template>
  <div class="container">
    <NavbarComponent></NavbarComponent>
    <CartComponent></CartComponent>
    <ProductsComponent></ProductsComponent>
  </div>
</template>

<style lang="scss">
@import "./assets/all.scss";

.table-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

/* class="card-img-top" -> bootstrap5 卡片 預設圖片 class 寫法 */
/* 再加寫讓圖一樣高度並不變形 */
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
