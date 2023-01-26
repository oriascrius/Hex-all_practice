// 分頁元件
export default {
  // 將 products.js 中 data  API 回傳的 page 從外層傳進這裡
  props: ["pages"],
  // Bootstrap5 分頁 版型
  // https://bootstrap5.hexschool.com/docs/5.1/components/pagination/
  // 在從頁數做 v-for

  // 判斷上一頁禁用 -> :class="{ disabled: !pages.has_pre }"
  // 判斷當前分頁高亮 -> :class={ active: page === pages.current_page } -> 綁定 class，當 page === pages.current_page 為 true，在 class 加上 active 顯示高亮
  // 判斷下一頁禁用  -> :class="{ disabled: !pages.has_next }"

  // 上一頁點擊觸發
  // props 寫法 -> @click.prevent="getData(pages.current_page - 1)"
  // emit 寫法 -> @click.prevent="$emit('change-page', pages.current_page - 1)"

  // 按下分頁 -> 取得商品列表
  // props 寫法 -> @click.prevent="getData(page)" -> 將取得商品列表 API 方法傳進來（prevent 防止跳轉時重新跑到上方）
  // emit 寫法 -> @click.prevent="$emit('change-page', page)"

  // 下一頁點擊觸發
  // props 寫法 -> @click.prevent="getData(pages.current_page + 1)"
  // emit 寫法 -> @click.prevent="$emit('change-page', pages.current_page + 1)"
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">

    <li class="page-item" :class="{ disabled: !pages.has_pre }">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('change-page', pages.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li class="page-item" :class="{ active: page === pages.current_page }" v-for="page in pages.total_pages" :key=" page+'page' ">
        <a class="page-link" href="#" @click.prevent="$emit('change-page', page)">{{ page }}</a>
    </li>
    

    <li class="page-item" :class="{ disabled: !pages.has_next }">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('change-page', pages.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
