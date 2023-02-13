import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
// 優惠券分頁元件
import CouponPagination from "../components/CouponPagination.js";
// 新增、編輯優惠券 Modal 元件
import CouponModal from "../components/CouponModal.js";
// 刪除優惠券 Modal 元件
import DelCouponModal from "../components/DelCouponModal.js";
// 引入 公用 API 元件
import { apiUrl, apiPath } from "../js/config.js";

// 將編輯、新建 modal 宣告變數在全域
let couponsModal = null;
// 將刪除 modal 宣告變數在全域
let delCouponsModal = null;

const app = createApp({
  data() {
    return {
      // 裝 API 傳來的資料
      coupons: [],
      // 裝 modal 視窗的資料
      tempCoupons: {},
      // 方便判斷是 新增 or 編輯 -> 可以根據 true、false 動態變更 API 動作，post or put
      isNew: false,
      // 優惠券分頁
      page: {},
    };
  },
  methods: {
    // 確認是否登入
    checkAdmin() {
      const url = `${apiUrl}/api/user/check`;
      axios
        .post(url)
        // 成功 -> 取得優惠券列表
        .then(() => {
          this.getData();
        })
        // 失敗 -> 跳出提醒框、並返回登入頁面
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // 使用管理者的 API -> 取得優惠券列表
    // 參數放分頁 -> page = 1 可先預設第一分頁，如果參數只有 page，會得到 undefined
    getData(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/admin/coupons?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          this.coupons = response.data.coupons;
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
        this.tempCoupons = {};
        // 方便 API 動態判斷
        this.isNew = true;
        // 跳出視窗
        couponsModal.show();
      } else if (isNew === "edit") {
        // 編輯時 -> 拿到參數 item -> 代表拿到原有資料
        this.tempCoupons = { ...item };
        // 方便 API 動態判斷
        this.isNew = false;
        // 跳出視窗
        couponsModal.show();
      } else if (isNew === "delete") {
        // 刪除時 -> 拿到參數 item -> 代表拿到原有資料 -> 開啟刪除 modal 視窗
        this.tempCoupons = { ...item };
        // 跳出視窗
        delCouponsModal.show();
      }
    },
    // 新建、編輯 API 動作
    updateCoupons() {
      // 新建 API
      let url = `${apiUrl}/api/${apiPath}/admin/coupon`;
      let http = "post";

      //  編輯 API
      // !this.isNew -> 判斷邏輯 -> 因為 if(這裡要true) 後續才會執行，而裡面要做編輯動作
      // 所以 if(!false) -> 可以接下去執行也可以接續 -> false = 做編輯動作
      if (!this.isNew) {
        url = `${apiUrl}/api/${apiPath}/admin/coupon/${this.tempCoupons.id}`;
        http = "put";
      }
      // 要夾帶更改的資料
      axios[http](url, { data: this.tempCoupons })
        // 成功
        .then((response) => {
          // 跳出提醒視窗
          alert(response.data.message);
          // 關閉視窗
          couponsModal.hide();
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
    delCoupons() {
      const url = `${apiUrl}/api/${apiPath}/admin/coupon/${this.tempCoupons.id}`;
      axios
        .delete(url)
        // 成功
        .then((response) => {
          // 跳出 response.data.message 提醒框
          alert(response.data.message);
          // 關閉 modal 視窗
          delCouponsModal.hide();
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
  components: {
    // 優惠券分頁
    CouponPagination,
    // 新建、編輯優惠券 Modal 元件
    CouponModal,
    // 刪除優惠券 Modal 元件
    DelCouponModal,
  },
  // modal 放在 mounted -> 可以在 dom 生成後 才建立，這樣 modal 裡面才能綁定 vue 拿到資料
  mounted() {
    // 新建、編輯 modal 用 JS 開啟的方法
    // keyboard: false -> 指的是不能用鍵盤控制（EX:Esc 跳出 modal 視窗）
    couponsModal = new bootstrap.Modal(
      document.getElementById("couponsModal"),
      {
        keyboard: false,
      }
    );
    // 刪除 modal 用 JS 開啟的方法
    // keyboard: false -> 指的是不能用鍵盤控制（EX:Esc 跳出 modal 視窗）
    delCouponsModal = new bootstrap.Modal(
      document.getElementById("delCouponsModal"),
      {
        keyboard: false,
      }
    );
    // 從 cookie 取出 Token 並轉型別
    // qoqVueDemo 就是 login.js 中，存取 token 的自定義變數名稱
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
