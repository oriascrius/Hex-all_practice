import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "qoqvuedemo",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 2.確認是否登入
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        // 成功 -> 取得商品列表
        .then(() => {
          this.getData();
        })
        // 失敗 -> 跳出提醒框、並返回登入頁面
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // 3.使用管理者的 API -> 取得產品列表
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 4. 查看單一商品細節（暫存區存放商品資料，給單一商品細節顯示用）
    openProduct(item) {
      this.tempProduct = item;
    },
    // 5. 新增商品（寫好的單筆資料）
    addData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      axios
        .post(url, product)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // 從 cookie 取出 Token 並轉型別
    // qoqVueDemo 就是 login.js 中，存取 token 的自定義變數名稱
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)qoqVueDemo\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 將 token 放到 headers
    axios.defaults.headers.common.Authorization = token;

    // 確認是否登入
    this.checkAdmin();
  },
}).mount("#app");
