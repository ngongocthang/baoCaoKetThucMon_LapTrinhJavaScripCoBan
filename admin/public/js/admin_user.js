var userList = []
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost/api/users/index.php',
    type: 'GET',
    success: function (data) {
      var userList = JSON.parse(data)
      renderUserListUI(userList)
    },
    error: function (e) {
      console.log(e.message);
    }
  });
})

function renderUserListUI(userList) {
  $('#user-list').empty()
  userList.forEach(user => {
    $('#user-list').append(
      `
            <tr>
              <th scope="row">${user.id}</th>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.password}</td>
              <td>${user.role}</td>
              <td>  
              <a href="edit.html?id=${user.id}&name=${user.name}&email=${user.email}&password=${user.password}&role=${user.role}" class="btn btn-primary"><i data-lucide="pencil"></i> Edit</a>
              </td>
              <td>
              <div class="d-flex justify-content-end">
                <a href="" onClick="deleteUser(${user.id})" type="button" class="btn btn-primary"><i data-lucide="trash-2"></i>
                Delete</a></div>
            </td>
            </tr>
            `
    );
  });
}

function createUser() {
  var name = $('#name').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var role = $('#role').val();
  var userData = {
    name: name,
    email: email,
    password: password,
    role: role
};
  //  console.log(userData);

  $.ajax({
    url: 'http://localhost/api/users/create.php',
    type: 'POST',
    data: JSON.stringify(userData),
    contentType: 'application/json',
    success: function (response) {
        // console.log(response)
        if (response.message === 'create') {
            alert('Đăng ký thành công!');
            window.location.href = 'index.html';
        } else if (response.message === 'exists') {
            alert('Email đã được đăng ký. Vui lòng sử dụng email khác.');
        }
    },
    error: function (error) {
        console.log(error);
        alert('Đăng ký thất bại!');
    }
});

}


const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const userName = urlParams.get('name');
const userEmail = urlParams.get('email');
const userPassword = urlParams.get('password');
const userRole = urlParams.get('role');

document.getElementById('id').value = userId;
document.getElementById('name').value = userName;
document.getElementById('email').value = userEmail;
document.getElementById('password').value = userPassword;
document.getElementById('role').value = userRole;


function editUser() {
  var id = $('#id').val();
  var name = $('#name').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var role = $('#role').val();

  if (!id || !name || !email || !password || !role) {
    return;
  }

  var formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', role);

  $.ajax({
    type: 'POST',
    url: 'http://localhost/api/users/update.php' , 
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

function deleteUser(userId) {
  $.ajax({
    url: 'http://localhost/api/users/delete.php?userId=' + userId,
    type: 'GET',
    success: function (data) {
      location.reload()
    },
    error: function (e) {
      console.log(e.message);
    }
  });
}


function Login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', role);

  fetch('http://localhost/api/users/login.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.code === 200) {
          alert('Đăng nhập thành công!');
          
          // Lưu thông tin đăng nhập vào LocalStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', email);
          localStorage.setItem('role', role);

          // Chuyển hướng đến trang home.html
          window.location.href = 'home.html';
      } else {
          alert(' ' + data.message);
      }
  })
  .catch(error => console.error('Error:', error));
}


function isValidEmail(email) {
  // Biểu thức chính quy để kiểm tra định dạng email
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function registerUser() {
  // Lấy giá trị từ các trường input
  var name = $('#name').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var role = $('#role').val();

  // Kiểm tra nếu bất kỳ trường nào là rỗng
  if (!name || !email || !password || role) {
      alert('Vui lòng điền đầy đủ thông tin đăng ký.');
      return;
  }
    // Kiểm tra định dạng email
    if (!isValidEmail(email)) {
      alert('Định dạng email không hợp lệ.');
      return;
  }

  // Tạo đối tượng chứa dữ liệu đăng ký
  var userData = {
      name: name,
      email: email,
      password: password,
      role: role
  };

  // Gửi ajax request
  $.ajax({
      url: 'http://localhost/api/users/create.php',
      type: 'POST',
      data: JSON.stringify(userData),
      contentType: 'application/json',
      success: function (response) {
          if (response.message === 'create') {
              alert('Đăng ký thành công!');
              window.location.href = 'login.html';
          } else if (response.message === 'exists') {
              alert('Email đã được đăng ký. Vui lòng sử dụng email khác.');
          }
      },
      error: function (error) {
          console.log(error);
          alert('Đăng ký thất bại!');
      }
  });
}



// function registerUser() {
//   var name = $('#name').val();
//   var email = $('#email').val();
//   var password = $('#password').val();
//   var role = $('#role').val();
//   //  console.log(name,email);
//   var userData = {
//     name: name,
//     email: email,
//     password: password,
//     role: role
// };
//   //  console.log(userData);

//   $.ajax({
//     url: 'http://localhost/api/users/create.php',
//     type: 'POST',
//     data: JSON.stringify(userData),
//     contentType: 'application/json',
//     success: function (response) {
//         // console.log(response)
//         if (response.message === 'create') {
//             alert('Đăng ký thành công!');
//             window.location.href = 'login.html';
//         } else if (response.message === 'exists') {
//             alert('Email đã được đăng ký. Vui lòng sử dụng email khác.');
//         }
//     },
//     error: function (error) {
//         console.log(error);
//         alert('Đăng ký thất bại!');
//     }
// });

// }
