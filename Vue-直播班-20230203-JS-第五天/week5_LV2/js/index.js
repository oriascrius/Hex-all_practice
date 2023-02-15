// import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const { createApp } = Vue;
// 引入 Header 元件
import CommonHeader from "../components/CommonHeader.js";
// 引入 Footer 元件
import CommonFooter from "../components/CommonFooter.js";
// 引入 分頁 元件
import Pagination from "../components/Pagination.js";

// 表單驗證 - 規則 - 全部加入(CDN 版本)
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 表單驗證  - 新建檔案存放多國語系 json 檔案 - 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./js/zh_TW.json");
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

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
      // 詳細商品頁面選擇數量加入購物車後，要重置數量變回 1
      this.qty = 1;
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
      cart: {},
      // 分頁
      page: {},
      // 防止一直觸發請求 API，給予 loading 緩衝，判斷有 id 時，先禁止按鈕
      loadingItem: "",
      // 存放使用者輸入資料
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      // 商品品項種類
      productsTab: [
        "全部",
        "主食",
        "早午餐",
        "漢堡",
        "炸物",
        "甜點",
        "沙拉",
        "飲料",
      ],
      // 預設頁籤在全部
      isActive: "全部",
    };
  },
  methods: {
    // 商品列表 - 取得商品列表 API
    // background-image: url(""../src/assets/loading.png")
    getProducts(page = 1) {
      // VueLoading
      let loader = this.$loading.show();
      axios
        .get(`${apiUrl}/api/${apiPath}/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.page = res.data.pagination;
          loader.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
          loader.hide();
        });
    },
    // 單一商品細節 - HTML 上 拿到 id，從這接收後在 props 到 modal 子元件裡面 :id = productId
    openModal(id) {
      this.productId = id;
    },
    // 加入購物車 - 將 商品 ID、數量 加入到購物車
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
          // SweetAlert 2
          Swal.fire({
            toast: true,
            position: "top-end",
            type: "success",
            title: "加入商品成功",
            showConfirmButton: false,
            timer: 1500,
          });
          // 按下加入購物車後 -> 取得購物車資料呈現
          this.getCarts();
          // 最後重置存放 id 為空
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 購物車列表 - 取得購物車資料
    getCarts() {
      // 這裡可作區塊 or 全畫面 loading
      // 目前做全畫面
      let loader = this.$loading.show();
      axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          loader.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
          loader.hide();
        });
    },
    // 更改購物車中的數量 -> 連動價格
    // 從 HTML　上　@change="updateCartItem(item)"，item　就是　cart.carts
    // 裡面有兩種 id，一個是購物車 id、另個是 商品本身 id
    updateCartItem(cartItem) {
      const data = {
        product_id: cartItem.product.id,
        qty: cartItem.qty,
      };
      // 在購物車裡面時，變動數量時取得 id -> 先禁用按鈕點擊 -> 等待下方請求 API 完成
      // 對應 購物車列表中， :disabled="item.id === loadingItem"
      this.loadingItem = cartItem.id;
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${cartItem.id}`, { data })
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
    // 刪除購物車項目（單一） - 刪除購物車內商品品項
    deleteItem(cartItem) {
      // 在購物車裡面時，刪除時取得 id -> 先禁用按鈕點擊 -> 等待下方請求 API 完成
      // 對應 購物車列表中， :disabled="cartItem.id === loadingItem"
      this.loadingItem = cartItem.id;
      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${cartItem.id}`)
        .then((res) => {
          // SweetAlert 2
          Swal.fire({
            toast: true,
            position: "top-end",
            type: "success",
            title: "刪除商品成功",
            showConfirmButton: false,
            timer: 1500,
          });
          // 控制 當進入詳細商品葉面，按下加入購物車後，關閉 Modal（從內層拿到方法關閉）
          this.getCarts();
          // 最後重置存放 id 為空
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 刪除購物車項目（全部）
    deleteCars() {
      axios
        .delete(`${apiUrl}/api/${apiPath}/carts`)
        .then((res) => {
          // SweetAlert 2
          Swal.fire({
            toast: true,
            position: "top-end",
            type: "success",
            title: "購物車已清空",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getCarts();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 自訂表單號碼規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "請輸入行動電話號碼";
    },
    // 送出訂單
    sendOrder() {
      axios
        .post(`${apiUrl}/api/${apiPath}/order`, { data: this.form })
        .then((res) => {
          Swal.fire({
            toast: true,
            position: "top-end",
            type: "success",
            title: "送出訂單成功",
            showConfirmButton: false,
            timer: 1500,
          });
          // 清空表單
          this.$refs.form.resetForm();
          // 清空留言
          this.form.message = "";
          this.getCarts();
        })
        .catch((err) => {
          // alert(err.response.data.message);
          Swal.fire({
            toast: true,
            position: "center",
            type: "error",
            title: "購物車沒東西唷!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
  computed: {
    // 篩選商品分類
    productsFiltered() {
      if (this.isActive === "全部") {
        return this.products;
      } else {
        return this.products.filter((item) => item.category === this.isActive);
      }
    },
  },
  components: {
    // 詳細商品 modal
    productModal,
    // 分頁 元件
    Pagination,
    // Header 元件
    CommonHeader,
    // Footer 元件
    CommonFooter,
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});

// 表單驗證 - 註冊元件
// VForm、VField、ErrorMessage -> 新增可用的 HTML 標籤
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
// VueLoading
// app.component("loading", VueLoading.Component);
app.use(VueLoading.LoadingPlugin, {});

app.mount("#app");
