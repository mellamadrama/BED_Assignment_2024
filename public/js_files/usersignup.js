document.addEventListener("DOMContentLoaded", function() {
    const previousPage = localStorage.getItem('previousPage');

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            if (previousPage) {
                window.location.href = previousPage;
            } else {
                window.location.href = 'index.html';
            }
        });
    };

    const signup = document.getElementById('createUser');
    if (signup) {
        signup.addEventListener('submit', async function() {
            const username = document.getElementById('username').value;
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('pasword').value;

            const userDetails = {
                username,
                firstName,
                lastName,
                email,
                password
            };

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userDetails)
                });
                if (!response.ok) {
                    throw new Error('Failed to create user account');
                } else {
                    alert('User account created successfully. Please login');
                    window.location.href = 'user.html'
                }
            } catch (error) {
                console.error('Error: ', error);
                alert('Failed to create user accout=nt')
            }
        });
    }
});