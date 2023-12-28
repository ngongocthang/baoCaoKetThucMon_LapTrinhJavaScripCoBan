
function logout() {
    // Xóa thông tin đăng nhập từ LocalStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');

    // Hiển thị lại liên kết đăng nhập và ẩn liên kết đăng xuất
    const loginDiv = document.getElementById('loginDiv');
    loginDiv.innerHTML = `<a href="login.html"><img src="./images/register.png" alt="" width="18px">Login</a>
                          <a href="register.html"><img src="./images/register.png" alt="" width="18px">Register</a>`;
}

window.onload = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');

    const loginDiv = document.getElementById('loginDiv');

    if (isLoggedIn === 'true' && userEmail) {
        // Nếu đã đăng nhập, hiển thị tên hoặc email và liên kết đăng xuất
        loginDiv.innerHTML = `<p>Welcome: ${userEmail}! 
                               <a href="#" onclick="logout()"><i data-lucide="log-out"></i>Logout</a></p>`;
    } else {
        // Nếu chưa đăng nhập, hiển thị các liên kết đăng nhập và đăng ký
        loginDiv.innerHTML = `<a href="login.html"><img src="./images/register.png" alt="" width="18px">Login</a>
                              <a href="register.html"><img src="./images/register.png" alt="" width="18px">Register</a>`;
    }
};