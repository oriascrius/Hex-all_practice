export default {
  template: `<nav class="navbar navbar-expand-md">
  <div class="container">
    <!-- Logo -->
    <h1><a href="#"><img
    src="./images/Logo.png"
    alt="松柏食光"
    hight="62.12"
    width="297"
/></a></h1>
    <!-- 導覽 -->
    <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto me-5 h5">
        <li class="nav-item">
          <a class="nav-link" href="#">關於我們</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"
            >美味餐點</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">聯絡我們</a>
        </li>
      </ul>
      <!-- 購物車 icon -->
      <a href="#" class="cart_icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-cart2"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
        />
      </svg>
      <span class="badge rounded-pill bg-danger">3</span>
      </a>
    </div>
  </div>
</nav>`,
};
