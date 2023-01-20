import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// 申請 API 的網址，第二版補上 v2
const url = "https://vue3-course-api.hexschool.io/v2";

const app = createApp({
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
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((response) => {
          // 存取登入的 token、expired
          const { token, expired } = response.data;
          // cookie 存取 token、expired、存取資料後方便不用二次取資料
          document.cookie = `qoqVueDemo=${token};expires=${new Date(expired)};`;
          alert("登入成功");
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
});

app.mount("#app");
