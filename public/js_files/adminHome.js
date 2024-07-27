function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault(); 
    logout();
});