/**
 * Home Page
 */
// ready
$(document).ready(function () {
    getAllProducts();
    getHotProducts();
    getNewProducts();
})

// get all products
function getAllProducts() {
    $.ajax({
        url: 'http://localhost/api/products/index.php',
        type: 'GET',
        success: function (data) {
            var productList = JSON.parse(data)
            renderProductListUI(productList)
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}
// showAllProducts
function renderProductListUI(productList) {
    productList.forEach(product => {
        $('#product-list').append(
            `
                <div class="col-md-3 py-3">
                
                <a class="card" style="text-decoration: none" href="detail.html?productId=${product.id}">
                 <img src= "${product.image}" alt="">
                    <div class="card-body">
                        <h3 class="text-center">${product.name}</h3>
                        <p class="text-center">Sản phẩm bán chạy nhất.</p>
                        <div class="star text-center">
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        </div>
                        <h2>$${product.price} <span>
                            <li class="fa-solid fa-cart-shopping" "></li>
                        </span></h2>
                    </div>
                </a>
            </div> 
            `
        )
    });
}

// get hot Products
function getHotProducts() {
    $.ajax({
        url: 'http://localhost/api/products/hot.php',
        type: 'GET',
        success: function (data) {
            var productList = JSON.parse(data)
            renderHotProducts(productList)
        },
        error: function (e) {
            console.log(e.message);
        }
    });
} addEventListener
// show hot products
function renderHotProducts(productList) {
    productList.forEach(product => {
        $('#product-hot').append(
            `
                <div class="col-md-3 py-3">
                
                <a class="card" style="text-decoration: none" href="detail.html?productId=${product.id}">
                 <img src= "${product.image}" alt="">
                    <div class="card-body">
                        <h3 class="text-center">${product.name}</h3>
                        <p class="text-center">Sản phẩm bán chạy nhất.</p>
                        <div class="star text-center">
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        </div>
                        <h2>$${product.price} <span>
                            <li class="fa-solid fa-cart-shopping"></li>
                        </span></h2>
                    </div>
                </a>
            </div> 
            `
        )
    });
}

// get new Products
function getNewProducts() {
    $.ajax({
        url: 'http://localhost/api/products/new.php',
        type: 'GET',
        success: function (data) {
            var productList = JSON.parse(data)
            renderNewProducts(productList)
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}
// show new products
function renderNewProducts(productList) {
    productList.forEach(product => {
        $('#product-new').append(
            `
                <div class="col-md-3 py-3">
                
                <a class="card" style="text-decoration: none" href="detail.html?productId=${product.id}">
                 <img src= "${product.image}" alt="">
                    <div class="card-body">
                        <h3 class="text-center">${product.name}</h3>
                        <p class="text-center">Sản phẩm bán chạy nhất.</p>
                        <div class="star text-center">
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        <i class="fa-solid fa-star checked"></i>
                        </div>
                        <h2>$${product.price} <span>
                            <li class="fa-solid fa-cart-shopping"></li>
                        </span></h2>
                    </div>
                </a>
            </div> 
            `
        )
    });
}






