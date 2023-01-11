import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 1.登入
    login() {
      // 申請 API 的網址，第二版補上 v2
      const url = "https://vue3-course-api.hexschool.io/v2";
      // 個人 API Path，都要改成小寫
      const path = "qoqvuedemo";
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((response) => {
          // 存取登入的 token、expired
          const { token, expired } = response.data;
          // cookie 存取 token、expired、存取資料後方便不用二次取資料
          document.cookie = `qoqVueDemo=${token};expires=${new Date(
            expired
          )};path=/`;
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
