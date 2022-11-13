<template>
  <div class="row">
    <div class="col-4">
      <!-- 左邊選單區塊 使用 bootstrap 的 List group -> Links and buttons -->
      <!-- 保留一條 練習就可，a 標籤改為 router-link ，路徑增加 -->
      <div class="list-group">
        <router-link
          to="/newpage/a"
          class="list-group-item list-group-item-act"
        >
          元件 A
        </router-link>
        <router-link
          to="/newpage/b"
          class="list-group-item list-group-item-act"
        >
          元件 B
        </router-link>
        <router-link
          to="/newpage/namedView/c2a"
          class="list-group-item list-group-item-act"
        >
          命名視圖 c2a
        </router-link>
        <router-link
          to="/newpage/namedView/a2b"
          class="list-group-item list-group-item-act"
        >
          命名視圖 a2b
        </router-link>
        <router-link
          to="/newpage/dynmicRouter"
          class="list-group-item list-group-item-act"
        >
          動態路由($route)
        </router-link>
        <router-link
          to="/newpage/dynmicRouterByProps"
          class="list-group-item list-group-item-act"
        >
          動態路由($props)
        </router-link>
        <router-link
          to="/newpage/RouterNavigation"
          class="list-group-item list-group-item-act"
        >
          路由導覽
        </router-link>
      </div>
    </div>
    <div class="col-8">
      <router-view></router-view>
    </div>
  </div>
</template>
