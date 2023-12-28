var itemList = []

function loadCart() {
    var json = localStorage.getItem('cart')
    if (json != null) {
        itemList = JSON.parse(json)     //sử dụng để chuyển đổi một chuỗi JSON thành một đối tượng JavaScript.
    }

    console.log(itemList)
    render(itemList)
}

function saveToLocaStorage() {
    this.localStorage.setItem('cart', JSON.stringify(itemList))
}
window.addEventListener('beforeunload', function (e) {
    saveToLocaStorage()
});

function addToCart(item) {
    let count = 0
    itemList.forEach(it => {
        if (it.productId == item.productId) {
            it.quantity += item.quantity
            count++;
        }
    })
    if (count == 0) {
        itemList.push(item)
    }

    saveToLocaStorage()
}

function removeFromCart(productId) {
    for (let i = 0; i < itemList.length; i++) {
        if (productId == itemList[i].productId) {
            itemList.splice(i, 1)

        }
    }
    render(itemList)
}
function render(cart) {
    $('#cart-list').empty();

    // Hiển thị danh sách sản phẩm
    let productListElement = $('<div class="col-md-8 col-lg-7"></div>');

    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        let productElement = `
        <div class="col-md-8 col-lg-10">
        <div class="items">
            <div class="product">
                <div class="row">
                    <input type="hidden" id="productId" value="${product.productId}" />
                    <div class="col-md-3">
                        <img class="img-fluid mx-auto d-block image" src="${product.productImage}" alt="${product.productName}">
                    </div>
                    <div class="col-md-9">
                        <div class="info">
                            <div class="row">
                                <div class="col-md-5 product-name">
                                    <div class="product-name">
                                        <h4>${product.productName}</h4>
                                        <div class="product-info">
                                            <div>Description: <span class="value">Sản phẩm điện tử.</span></div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 quantity">
                                    <label for="quantity">Quantity:</label>
                                    <input type="number" value="${product.quantity}" max="10" min="1" class="form-control quantity-input" onchange="updateQuantity(${product.productId}, this.value)">
                                </div>
                                <div class="col-md-2 price" style="margin-top: 0px;">
                                    <h5>Price:
                                    <span>${product.productPrice}$</span></h5>
                                </div>
                                <div class="col-md-2 ">
                                    <button type="button" class="btn btn-danger"  onclick="doDeleteItem(${product.productId})">
                                        <i data-lucide="trash-2"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        productListElement.append(productElement);
    }

    // Thêm danh sách sản phẩm vào #cart-list
    $('#cart-list').append(productListElement);

    // Tính tổng số lượng và giá trị đơn hàng
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].productPrice * cart[i].quantity;
    }

    // Hiển thị thông tin tổng giỏ hàng
    let summaryElement = `
        <div class="col-md-4 col-lg-5">
            <div class="summary">
                <h3>Bill</h3>
                <div class="summary-item"><span class="text">Subtotal</span><span class="price">${subtotal}$</span></div>
                <div class="summary-item"><span class="text">Discount</span><span class="price">$0</span></div>
                <div class="summary-item"><span class="text">Total</span><span class="price">${subtotal}$</span></div>
                <div class="d-flex justify-content-end">
                <a href="./checkout.html"><button type="button" class="btn btn-primary btn-lg btn-block" >Checkout</button></a> 
            </div>
        </div>
    </div>
    `;

    // Thêm thông tin tổng giỏ hàng vào #cart-list
    $('#cart-list').append(summaryElement);

    addCartEvents();
}

function addCartEvents() {
    let btnDeleteItem = document.getElementById('btnDeleteItem')
    btnDeleteItem.addEventListener('click', doDeleteItem)
}

function doDeleteItem(productId) {
    removeFromCart(productId)
}


// update quantity
function updateQuantity(productId, newQuantity) {
    for (let i = 0; i < itemList.length; i++) {
        if (productId == itemList[i].productId) {
            itemList[i].quantity = parseInt(newQuantity);
            break;
        }
    }
    saveToLocaStorage();
    render(itemList);
}

