// 陣列 裝入 代辦事項 用
let data = [];

// tab 分類狀態
let toggleTab = "all";

// 增加 代辦事項 按鈕
const btn = document.querySelector(".btn_add");

// input 輸入框
const input = document.querySelector("#input");

// 獲取清單列表的 ul
const list = document.querySelector(".list");

// 增加 代辦事項 事件
btn.addEventListener("click", function (e) {
  // 按鈕 設定 是 a 連結，取消默認行為
  e.preventDefault();
  // 輸入框為空時，提醒彈跳窗
  // 提醒完，return 跳出重來
  if (input.value.trim() == "") {
    alert("請輸入代辦事項");
    return;
  }
  // 宣告物件 暫存 代辦事項、勾選狀態
  let obj = {};
  // 物件. 直接新增 代辦事項
  obj.content = input.value;
  // 物件. 直接新增 勾選狀態 ( 默認還沒完成 所以是 false )
  obj.checked = false;
  // push 增加到陣列中
  data.push(obj);
  // 輸入框重置
  input.value = "";
  renderData();
});

// 清單 刪除 切換按鈕 事件
list.addEventListener("click", function (e) {
  // 選取 每點選一條事項 li
  let i = e.target.getAttribute("data-num");
  //   點擊刪除時的行為
  if (e.target.nodeName == "A" && e.target.getAttribute("class") == "delete") {
    // 取消默認行為
    e.preventDefault();
    // 刪除選到的事項
    data.splice(i, 1);
  }
  //   點擊刪除以外區塊時，切換 勾選狀態
  else {
    data[i].checked = !data[i].checked;
  }
  renderData();
});

// 清除已完成項目 按鈕
const deleteBtn = document.querySelector(".btn_clear");

// 清除已完成項目 事件
deleteBtn.addEventListener("click", function (e) {
  // 取消默認行為
  e.preventDefault();
  // 宣告新物件 裝清 除已完成項目後的 剩下事件
  let newData = [];
  //遍歷所有事項 把未勾選(未完成)事項挑出來放到新陣列中
  data.forEach(function (item, i) {
    if (!item.checked) {
      newData.push(item);
    }
  });
  data = newData;
  renderData();
});

// 選取 ul ， 3*li -> 全部 未完成 已完成 ( css 預設選中的狀態 active -> 底線 黑字)
const tabs = document.querySelector(".tab");

// 切換 tab 狀態 事件
tabs.addEventListener("click", function (e) {
  // 宣告 ul 中每個 li
  let all = document.querySelectorAll(".tab li");
  // 遍歷(檢查)每個 li
  all.forEach(function (item) {
    // 每次點擊 tab，清空每個 li 的 active
    item.setAttribute("class", "");
  });
  // 給當前 li 增加 active
  e.target.setAttribute("class", "active");
  // 更新當前的 tab 分類狀態
  toggleTab = e.target.getAttribute("data-tab");
  renderData();
});

// 畫面渲染 tab + 事項清單
const cardList = document.querySelector(".card_list");

// 畫面渲染 函式
function renderData() {
  // 如果事項清單沒有代辦事項 就不用呈現
  if (!data.length) {
    cardList.style.display = "none";
    return;
  }
  cardList.style.display = "block"; // 正常情況 畫面呈現
  let str = "";
  let count = 0;
  // 遍歷 事項清單
  data.forEach(function (item, index) {
    // 如果未勾選(未完成)事項 數量 +1
    if (!item.checked) {
      count += 1;
      // 切換狀態 全部 or 待完成
      if (toggleTab == "all" || toggleTab == "work") {
        str += `<li>
        <label class="checkbox" for="">
          <input type="checkbox"  data-num="${index}"/>
          <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a>
      </li>`;
      }
    }
    // 這裡是 已勾選(已完成)的事項 會出現在 全部 or 已完成
    else if (
      (item.checked && toggleTab == "all") ||
      (item.checked && toggleTab == "done")
    ) {
      str += `<li>
        <label class="checkbox" for="">
          <input type="checkbox" checked data-num="${index}"/>
          <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a>
      </li>`;
    }
  });
  list.innerHTML = str;
  todoLength.textContent = count;
}
