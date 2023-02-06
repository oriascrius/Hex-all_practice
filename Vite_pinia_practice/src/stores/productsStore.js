// Pinia 控制 商品列表
// 1.從 Pinia 拿到相關方法 defineStore
// 2.state 放入 商品資料
// 3.透過 getters 釋出給其他元件使用

// 這裡用 CDN 方式
// const { defineStore } = Pinia;

// NPM 方式
import { defineStore } from "pinia";

// productsStore 自訂名稱
export default defineStore("productsStore", {
  // data， methods， computed
  // state，actions，getters -> Pinia 對應上面

  // state 放商品資料 -> 等同 data
  state: () => ({
    products: [
      {
        id: 1,
        title: "多色餅乾",
        imageUrl:
          "https://images.unsplash.com/photo-1576717585968-8ea8166b89b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        price: 80,
      },
      {
        id: 2,
        title: "綠色馬卡龍",
        imageUrl:
          "https://images.unsplash.com/photo-1623066463831-3f7f6762734d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1135&q=80",
        price: 120,
      },
      {
        id: 3,
        title: "甜蜜左擁右抱",
        imageUrl:
          "https://images.unsplash.com/photo-1558312657-b2dead03d494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        price: 200,
      },
      {
        id: 4,
        title: "巧克力心連心",
        imageUrl:
          "https://images.unsplash.com/photo-1606913084603-3e7702b01627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        price: 160,
      },
      {
        id: 5,
        title: "粉係馬卡龍",
        imageUrl:
          "https://images.unsplash.com/photo-1612201142855-7873bc1661b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        price: 120,
      },
    ],
  }),
  // computed -> 給元件使用
  getters: {
    // { products } -> 就是去抓 state 資料 -> 並用解構的方式抓 state 內 products 的資料 -> 再 return products 資料
    sortProducts: ({ products }) => {
      // 將 價格做排序 低 -> 高
      return products.sort((a, b) => a.price - b.price);
    },
  },
});
