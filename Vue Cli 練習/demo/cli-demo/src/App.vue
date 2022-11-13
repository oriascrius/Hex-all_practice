<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <!-- 下方 script 內寫法 name 環境變數 就可以呈現，要重跑 npm run serve-->
  {{ name }}
  <button type="button" class="btn btn-primary">Primary</button>
</template>

<script>
  export default {
    data() {
      return {
        // process.env 規定寫法，把剛剛在 .env 檔案 宣告的變數拿過來
        name: process.env.VUE_APP_NAME,
      };
    },
  };
</script>

<style lang="scss">
@import "bootstrap";
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
