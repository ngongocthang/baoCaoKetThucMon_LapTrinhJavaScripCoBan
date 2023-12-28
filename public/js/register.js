function registerUser() {
    // Lấy giá trị nhập từ người dùng
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

    $.ajax({
        url: 'http://localhost/api/users/create.php',
        type: 'POST',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        success: function (response) {
            // console.log(response)
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
