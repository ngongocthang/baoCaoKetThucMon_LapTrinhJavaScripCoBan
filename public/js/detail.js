function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get(param)
}

$(document).ready(function () {
    var productId = getParam('productId')
    $.ajax({
        url: 'http://localhost/api/products/show.php?productId=' + productId,
        type: 'GET',
        success: function (data) {
            var product = JSON.parse(data)
            renderProductUI(product)
            addEvents()
        },
        error: function (e) {
            console.log(e.message);
        }
    });
})


// show All Detail Products
function renderProductUI(product) {
    $('#product-detail').append(
        `
        <div class="row gx-5">
        <input type="hidden" id="productId" value="${product.id}">
        <input type="hidden" id="productName" value="${product.name}">
        <input type="hidden" id="productImage" value="${product.image}">
        <input type="hidden" id="productPrice" value="${product.price}">
        <aside class="col-lg-6">
          <div class="border rounded-4 mb-3 d-flex justify-content-center">
            <a href="${product.image}">
              <img style="max-width: 80%; max-height: 80vh; margin: auto;" class="rounded-4 fit"
                src="${product.image}" />
            </a>
          </div>
          <div class="d-flex justify-content-center mb-3">
            <a class="border mx-1 rounded-2" href="#">
              <img width="120" height="120" class="rounded-2" src="./public/images/h1.png" />
            </a>
            <a class="border mx-1 rounded-2" href="#">
              <img width="120" height="120" class="rounded-2" src="./public/images/pr11.png" />
            </a>
            <a class="border mx-1 rounded-2" href="#">
              <img width="120" height="120" class="rounded-2" src="./public/images/iphone 13 pro.png" />
            </a>
            <a class="border mx-1 rounded-2" href="#">
              <img width="120" height="120" class="rounded-2" src="./public/images/pr7.png" />
            </a>
            <a class="border mx-1 rounded-2" href="#">
              <img width="120" height="120" class="rounded-2" src="./public/images/pr8.png" />
            </a>
          </div>
        </aside>
        <main class="col-lg-6">
          <div class="ps-lg-3">
            <h4 class="title text-dark">
            ${product.name}
            </h4>
            <div class="d-flex flex-row my-3">
              <div class="text-warning mb-1 me-2">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="ms-1">
                  4.5
                </span>
              </div>
            </div>

            <div class="mb-3">
              <span class="h5">${product.price}$</span>
              
            </div>

            <p>
              Sản phẩm chất lượng và kiểu dáng hiện đại là bộ sưu tập lấy cảm hứng từ công nghệ mới, tiếp tục
              phá vỡ các quy ước của công nghệ hiện nay . Được sản xuất tại Ý, phù hợp cho tất cả mọi người.
            </p>

            <div class="row">
              <dt class="col-3">Type:</dt>
              <dd class="col-9">...</dd>

              <dt class="col-3">Color</dt>
              <dd class="col-9">...</dd>

              <dt class="col-3">Material</dt>
              <dd class="col-9">...</dd>

              <dt class="col-3">Brand</dt>
              <dd class="col-9">...</dd>
            </div>

            <hr />

            <div class="row mb-4">
             
              
                <label class="mb-2 d-block">Quantity</label>
                <div class="input-group mb-3" style="width: 170px;">              
                <input id="quantity" type="number" value ="1" max="10" name="quantity" min="1" class="form-control quantity-input">
                </div>
                <div class="col-md-4 col-6">
                <button id="btnAddToCart" href="#" class="btn btn-warning shadow-0"> <i class="me-1 fa fa-shopping-basket"></i> Add to
                cart </button>
                </div>
              
            </div>
          </div>
        </main>
      </div>
        `
    )
}

function addEvents(){
    let btnAddToCart = document.getElementById('btnAddToCart')
    btnAddToCart.addEventListener('click', doAddToCart)
}

function doAddToCart(){
  let productId = document.getElementById('productId').value
  let productName = document.getElementById('productName').value
  let productImage = document.getElementById('productImage').value
  let productPrice = document.getElementById('productPrice').value
  let quantity = Number(document.getElementById('quantity').value)

  let item = {
    productId,
    productImage,
    productName,
    productPrice,
    quantity
  }

  addToCart(item)
  Swal.fire("Product added to cart!");
}