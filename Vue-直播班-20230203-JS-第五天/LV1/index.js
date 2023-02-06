import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "qoqvuedemo";

// 詳細商品頁面 Modal
const productModal = {
  // 當 id 變動時，取得遠端資料，並呈現畫面
  props: ["id", "addToCart", "openModal"],
  data() {
    return {
      // 接收 bootstrap modal JS 方法 -> 接收 詳細商品頁面 Modal
      modal: {},
      // 接收 API 資料
      tempProduct: {},
      // 預設 數量 1 -> v-model 詳細商品頁面 Modal 上的 html 讓選擇數量預設 1
      qty: 1,
    };
  },
  // 對應 詳細商品頁面 Modal 上的  <script type="text/x-template" id="userProductModal">
  template: "#userProductModal",
  // 監聽 id 變動 -> 當點擊不同 商品 取得 ID 後 去監聽
  watch: {
    id() {
      // 按下 詳細商品 -> 取得 id -> 執行下方取得 APi 資料
      if (this.id) {
        axios
          .get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
          .then((res) => {
            this.tempProduct = res.data.product;
            this.modal.show();
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    },
  },
  methods: {
    // 給外層方法關閉
    hide() {
      this.modal.hide();
    },
  },
  // 詳細商品頁面 Modal 上的 ref="modal" 對應 this.$refs.modal
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
    // 防止按下同個詳細商品，因為沒有變換 id，導致再按第 2次 打不開
    // 關閉 modal 時的事件
    // 本來是 (event) 改成 =>  -> 才可用 this -> 箭頭函式沒有自己的 this,會去找外層
    this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
      // 外層 openModal() 方法丟到這裡內層使用，參數給空值
      this.openModal("");
    });
  },
};

const app = createApp({
  data() {
    return {
      // 取得 遠端 API 商品資料
      products: [],
      // 存放 詳細商品頁面 Modal 開啟用的 ID
      productId: "",
      // 存放 遠端 API 購物車資料
      cart: "",
      // 防止一直觸發請求 API，給予 loading 緩衝，判斷有 id 時，先禁止按鈕
      loadingItem: "",
    };
  },
  methods: {
    // 取得商品列表 API
    getProducts() {
      axios
        .get(`${apiUrl}/api/${apiPath}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // HTML 上 拿到 id，從這接收後在 props 到 modal 子元件裡面 :id = productId
    openModal(id) {
      this.productId = id;
    },
    // 將 商品 ID、數量 加入到購物車
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      // 按下加入購物車時取得 id -> 先禁用按鈕點擊 -> 等待下方請求 API 完成
      // 對應 商品列表中，:disabled="product.id === loadingItem"
      this.loadingItem = product_id;
      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, { data })
        .then((res) => {
          // 控制 當進入詳細商品葉面，按下加入購物車後，關閉 Modal（從內層拿到方法關閉）
          this.$refs.productModal.hide();
          // 按下加入購物車後 -> 取得購物車資料呈現
          this.getCarts();
          // 最後重置存放 id 為空
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 取得購物車資料
    getCarts() {
      // 這裡可作區塊 or 全畫面 loading
      axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((res) => {
          // 控制 當進入詳細商品葉面，按下加入購物車後，關閉 Modal（從內層拿到方法關閉）
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 更改購物車中的數量 -> 連動價格
    // 從 HTML　上　@change="updateCartItem(item)"，item　就是　cart.carts
    // 裡面有兩種 id，一個是購物車 id、另個是 商品本身 id
    updateCartItem(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      // 在購物車裡面時，變動數量時取得 id -> 先禁用按鈕點擊 -> 等待下方請求 API 完成
      // 對應 購物車列表中， :disabled="item.id === loadingItem"
      this.loadingItem = item.id;
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          // 控制 當進入詳細商品葉面，按下加入購物車後，關閉 Modal（從內層拿到方法關閉）
          this.getCarts();
          // 最後重置存放 id 為空
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 刪除購物車內商品品項
    deleteItem(item) {
      // 在購物車裡面時，刪除時取得 id -> 先禁用按鈕點擊 -> 等待下方請求 API 完成
      // 對應 購物車列表中， :disabled="item.id === loadingItem"
      this.loadingItem = item.id;
      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${item.id}`)
        .then((res) => {
          // 控制 當進入詳細商品葉面，按下加入購物車後，關閉 Modal（從內層拿到方法關閉）
          this.getCarts();
          // 最後重置存放 id 為空
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  components: {
    productModal,
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});
app.mount("#app");
