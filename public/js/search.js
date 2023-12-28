function getParam(param){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get(param)
}

$(document).ready(function () {
    var key = getParam('key')
    $.ajax({
        url: 'http://localhost/api/products/search.php?key=' + key,
        type: 'GET',
        success: function (data) {
            var productList = JSON.parse(data)
            renderProductListUI(productList)
        },
        error: function (e) {
            console.log(e.message);
        }
    });
})


// show Search Products
function renderProductListUI(productList) {
    productList.forEach(product => {
        $('#products-search').append(
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





