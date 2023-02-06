<template>
  <div class="bg-light my-4 p-4">
    <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
    <table
      v-else
      class="table align-middle"
    >
      <tbody>
        <tr
          v-for="item in cartList.carts"
          :key="item.id"
        >
          <td width="100">
            <a
              href="#"
              class="text-dark"
              @click.prevent="removeCartItem(item.id)"
            >x</a>
          </td>
          <td width="100">
            <img
              class="table-image"
              :src="item.product.imageUrl"
              alt="商品圖片"
            />
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <select
              name=""
              id=""
              class="form-select"
              :value="item.qty"
              @change="(evt) => setCartQty(item.id, evt)"
            >
              <option
                :value="i"
                v-for="i in 20"
                :key="i"
              >{{ i }}</option>
            </select>
          </td>
          <td class="text-end">$ {{ item.subtotal }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td
            colspan="5"
            class="text-end"
          >總金額 NT$ {{ cartList.total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
// 購物車 元件

// 引入 Pinia 購物車 控制
import cartStore from "../stores/cartStore.js";
// CDN 方式
// const { mapState, mapActions } = Pinia;
// NPM 方式
import { mapState, mapActions } from "Pinia";

export default {
  // getters -> 對應 computed
  // 以下陣列放 store/cartStore.js 中 getters 的方法
  // mapState -> 對應 對應 const { mapState, mapActions } = Pinia;
  // cartStore -> 對應 import cartStore from "../store/cartStore.js";
  // [] 內放的就是 store/cartStore.js 內 getters 所有方法
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
  // mapActions -> 對應 const { mapState, mapActions } = Pinia;
  // cartStore -> 對應 import cartStore from "../store/cartStore.js";
  // [] 內放的就是 store/cartStore.js 內 actions 的 removeCartItem、setCartQty 方法
  methods: {
    ...mapActions(cartStore, ["removeCartItem", "setCartQty"]),
  },
};

</script>