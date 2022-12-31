<template>
  <div>
    <div class="text-end me-5">
      <!-- 新增商品 - 按鈕 - 點擊跳出互動視窗 -->
      <button class="btn btn-success" type="button" @click="openModal(true)">增加一個商品</button>
    </div>
    <table class="table mt-4 table-hover container">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>商品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price }}
          </td>
          <td class="text-right">
            {{ item.price }}
          </td>
          <td>
            <span class="text-warning" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-success btn-sm" @click="openModal(false, item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm ms-2">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 上方按鈕 -> 新增商品 -> 觸發 bootstrap5 modal 互動視窗 -->
    <!-- :product="tempProduct" 前內後外 -->
    <ProductModal
      ref="productModal"
      :product="tempProduct"
      @update-product="updateProduct"
    ></ProductModal>
  </div>
</template>

<script>
// import ProductModal.vue 再區域註冊使用標籤
import ProductModal from '../components/ProductModal.vue';

export default {
  data() {
    return {
      // 產品資料
      products: [],
      // 分頁
      pagination: {},
      // 暫時存放 商品資料
      tempProduct: {},
      // 判斷是否是 新增 狀態，預設 false
      // true -> 新增狀態 -> 新增事件
      // false -> 編輯狀態 -> 編輯事件
      isNew: false,
    };
  },
  // 區域註冊，呼叫 bootstrap5 modal 互動視窗
  components: {
    ProductModal,
  },
  methods: {
    getProducts() {
      // 這裡用 get
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/products`;
      // get 發送
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          // 上方 data 存放遠端 API 傳進來的資料
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    // 增加商品
    // isNew 可能是 true or false，依據參數不同做 新增 or 編輯
    // item 是當編輯時，modal視窗代入舊的資料
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      // 依據 html 點擊，當點擊新增 -> true、點擊編輯 -> false，保存目前是什麼狀態
      this.isNew = isNew;
      // 下方是叫出 modal 互動視窗
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    // 編輯商品
    updateProduct(item) {
      // 暫存資料
      this.tempProduct = item;
      // 新增 API
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product`;
      let httpMethod = 'post';
      // 修改 API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product${item.id}`;
        httpMethod = 'put';
      }
      // 宣告變數 -> 控制互動視窗
      const productComponent = this.$refs.productModal;
      // 依據 新增 or 修改 給相對應的 API
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        console.log(response);
        // 關閉互動視窗
        productComponent.hideModal();
        // 更新商品列表畫面
        this.getProducts();
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
