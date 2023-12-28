var productList = []
$(document).ready(function () {
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
})

function renderProductListUI(productList) {
  $('#Product-list').empty()
  productList.forEach(Product => {
    $('#Product-list').append(
      `
            <tr>
              <th scope="row">${Product.id}</th>
              <td>${Product.name}</td>
              <td>${Product.description}</td>
              <td>${Product.price}</td>
              <td>${Product.quantity}</td>
              <td>${Product.image}</td>
              <td>
            <a href="edit.html?id=${Product.id}&name=${Product.name}&description=${Product.description}&price=${Product.price}&quantity=${Product.quantity}&image=${Product.image}" class="btn btn-primary"><i data-lucide="pencil"></i> Edit</a>
              </td>
              <td>
              <div class="d-flex justify-content-end">
                <a href="#" onClick="deleteProduct(${Product.id})" type="button" class="btn btn-primary"><i data-lucide="trash-2"></i>
                Delete</a></div>
            </td>
            </tr>
            `
    );
  });
}
function createProduct() {
  var name = $('#name').val();
  var description = $('#description').val();
  var price = $('#price').val();
  var quantity = $('#quantity').val();
  var image = $('#image').val();
  // Gửi yêu cầu AJAX
  $.ajax({
    url: 'http://localhost/api/products/create.php',
    type: 'POST',
    data: {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      image: image
    },
    dataType: 'json',
    success: function (response) {
      console.log(response);

      window.location.href = 'index.html';
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });

}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const productName = urlParams.get('name');
const productDescription = urlParams.get('description');
const productPrice = urlParams.get('price');
const productQuantity = urlParams.get('quantity');
const productImage = urlParams.get('image');

document.getElementById('id').value = productId;
document.getElementById('name').value = productName;
document.getElementById('description').value = productDescription;
document.getElementById('price').value = productPrice;
document.getElementById('quantity').value = productQuantity;
document.getElementById('image').value = productImage;


function editProduct() {
  var id = $('#id').val();
  var name = $('#name').val();
  var description = $('#description').val();
  var price = $('#price').val();
  var quantity = $('#quantity').val();
  var image = $('#image').val();

  if (!id || !name || !description || !price || !quantity || !image) {
    return;
  }

  var formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('quantity', quantity);
  formData.append('image', image);

  // Tạo yêu cầu AJAX
  $.ajax({
    type: 'POST',
    url: 'http://localhost/api/products/update.php',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);

      window.location.href = './index.html';
    },
    error: function (xhr, status, error) {
      console.error('Lỗi AJAX: ' + status + ' - ' + error);
    }
  });
}

function deleteProduct(productId) {
  $.ajax({
    url: 'http://localhost/api/products/delete.php?productId=' + productId,
    type: 'GET',
    success: function (data) {
      location.reload()
    },
    error: function (e) {
      console.log(e.message);
    }
  });
}







