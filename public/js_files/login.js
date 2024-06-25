document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const messageElement = document.getElementById('message');
    if (response.ok) {
        messageElement.textContent = 'Login successful';
        messageElement.style.color = 'green';
        window.location.href = 'home.html';
    } else {
        const error = await response.text();
        messageElement.textContent = error;
        messageElement.style.color = 'red';
    }
});

document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'index.html';
});