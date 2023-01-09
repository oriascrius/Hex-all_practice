import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "qoqvuedemo",
      // 裝 API 傳來的資料
      coupons: [
        {
          due_date: "2023 / 2 / 28",
          is_enabled: 1,
          percent: 80,
          title: "超級特惠價格",
        },
      ],
    };
  },
  methods: {
    // 確認是否登入
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        // 成功 -> 取得優惠券列表
        .then(() => {
          // this.getData();
          console.log("先用假資料測試");
        })
        // 失敗 -> 跳出提醒框、並返回登入頁面
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // 使用管理者的 API -> 取得優惠券列表
    // getData() {
    //   const url = `${this.apiUrl}/api/${this.apiPath}/admin/coupons`;
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       console.log(response);
    //       this.coupons = response.data.coupons;
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.message);
    //     });
    // },
    logout() {
      const url = `${this.apiUrl}/logout`;
      axios
        .post(url)
        // 成功 -> 登出到登入頁面
        .then(() => {
          sessionStorage.clear();
          window.location = "login.html";
        })
        // 失敗 -> 跳出提醒框、並返回登入頁面
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
