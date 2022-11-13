// 設置一個陣列 用來存放所有資料
let data = [];

// 獲取清單列表的 ul
const list = document.querySelector(".list");

// 預設為第一個 tab 為全部
let toggleTab = "all";

// 新增
const btn = document.querySelector(".btn_add");
const input = document.querySelector("#input");
btn.addEventListener("click", function (e) {
  // 取消預設事件 不然每次刪除會跑到連結 # 然後網頁飛到最上面去
  e.preventDefault();
  if (input.value.trim() == "") {
    alert("項目名稱不得為空！");
    return;
  }
  let obj = {};
  obj.content = input.value;
  obj.checked = false;
  data.push(obj);
  input.value = "";
  renderData();
});

list.addEventListener("click", function (e) {
  let i = e.target.getAttribute("data-num");
  if (e.target.nodeName == "A" && e.target.getAttribute("class") == "delete") {
    // 取消預設事件 不然每次刪除會跑到連結 # 然後網頁飛到最上面去
    e.preventDefault();
    // 根據索引值刪除一筆資料
    data.splice(i, 1);
  } else {
    // 點擊刪除項目以外的地方就切換勾選狀態
    data[i].checked = !data[i].checked;
  }
  // 每次更新資料都重新渲染畫面
  renderData();
});

// 刪除所有完成的項目
const deleteBtn = document.querySelector(".btn_clear");
deleteBtn.addEventListener("click", function (e) {
  // 取消預設事件 不然每次刪除會跑到連結 # 然後網頁飛到最上面去
  e.preventDefault();

  // 這邊過濾一下 把沒打勾的項目丟到新數組去 再把 data 內容變成新數組內容
  let newData = [];
  data.forEach(function (item, i) {
    if (!item.checked) {
      newData.push(item);
    }
  });
  data = newData;
  renderData();
});

// 切換 tab
const tabs = document.querySelector(".tab");
tabs.addEventListener("click", function (e) {
  let all = document.querySelectorAll(".tab li");
  // 每次點擊 tab 清空所有 tab li 的 active
  all.forEach(function (item) {
    item.setAttribute("class", "");
  });
  // 給當前點擊的 tab 添加 active
  e.target.setAttribute("class", "active");
  // 更新當前的 tab
  toggleTab = e.target.getAttribute("data-tab");
  renderData();
});

const cardList = document.querySelector(".card_list");
// 根據當前的 tab 渲染畫面資料
function renderData() {
  // 如果沒有 data 默認把整個區塊隱藏
  if (!data.length) {
    cardList.style.display = "none";
    return;
  }
  cardList.style.display = "block";
  let str = "";
  let count = 0;
  data.forEach(function (item, index) {
    if (!item.checked) {
      // 計算待完成項目有幾個
      count += 1;
      if (toggleTab == "all" || toggleTab == "work") {
        str += `<li>
              <label class="checkbox" for="">
                <input type="checkbox"  data-num="${index}"/>
                <span>${item.content}</span>
              </label>
              <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
      }
    } else if (
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
