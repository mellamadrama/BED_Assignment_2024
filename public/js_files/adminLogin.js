document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
        const response = await fetch('/loginAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
  
        const result = await response.json();
        if (response.ok) {
            // Save token to local storage
            localStorage.setItem("jwt", result.token);
            alert('Login Successful');
            
            window.location.href = 'homeAdmin.html';
        } else {
            document.getElementById('message').textContent = result.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
    }
  });
  
  document.getElementById('back').addEventListener('click', function() {
      window.location.href = 'index.html';
  });
  