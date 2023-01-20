// 預設匯出
export default {
  data: [
    // 資料
    "這是第一句話",
    "這是第二句話",
    "這是第三句話",
  ],
  removeData(id) {
    this.data.splice(id, 1);
    this.render();
  },
  render() {
    // 渲染方法
    const list = document.querySelector(".component ul");
    let content = "";
    this.data.forEach((item, i) => {
      content = `${content}<li>${item} <button type="button" class="btn" data-id="${i}">移除</button></li>`;
    });
    // 縮寫優化
    // const content = component.data.map(item => `<li>${item}</li>`).join('');
    list.innerHTML = content;

    // 加入監聽
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        // #2 重點，移除項目是先移除資料，而不是直接移除 DOM
        // 如果要進行 AJAX 或更複雜行為，不會因為 DOM 與資料混合而難以運作
        const id = e.target.dataset.id;
        this.removeData(id);
      })
    );
  },
  init() {
    this.render();
  },
};
