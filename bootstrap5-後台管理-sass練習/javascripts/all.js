// 收闔事件
const toggleBtn = document.querySelector("#toggle-btn");
// 控制整個 body 收闔
const body = document.querySelector("body");
// 點擊收闔事件 -> 點擊後 為 body 加上 class
toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("sidebar-toggled");
});