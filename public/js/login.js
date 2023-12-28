
function Login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost/api/users/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            // Lưu thông tin đăng nhập vào LocalStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('email', email);

            alert('Login successful');
            
            window.location.href = 'index.html';
        } else {
            alert(' ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
