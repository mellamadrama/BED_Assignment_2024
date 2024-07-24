function logout() {
    localStorage.removeItem('adminId');
    localStorage.removeItem('jwt');
    window.location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault(); 
    logout();
});