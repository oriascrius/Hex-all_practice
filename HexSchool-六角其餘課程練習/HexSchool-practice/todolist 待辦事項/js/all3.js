let data = [];

const cardList = document.querySelector(".card_list");
const list = document.querySelector(".list");

// 渲染畫面
function renderData() {
  // 沒資料就隱藏畫面
  if (!data.length) {
    cardList.style.display = "none";
  }
  // 有資料呈現畫面
  cardList.style.display = "block";
  let str = "";
  let count = 0;
  data.forEach(function (item, index) {
    // 未勾選事項
    if (!item.checked) {
      count += 1;
      // 兩個狀態畫面 未勾選 已勾選
      if (toggleTab == "all" || toggleTab == "work")
        str += `<li>
        <label class="checkbox" for="">
        <input type="checkbox" data-num="${index}"/>
        <span>${item.content}</span>
        <a href="#" class="delete" data-num="${index}"></a>
        </label>
    </li>`;
    }
    // 已勾選事項
    else if (
      (item.checked && toggleTab == "all") ||
      (item.checked && toggleTab == "done")
    ) {
      str += `<li>
        <label class="checkbox" for="">
        <input type="checkbox" checked data-num="${index}"/>
        <span>${item.content}</span>
        <a href="#" class="delete" data-num="${index}"></a>
        </label>
    </li>`;
    }
  });
  list.innerHTML = str;
  todoLength.textContent = count;
}
