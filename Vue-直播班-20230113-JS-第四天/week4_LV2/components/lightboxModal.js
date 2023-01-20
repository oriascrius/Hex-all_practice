// 燈箱 Modal 元件
export default {
  props: ["tempProduct"],
  template: `<div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 id="lightboxModalLabel" class="modal-title">
        <span>商品圖片</span>
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <img :src="tempProduct.imageUrl" alt="商品圖" class="rounded imgObjectFit">
    </div>
  </div>
</div>`,
};
