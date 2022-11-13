<template>
  <!-- src / main.js 有全域註冊 vue3-loading-overlay 效果-->
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <!-- 新增產品 - 按鈕 -> 點擊跳出視窗 -->
    <button class="btn btn-primary" type="button" @click="openModal(true)">新增一個產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
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
          <!-- is_enabled 為 1 時 預設啟用狀態，並使用 text-success 綠色 -->
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <!-- v-else 就是除了 1 以外時，使用 text-muted 灰色 -->
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 上方 新增產品的 按鈕 觸發 這裡 -->
  <!-- :product="tempProduct" 前內後外，單項數據流
  新建產品視窗填寫的資料 傳到 (前 :product) 給內層接收使用 -->
  <!-- 內層的 productModel.vue emit update-product (內外層對應名字) 到這
  再傳到  下方 methods updateProduct 方法中
  內層的 emit tempProduct -> 傳到  updateProduct 參數中 -->
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
</template>

<script>
// import ProductModal.vue 後 要區域註冊，才能使用標籤
// import ProductModal from '../components/ProductModal.vue';

// 相同的部分，引入共同的 modalMixin
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      // 產品資料
      products: [],
      // 分頁
      pagination: {},
      // 暫時存放 產品資料
      tempProduct: {},
      // 判斷 是否 是新增的狀態，預設 給 false
      // true -> 新增狀態 -> 做新增的 事件方法
      // false -> 不是新增狀態 -> 等於是編輯狀態 -> 做編輯的 事件方法
      isNew: false,
      // vue3-loading-overlay 效果，預設  false 關閉
      isLoading: false,
    };
  },
  // 要區域註冊，才能使用標籤、方法
  components: {
    ProductModal,
    DelModal,
  },
  inject: ['emitter'],
  methods: {
    // 遠端 API 取的產品資料，產品列表顯示
    getProducts() {
      // 這邊用 get
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/products`;
      // vue3-loading-overlay 效果 啟動
      this.isLoading = true;
      // get 發送
      this.$http.get(api).then((res) => {
        // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
        this.isLoading = false;
        // 假如 get 發送成功
        if (res.data.success) {
          console.log(res.data);
          // 上方 data 存放 api 的 產品、分頁 資料
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    // 綁定按鈕 觸發這個事件，打開 新建產品資料的視窗
    // 參數 isNew 與 data 的 isNew 不同，這裡只是自訂的參數名稱
    // 參數後的 item 是給 編輯時使用(代入舊的資料)
    openModal(isNew, item) {
      // 在上面的 新增按鈕 有 @click="openModal(true)" 事件，所以按下 新增，會代入 true
      if (isNew) {
        // 每次按下 新建產品資料 視窗後，裡面會清空
        this.tempProduct = {};
      } else {
        // 在上面的 編輯按鈕 有 @click="openModal(false, item)" 事件，所以按下 編輯，會代入 false
        // item 的意思就是代入本來舊的資料
        this.tempProduct = { ...item };
      }
      // 這裡保存了 當下點的是 新增 or 編輯 按鈕，
      this.isNew = isNew;
      // 下面兩個 就是 叫出 productModal (編輯產品的視窗)
      const productComponent = this.$refs.productModal;
      // showModal() 是 ProductModal.vue 的 methods 內我們做的方法，modal 是引入 bootstrap
      // import bootstrap 到 ProductModal.vue -> 做好 showModal() 事件 ->
      // 外層 components 註冊 ProductModal.vue -> 可給外層 ProductView.vue 直接使用
      productComponent.showModal();
    },
    // 接收 內層 ProductModal.vue emit 傳出來的資料( item 接收傳過來的資料 )，更新 遠端 API 資料
    updateProduct(item) {
      // 暫存接收 傳來的資料，下方再傳給 遠端 API
      this.tempProduct = item;
      // 新增 API (預設事件)
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product`;
      // vue3-loading-overlay 效果 啟動
      this.isLoading = true;
      // API 新增產品 是用 post
      // 這裡另外宣告，是方便給 傳到 遠端 API 時，判斷是 post or put 用
      let httpMethod = 'post';
      // 編輯 API ( 判斷邏輯:在 methods openModal 中，this.isNew 已經根據 true -> 使用新增事件、false -> 使用編輯事件 )
      // 並且 this.isNew = isNew -> 存取當下是 true or false
      // 而下方目的是要做編輯動作，代表傳來 false ->  (!this.isNew) = (!false) = true -> true 就會執行以下內容
      // 反之，如果是按下新增按鈕 -> 傳來 true -> (!this.isNew) = (!true) = false  -> false 不執行
      if (!this.isNew) {
        // 修改產品 API -> API 是使用 id 來判別
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product/${item.id}`;
        // vue3-loading-overlay 效果 啟動
        this.isLoading = true;
        // API 修改產品 是用 put
        httpMethod = 'put';
      }
      // 宣告 互動視窗 -> 下方 控制 互動視窗
      const productComponent = this.$refs.productModal;
      // 傳到 遠端 API 更新 資料
      // 用上方做好的變數 [httpMethod]，就不用直接綁定 .post or .put
      // api 也是 變數，依據 post or put，給予不同 API 路徑
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
        this.isLoading = false;
        console.log(response);
        // 關閉 互動視窗
        productComponent.hideModal();
        // 再利用  getProducts() 更新產品列表顯示
        // this.getProducts();
        // 更新產品資料 成功 or 失敗 的回應
        if (response.data.success) {
          this.getProducts();
          // push-message 在 內層 src / components / Toast.vue 中 有定義
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、'),
          });
        }
      });
    },
    // 開啟 刪除 的互動視窗
    openDelProductModal(item) {
      // 刪除時，還是要把 產品本來的資料 儲存到暫存區，之後要傳到 遠端 API 做更新
      this.tempProduct = { ...item };
      // 跳出 刪除視窗
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    // 刪除產品後的資料 傳給遠端 API 的功能
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/product/${this.tempProduct.id}`;
      // vue3-loading-overlay 效果 啟動
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
        this.isLoading = false;
        console.log(response.data);
        // 宣告變數 控制刪除視窗
        const delComponent = this.$refs.delModal;
        // 刪除視窗關閉
        delComponent.hideModal();
        // 再次呈現 更新過後的產品列表
        this.getProducts();
      });
    },
  },
  // 畫面持續 顯示產品列表
  created() {
    this.getProducts();
  },
};
</script>
