function getParam(param){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get(param)
}

$(document).ready(function () {
    var categoryId = getParam('categoryId')
    $.ajax({
        url: 'http://localhost/api/categories/show.php?categoryId=' + categoryId,
        type: 'GET',
        success: function (data) {
            var categoryList = JSON.parse(data)
            renderProductListUI(categoryList)
        },
        error: function (e) {
            console.log(e.message);
        }
    });
})


// showAllProducts
function renderProductListUI(categoryList) {
    categoryList.forEach(category => {
        $('#category-list').append(
            `
            <div class="col-md-3 py-3">
                
            <a class="card" style="text-decoration: none" href="detail.html?productId=${category.id}">
             <img src= "${category.image}" alt="">
                <div class="card-body">
                    <h3 class="text-center">${category.name}</h3>
                    <p class="text-center">Sản phẩm bán chạy nhất.</p>
                    <div class="star text-center">
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    <i class="fa-solid fa-star checked"></i>
                    </div>
                    <h2>$${category.price} <span>
                        <li class="fa-solid fa-cart-shopping"></li>
                    </span></h2>
                </div>
            </a>
        </div> 
            `
        )
    });
}