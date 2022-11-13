<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 上一頁 -->
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- v-for -> 對應 外層 傳進來的 遠端 API 資料 -->
      <!-- active: page === pages.current_page 會對應當前點擊的頁數 -->
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <!-- 點擊事件 -> 將點擊的頁數傳出去 -->
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <!-- 下一頁 -->
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
    },
  },
};
</script>
