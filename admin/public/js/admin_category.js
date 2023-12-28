var categoryList = []
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost/api/categories/index.php',
    type: 'GET',
    success: function (data) {
      var categoryList = JSON.parse(data)
      renderCategoryListUI(categoryList)
    },
    error: function (e) {
      console.log(e.message);
    }
  });
})

function renderCategoryListUI(categoryList) {
  $('#category-list').empty()
  categoryList.forEach(category => {
    $('#category-list').append(
      `
            <tr>
              <th scope="row">${category.id}</th>
              <td>${category.name}</td>
              <td>${category.price}</td>
              <td>${category.image}</td>
              <td>${category.category_id}</td>
              <td>  
              <a href="edit.html?id=${category.id}&name=${category.name}&price=${category.price}&image=${category.image}&category_id=${category.category_id}" class="btn btn-primary"><i data-lucide="pencil"></i> Edit</a>
              </td>
              <td>
              <div class="d-flex justify-content-end">
                <a href="" onClick="deleteCategory(${category.id})" type="button" class="btn btn-primary"><i data-lucide="trash-2"></i>
                Delete</a></div>
            </td>
            </tr>
            `
    );
  });
}



function createCategory() {
  var name = $('#name').val();
  var price = $('#price').val();
  var image = $('#image').val();
  var category_id = $('#category_id').val();
  // Gửi yêu cầu AJAX
  $.ajax({
    url: 'http://localhost/api/categories/create.php',
    type: 'POST',
    data: {
      name: name,
      price: price,
      image: image,
      category_id: category_id
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
const categoryId = urlParams.get('id');
const categoryName = urlParams.get('name');
const categoryPrice = urlParams.get('price');
const categoryImage = urlParams.get('image');
const categoryCategoryId = urlParams.get('category_id');

document.getElementById('id').value = categoryId;
document.getElementById('name').value = categoryName;
document.getElementById('price').value = categoryPrice;
document.getElementById('image').value = categoryImage;
document.getElementById('category_id').value = categoryCategoryId;

function editCategory() {
  var id = $('#id').val();
  var name = $('#name').val();
  var price = $('#price').val();
  var image = $('#image').val();
  var category_id = $('#category_id').val();

  if (!id || !name || !price || !image || !category_id) {
    // alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  // Tạo đối tượng FormData để gửi các tệp tin
  var formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('price', price);
  formData.append('image', image);
  formData.append('category_id', category_id);

  // Tạo yêu cầu AJAX
  $.ajax({
    type: 'POST',
    url: 'http://localhost/api/categories/update.php' , 
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);

      window.location.href = 'index.html';
    },
    error: function (xhr, status, error) {
      console.error('Lỗi AJAX: ' + status + ' - ' + error);
    }
  });
}

function deleteCategory(categoryId) {
  $.ajax({
    url: 'http://localhost/api/categories/delete.php?categoryId=' + categoryId,
    type: 'GET',
    success: function (data) {
      location.reload()
    },
    error: function (e) {
      console.log(e.message);
    }
  });
}