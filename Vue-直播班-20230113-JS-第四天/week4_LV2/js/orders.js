import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// 引入 公用 API 元件
import { apiUrl, apiPath } from "../js/config.js";

// 將編輯、新建 modal 宣告變數在全域
let ordersModal = null;
// 將刪除 modal 宣告變數在全域
let delOrdersModal = null;

const app = createApp({
  data() {
    return {
      // 裝 API 傳來的資料
      orders: [],
      // 裝 modal 視窗的資料
      tempOrders: {},
    };
  },
  methods: {
    // 確認是否登入
    checkAdmin() {
      const url = `${apiUrl}/api/user/check`;
      axios
        .post(url)
        // 成功 -> 取得訂單列表
        .then(() => {
          // this.getData();
          // console.log(this.orders);
        })
        // 失敗 -> 跳出提醒框、並返回登入頁面
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // 使用管理者的 API -> 取得訂單列表
    getData() {
      const url = `${apiUrl}/api/${apiPath}/admin/orders`;
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.orders = response.data.orders;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 按下按鈕後的動作（渲染，不是 API 動作）
    // item -> 編輯的話根據 item 帶入舊資料、刪除的話根據該 item 刪除該筆資料
    openModal(isNew, item) {
      if (isNew === "edit") {
        // 編輯時 -> 拿到參數 item -> 代表拿到原有資料
        this.tempOrders = { ...item };
        // 跳出視窗
        ordersModal.show();
      } else if (isNew === "delete") {
        // 刪除時 -> 拿到參數 item -> 代表拿到原有資料 -> 開啟刪除 modal 視窗
        this.tempOrders = { ...item };
        // 跳出視窗
        delOrdersModal.show();
      }
    },
    // 編輯 API 動作
    updateOrders() {
      //  編輯 API
      const url = `${apiUrl}/api/${apiPath}/admin/order/${this.tempOrders.id}`;

      // 要夾帶更改的資料
      axios
        .put(url, { data: this.tempOrders })
        // 成功
        .then((response) => {
          // 跳出提醒視窗
          alert(response.data.message);
          // 關閉視窗
          ordersModal.hide();
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
    delOrders() {
      const url = `${apiUrl}/api/${apiPath}/admin/orders/${this.tempOrders.id}`;
      axios
        .delete(url)
        // 成功
        .then((response) => {
          // 跳出 response.data.message 提醒框
          alert(response.data.message);
          // 關閉 modal 視窗
          delOrdersModal.hide();
          // 重新取得 資料
          this.getData();
        })
        // 失敗
        .catch((err) => {
          // 跳出 response.data.message 提醒框
          alert(response.data.message);
        });
    },
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
  // modal 放在 mounted -> 可以在 dom 生成後 才建立，這樣 modal 裡面才能綁定 vue 拿到資料
  mounted() {
    // 新建、編輯 modal 用 JS 開啟的方法
    // keyboard: false -> 指的是不能用鍵盤控制（EX:Esc 跳出 modal 視窗）
    ordersModal = new bootstrap.Modal(document.getElementById("ordersModal"), {
      keyboard: false,
    });
    // 刪除 modal 用 JS 開啟的方法
    // keyboard: false -> 指的是不能用鍵盤控制（EX:Esc 跳出 modal 視窗）
    delOrdersModal = new bootstrap.Modal(
      document.getElementById("delOrdersModal"),
      {
        keyboard: false,
      }
    );
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
});
app.mount("#app");
