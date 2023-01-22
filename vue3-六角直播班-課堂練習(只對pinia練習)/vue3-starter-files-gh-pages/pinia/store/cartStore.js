// Pinia 控制 購物車
// 1.從 Pinia 拿到相關方法 defineStore
// 2.state 放入 商品資料
// 3.透過 getters 釋出給其他元件使用
const { defineStore } = Pinia;
// 引入 productsStore -> 同層的 cartStore 跟 商品productsStore 拿資料
import productsStore from "./productsStore.js";

// cart 自訂名稱
export default defineStore("cart", {
  // data， methods， computed
  // state，actions，getters -> Pinia 對應上面
  state: () => ({
    // 購物車 cart 用陣列放每一項商品
    cart: [],
  }),
  // methods
  actions: {
    // 加入購物車
    addToCart(productId, qty = 1) {
      // 取得已經有加入到購物車的商品
      // 進行判斷，如果點擊 加入購物車 的商品 ，購物車已經有該商品就直接數量 +1，沒有就新增商品到購物車
      const currentCart = this.cart.find(
        (item) => item.productId === productId
      );
      // 如果 currentCart 有項目為 true 時，購物車商品直接加數量，反之購物車內沒有點擊的該物品就新增商品到購物車
      if (currentCart) {
        currentCart.qty += qty;
      } else {
        //   這裡可以用 this.cart，與下方 getters 內 cartList 箭頭函式對比，就得用解構方式取得 cart，不能使用 this.cart
        this.cart.push({
          id: new Date().getTime(),
          productId,
          qty,
        });
      }
    },
    // 根據購物車選擇數量框得到數量
    setCartQty(id, event) {
      const currentCart = this.cart.find((item) => item.id === id);
      // event.target.value 本來是 String，* 1 變為 Number
      currentCart.qty = event.target.value * 1;
    },
    // 購物車刪除商品
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => item.id === id);
      this.cart.splice(index, 1);
    },
  },
  // computed
  //
  getters: {
    // 因為箭頭函式往外層的函式找資料，外層一個沒有就沒有，所以這裡不能 this.cart
    // 改用解構方式 ({ cart }) 取得 state 內 cart 資料
    cartList: ({ cart }) => {
      // 1.購物車的品項資訊，需要整合商品資訊
      // 2.必須計算小計的金額
      // 3.必須提供總金額

      // import productsStore from "./productsStore.js" -> 解構拿商品列表資料 -> 自訂變數 products
      // 從另個同層 store 取資料，就加上 () 直接執行方法
      const { products } = productsStore();
      //  cart 本來是用來記錄存放購物車內每一項商品
      //  products（商品列表資料）、item（購物車商品列表資料）
      //  product（products） <-> item（cart） 兩個相同 id 並取出來放到變數 carts 並回傳
      //  carts 就是來裝整理好的資料 -> 當購物車內資料有變動時
      const carts = cart.map((item) => {
        console.log(item);
        // 單一商品取出
        const product = products.find(
          (product) => product.id === item.productId
        );
        console.log(product);
        return {
          // 1.購物車的品項資訊，需要整合商品資訊 -> return 購物車列表
          ...item,
          // return 單一商品資訊
          product,
          // 2.必須計算小計的金額
          subtotal: product.price * item.qty,
        };
      });
      console.log(carts);
      // 3.必須提供總金額
      // 從整理好的資料 carts 去做加總
      // reduce 參數，a -> 前者、b -> 當前
      const total = carts.reduce((a, b) => a + b.subtotal, 0);
      return {
        // 回傳 整理好的資料
        carts,
        // 回傳 總金額
        total,
      };
    },
  },
});
