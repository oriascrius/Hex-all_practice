import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "qoqvuedemo",
      // 裝 API 傳來的資料
      orders: [
        {
          create_at: 1523539519,
          id: "-L9u11NAE0m0SpSBUDIq",
          is_paid: false,
          message: "這是留言",
          products: {
            L8nBrq8Ym4ARI1Kog4t: {
              id: "L8nBrq8Ym4ARI1Kog4t",
              product_id: "-L8moRfPlDZZ2e-1ritQ",
              qty: "3",
            },
          },
          user: {
            address: "kaohsiung",
            email: "test@gmail.com",
            name: "test",
            tel: "0912346768",
          },
          num: 2,
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
    // getData() {
    //   const url = `${this.apiUrl}/api/${this.apiPath}/admin/orders`;
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       this.orders = response.data.orders;
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
