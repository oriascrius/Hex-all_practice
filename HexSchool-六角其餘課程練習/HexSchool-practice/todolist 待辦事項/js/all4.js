let data = [];

let toggleTab = "all";

// 新增
const addBtn = document.querySelector(".btn_add");
const input = document.querySelector("#input");
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.value.trim() == "") {
    alert("請輸入代辦事項");
    return;
  }
  let obj = [];
  obj.content = input.value;
  obj.checked = false;
  data.push(obj);
  input.value = "";
  renderData();
});

const list = document.querySelector(".list");
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

// 清除已完成項目
const deleteAll = document.querySelector(".btn_clear");
deleteAll.addEventListener("click", function (e) {
  e.preventDefault();
  let newData = [];
  data.forEach(function (item, i) {
    if (!item.checked) {
      newData.push(item);
    }
  });
  data = newData;
  renderData();
});

// tab
const tabs = document.querySelector(".tab");
tabs.addEventListener("click", function (e) {
  let allTab = document.querySelectorAll(".tab li");
  allTab.forEach(function (item) {
    item.setAttribute("class", "");
  });
  e.target.setAttribute("class", "active");
  toggleTab = e.target.getAttribute("data-tab");
  renderData();
});

// 渲染畫面
const card_list = document.querySelector(".card_list");
function renderData() {
  if (!data.length) {
    card_list.style.display = "none";
    return;
  }
  card_list.style.display = "block";
  let str = "";
  let count = 0;
  data.forEach(function (item, index) {
    if (!item.checked) {
      count += 1;
      if (toggleTab == "all" || toggleTab == "work") {
        str += `<li>
        <label for="" class="checkbox">
        <input type="checkbox" data-num="${index}"/>
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
    <label for="" class="checkbox">
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
