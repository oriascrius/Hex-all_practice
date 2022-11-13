<template>
  <!-- bootstrap -> navbar 複製一份 -->

  <nav class="navbar navbar-expand-lg bg-light fixed-top">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
      >Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            <router-link
              to="/"
              class="nav-link"
            >Home</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Features</a> -->
            <router-link
              to="/about"
              class="nav-link"
            >About</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Pricing</a> -->
            <router-link
              :to="{ name: '新增頁面' }"
              class="nav-link"
            >新增頁面</router-link>
          </li>

          <!-- 這裡用不到先註解 -->
          <!-- <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li> -->
        </ul>
      </div>
    </div>
  </nav>

  <!-- 本來是練習用，拿去上面取代原本 bootstrap 的範例 -->
  <!-- <nav>
    <router-link to="/">Home</router-link>  |
    <router-link to="/about">About</router-link>  |
    <router-link :to="{name: '新增頁面'}">新增頁面</router-link>
  </nav> -->

  <div
    class="container"
    style="height: 300vh"
  >
    <router-view />
  </div>
  <router-link to="/newPage/routeNavigation">/newPage/routeNavigation</router-link>
</template>

<style lang="scss">
body {
  padding-top: 80px
}

// 下方都是本來預設練習用的 CSS，但加上 bootstrap 所以下方先註解
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
