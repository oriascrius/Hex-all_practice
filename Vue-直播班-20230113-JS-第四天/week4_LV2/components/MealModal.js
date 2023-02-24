// 新增、編輯商品 Modal 元件
// :temp-product="tempProduct"
// @upload-images="upload"
// :is-new="isNew"
// @create-images="createImages"
// @update-meals="updateProduct"

// 多圖判斷
// v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
// !tempProduct.imagesUrl.length -> 沒有圖片就出現新增圖片按鈕 -> 反之有圖片時會出現刪除
// tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] -> 當最後一個欄位有資料出現新增圖片按鈕 -> 反之沒有填資料會出現刪除

// 引入 公用 API 元件
import { apiUrl, apiPath } from "../js/config.js";

export default {
  props: ["tempProduct", "isNew"],
  template: `<div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span v-if="isNew">新增商品</span>
          <span v-else>編輯商品</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
      上傳本地圖片  ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-3">
              <label for="imageUrl" class="form-label">主要圖片</label>
              <input
                v-model="tempProduct.imageUrl"
                type="text"
                class="form-control mb-2"
                placeholder="請輸入圖片連結"
              />
              <img class="img-fluid" :src="tempProduct.imageUrl" />
              <!-- 上傳本地圖片 -->
              <input
                type="file"
                ref="inputFile"
                name="file-to-upload"
                class="form-control"
                @change="upload"
              />
            </div>
            <h3 class="mb-3">多圖新增</h3>
            <div v-if="Array.isArray(tempProduct.imagesUrl)">
              <div
                class="mb-1"
                v-for="(image, key) in tempProduct.imagesUrl"
                :key="key"
              >
                <div class="mb-3">
                  <label for="imageUrl" class="form-label"
                    >圖片網址</label
                  >
                  <input
                    v-model="tempProduct.imagesUrl[key]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <img class="img-fluid" :src="image" />
              </div>
              <div
                v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
              >
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="tempProduct.imagesUrl.push('')"
                >
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="tempProduct.imagesUrl.pop()"
                >
                  刪除圖片
                </button>
              </div>
            </div>
            <div v-else>
              <button
                class="btn btn-outline-primary btn-sm d-block w-100"
                @click="$emit('createImages')"
              >
                新增圖片
              </button>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">商品名稱</label>
              <input
                id="title"
                v-model="tempProduct.title"
                type="text"
                class="form-control"
                placeholder="請輸入商品名稱"
              />
            </div>
  
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input
                  id="category"
                  v-model="tempProduct.category"
                  type="text"
                  class="form-control"
                  placeholder="請輸入分類"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input
                  id="unit"
                  v-model="tempProduct.unit"
                  type="text"
                  class="form-control"
                  placeholder="請輸入單位"
                />
              </div>
            </div>
  
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input
                  id="origin_price"
                  v-model.number="tempProduct.origin_price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入原價"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input
                  id="price"
                  v-model.number="tempProduct.price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入售價"
                />
              </div>
            </div>
            <hr />
  
            <div class="mb-3">
              <label for="description" class="form-label">商品描述</label>
              <textarea
                id="description"
                v-model="tempProduct.description"
                type="text"
                class="form-control"
                placeholder="請輸入商品描述"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea
                id="description"
                v-model="tempProduct.content"
                type="text"
                class="form-control"
                placeholder="請輸入說明內容"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  id="is_enabled"
                  v-model="tempProduct.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled"
                  >是否啟用</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="$emit('updateMeals')"
        >
          確認
        </button>
      </div>
    </div>
  </div>`,
  methods: {
    // 圖片上傳 API （本地檔案上傳）
    upload() {
      const file = this.$refs.inputFile.files[0];
      // 將 formData 表單格式轉成物件
      const formData = new FormData();
      formData.append("file-to-upload", file);
      // 上傳
      axios
        .post(`${apiUrl}/api/${apiPath}/admin/upload`, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
