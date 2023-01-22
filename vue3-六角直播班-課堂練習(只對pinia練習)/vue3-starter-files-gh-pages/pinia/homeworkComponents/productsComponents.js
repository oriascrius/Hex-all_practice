// 商品列表 元件

// 引入 寫好的 Pinia 商品元件
import productsStore from "../store/productsStore.js";
// 引入 寫好的 Pinia 購物車元件
import cartStore from "../store/cartStore.js";
// 使用 Pinia 的 mapState -> 再用 computed 控制
// 使用 Pinia 的 mapAction -> 再用 methods 控制
const { mapState, mapActions } = Pinia;

export default {
  // v-for 本來是 product in products 修改成 product in sortProducts
  // @click.prevent="addToCart(product.id) -> 加上點擊事件 -> 加入購物車
  template: `<div class="row row-cols-3 my-4 g-4">
    <div class="col"  v-for="product in sortProducts" :key="product.id">
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
            {{product.title}}
            <span class="float-end">$ {{product.price}}</span>
          </h6>
          <a href="#" class="btn btn-outline-success w-100" @click.prevent="addToCart(product.id)"
            >加入購物車</a
          >
        </div>
      </div> 
    </div>
  </div>
`,
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
};
