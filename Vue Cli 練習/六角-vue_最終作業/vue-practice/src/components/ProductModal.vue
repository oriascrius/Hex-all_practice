<template>
  <!-- ref="modal"(modal 自訂名稱) 存取 整格 div dom 元素 -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          ...
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.images">
                <div v-for="(image, key) in tempProduct.images" class="mb-3 input-group" :key="key">
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.images[key]"
                    placeholder="請輸入連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.images.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="tempProduct.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <!-- 內層 新建、修改產品後，按下按鈕 -> emit 到外層 -->
          <!-- 'update-product' 自定義名稱，tempProduct 是  data 中 tempProduct -->
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bootstrap modal ， 路徑 node_modules / bootstrap/js/dist/modal
// import Modal from 'bootstrap/js/dist/modal';

// 相同的部分，引入共同的 modalMixin
import modalMixin from '@/mixins/modalMixin';

export default {
  // 接收 外層 傳進來的資料，這裡接收 ProductView.vue 中 傳進來的資料
  props: {
    product: {
      // 傳進來的型別 是 物件
      type: Object,
      //   如果外層沒有預期傳送資料進來，就先用預設空物件
      default() {
        return {};
      },
    },
  },
  //  監聽
  watch: {
    // 監聽 product ，這裡的 product 就是  props 的 product
    // 因為每次傳進來的資料不同，所以要監聽 更新 內容
    //
    product() {
      this.tempProduct = this.product;
      // 多圖範例
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },
  // 將物件傳出
  data() {
    return {
      modal: {},
      //  存放 監聽 傳進來的資料，這一連串行為 是 單向數據流 (因為不能直接修改外層資料)
      tempProduct: {},
    };
  },
  // 新增事件，讓外部元件能夠呼叫
  methods: {
    // // 操作 data 中 modal 互動功能
    // // 跳出視窗
    // showModal() {
    //   this.modal.show();
    // },
    // // 隱藏視窗
    // hideModal() {
    //   this.modal.hide();
    // },
    // 上傳產品圖片 /api/:api_path/admin/upload
    uploadFile() {
      // 得到 input 填的 上傳資料
      const uploadedFile = this.$refs.fileInput.files[0];
      // 使用 form-data 上傳表單
      const formData = new FormData();
      // formData 新增 欄位 裡面放 參數名稱、填的圖片資料
      formData.append('file-to-upload', uploadedFile);
      // 發送資料 到遠端 API
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      // vue3-loading-overlay 效果 啟動
      this.isLoading = true;
      this.$http.post(url, formData).then((response) => {
        // vue3-loading-overlay 效果 關閉 (這裡取得回傳資料 就可以執行關閉動作)
        this.isLoading = false;
        console.log(response.data);
        // 成功遠端資料更新後，這裡的暫存區圖片也更新
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl;
        }
      });
    },
  },
  // // 將 modal 實體，生命週期
  // // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  // // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行
  // mounted() {
  //   // ref="modal" 先存取 要操作的 html 標籤
  //   // 將 要操作的標籤 加入 bootstrap 互動 (modal) 功能
  //   // 再傳給 data 中的 modal
  //   this.modal = new Modal(this.$refs.modal);
  //   // this.modal.show();  // 一開始還沒做上方 methods ， 所以重整畫面可直接跳出視窗
  // },
  mixins: [modalMixin],
};
</script>
