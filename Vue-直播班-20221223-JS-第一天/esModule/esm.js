// 具名匯出
// 一定要宣告
// 一定會一個名稱
// 一個檔案可以多個
export const myName = "卡司伯"; //宣告具名
export function callMyName() {
  console.log(myName);
}

// 預設匯出
// 沒有名字
// 一個檔案只能有一個
export default {
  name: "小明",
};

// 一個檔案只能一個，這裡會錯誤因為有兩個預設 export default
// export default
