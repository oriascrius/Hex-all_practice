<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td style="width: 200px">
                <div
                  style="height: 100px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td>
                <a href="#" class="text-dark">{{ item.title }}</a>
              </td>
              <td>
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="getProduct(item.id)"
                  >
                    查看更多
                  </button>
                  <!-- :disabled="this.status.loadingItem === item.id" -->
                  <!-- 當 狀態 等於產品 ID 時 ( 按下加入購物車時，當下會取得產品 ID )，禁止使用按紐 -->
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    :disabled="this.status.loadingItem === item.id"
                    @click="addCart(item.id)"
                  >
                    <!-- bootstrap 漸變讀取 -->
                    <div
                      v-if="this.status.loadingItem === item.id"
                      class="spinner-grow text-danger spinner-grow-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <!-- cart 是存放變數，carts 是 遠端 API 陣列資料，裡面放產品資料 -->
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      :disabled="status.loadingItem === item.id"
                      @click="removeCartItem(item.id)"
                    >
                      <!-- 刪除 icon -->
                      <i class="bi bi-x"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <label for=""
                        ><input type="number" class="form-control" v-model.number="item.qty"
                      /></label>
                      <div class="input-group-text">/ {{ item.product.unit }}</div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small v-if="cart.final_total !== cart.total" class="text-success"
                      >折扣價：</small
                    >
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <label for="">
              <input
                type="text"
                class="form-control"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
            /></label>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: {},
      // 狀態用
      status: {
        loadingItem: '', // 對應品項 ID，當變數有對應 ID 時(加入購物車就是 + 上 ID)，做操作
      },
      // 購物車
      cart: {},
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.products = response.data.products;
        console.log('products:', response);
        this.isLoading = false;
      });
    },
    // 查看更多
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    // 加入購物車
    addCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      // 點擊按鈕後 按鈕顯示禁用、讀取效果
      this.status.loadingItem = id;
      // 將產品 ID 以及預設數量 1 加到 變數 cart
      const cart = {
        product_id: id,
        qty: 1,
      };
      // post 上面 cart 資料到 遠端
      this.$http.post(url, { data: cart }).then((res) => {
        // 傳給 API 資料後，在回復原本按鈕樣子
        this.status.loadingItem = '';
        console.log(res);
      });
    },
    // 購物車
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log(response);
        // 遠端 API data 裡面放了 carts:陣列列表(產品)、total、final total，再用 cart 存放
        this.cart = response.data.data;
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
