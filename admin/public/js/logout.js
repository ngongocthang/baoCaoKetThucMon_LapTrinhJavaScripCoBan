function logout() {
    console.log("abc dc gọi")
    // Xóa thông tin đăng nhập từ LocalStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    // Chuyển hướng đến trang đăng nhập
    window.location.href = './login.html';
}

window.onload = function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('email');

    const loginDiv = document.getElementById('loginDiv');

    if (isLoggedIn === 'true' && userEmail) {
        // Nếu đã đăng nhập, hiển thị email 
        loginDiv.innerHTML = `<p>Welcome: ${userEmail}!`;
    } else {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        window.location.href = './login.html';
    }
};