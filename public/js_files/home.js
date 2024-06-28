function logout() {
    localStorage.removeItem('userId');
    window.location.href = 'index.html'; 
}

document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault();
    logout();
});