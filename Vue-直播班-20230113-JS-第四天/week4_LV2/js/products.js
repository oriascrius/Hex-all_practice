// vue
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// 引入分頁元件
import pagination from "../components/pagination.js";
// 引入 新增、編輯商品 Modal 元件
import mealModal from "../components/mealModal.js";
// 引入 刪除商品 Modal 元件
import delMealModal from "../components/delMealModal.js";
// 引入 燈箱 Modal 元件
import lightboxModal from "../components/lightboxModal.js";
// 引入 公用 API 元件
import { apiUrl, apiPath } from "../js/config.js";

// 將編輯、新建 modal 宣告變數在全域
let productModal = {};
// 將刪除 modal 宣告變數在全域
let delProductModal = {};
// 燈箱
let lightBoxModal = {};

const app = createApp({
  data() {
    return {
      // 裝 API 傳來的資料
      products: [],
      // 裝 modal 視窗的資料
      tempProduct: {
        imagesUrl: [],
      },
      // 方便判斷是 新增 or 編輯 -> 可以根據 true、false 動態變更 API 動作，post or put
      isNew: false,
      // 商品分頁
      page: {},
    };
  },
  methods: {
    // 確認是否登入
    checkAdmin() {
      const url = `${apiUrl}/api/user/check`;
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
    // 使用管理者的 API -> 取得商品列表
    // 參數放分頁 -> page = 1 可先預設第一分頁，如果參數只有 page，會得到 undefined
    getData(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
          this.page = response.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 按下按鈕後的動作（渲染，不是 API 動作）
    // isNew -> 在 HTML 標籤寫上判斷 新增、編輯、刪除
    // item -> 編輯的話根據 item 帶入舊資料、刪除的話根據該 item 刪除該筆資料
    openModal(isNew, item) {
      if (isNew === "new") {
        // 新增時重置裝 modal 的容器 -> 重置 modal 輸入框
        this.tempProduct = {
          imagesUrl: [],
        };
        // 方便 API 動態判斷
        this.isNew = true;
        // 跳出視窗
        productModal.show();
      } else if (isNew === "edit") {
        // 編輯時 -> 拿到參數 item -> 代表拿到原有資料
        this.tempProduct = { ...item };
        // 方便 API 動態判斷
        this.isNew = false;
        // 跳出視窗
        productModal.show();
      } else if (isNew === "delete") {
        // 刪除時 -> 拿到參數 item -> 代表拿到原有資料 -> 開啟刪除 modal 視窗
        this.tempProduct = { ...item };
        // 跳出視窗
        delProductModal.show();
      } else if (isNew === "lightbox") {
        this.tempProduct = { ...item };
        lightBoxModal.show();
      }
    },
    // 新建、編輯 API 動作
    updateProduct() {
      // 新建 API
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      let http = "post";

      //  編輯 API
      // !this.isNew -> 判斷邏輯 -> 因為 if(這裡要true) 後續才會執行，而裡面要做編輯動作
      // 所以 if(!false) -> 可以接下去執行也可以接續 -> false = 做編輯動作
      if (!this.isNew) {
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }
      // 要夾帶更改的資料
      axios[http](url, { data: this.tempProduct })
        // 成功
        .then((response) => {
          // 跳出提醒視窗
          alert(response.data.message);
          // 關閉視窗
          productModal.hide();
          // 重新取得資料
          this.getData();
        })
        // 失敗
        .catch((err) => {
          // 跳出提醒視窗
          alert(err.response.data.message);
        });
    },
    // 刪除 API 動作
    delProduct() {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      axios
        .delete(url)
        // 成功
        .then((response) => {
          // 跳出 response.data.message 提醒框
          alert(response.data.message);
          // 關閉 modal 視窗
          delProductModal.hide();
          // 重新取得 資料
          this.getData();
        })
        // 失敗
        .catch((err) => {
          // 跳出 response.data.message 提醒框
          alert(response.data.message);
        });
    },
    // 圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    // 圖片上傳 API （本地檔案上傳）
    // upload() {
    //   console.dir(this.$refs.inputFile);
    //   const file = this.$refs.inputFile.files[0];
    //   // 將 formData 表單格式轉成物件
    //   const formData = new FormData();
    //   formData.append("file-to-upload", file);
    //   // 上傳
    //   axios
    //     .post(`${apiUrl}/api/${apiPath}/admin/upload`, formData)
    //     .then((res) => {
    //       this.tempProduct.imageUrl = res.data.imageUrl;
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.message);
    //     });
    // },
    // 登出
    logout() {
      const url = `${apiUrl}/logout`;
      axios
        .post(url)
        // 成功 -> 登出到登入頁面
        .then(() => {
          sessionStorage.clear();
          alert("登出");
          window.location = "login.html";
        })
        // 失敗 -> 跳出提醒框、並返回登入頁面
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  components: {
    // 分頁元件
    pagination,
    // 新建、編輯商品 modal 元件
    mealModal,
    // 刪除商品 Modal 元件
    delMealModal,
    // 燈箱效果元件
    lightboxModal,
  },
  // modal 放在 mounted -> 可以在 dom 生成後 才建立，這樣 modal 裡面才能綁定 vue 拿到資料
  mounted() {
    // 新建、編輯 modal 用 JS 開啟的方法
    // keyboard: false -> 指的是不能用鍵盤控制（EX:Esc 跳出 modal 視窗）
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        keyboard: false,
      }
    );
    // 刪除 modal 用 JS 開啟的方法
    // keyboard: false -> 指的是不能用鍵盤控制（EX:Esc 跳出 modal 視窗）
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );
    // 燈箱 Modal
    lightBoxModal = new bootstrap.Modal(
      document.getElementById("lightboxModal"),
      {
        keyboard: false,
      }
    );
    // 從 cookie 取出 cookieValue（token）
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie -> Example 2
    // test2 更改成自己的路徑
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("qoqVueDemo="))
      ?.split("=")[1];
    // 將 cookieValue（token） 放到 headers
    // https://github.com/axios/axios -> Global axios defaults
    axios.defaults.headers.common["Authorization"] = cookieValue;

    // 確認是否登入
    this.checkAdmin();
  },
});

app.mount("#app");
