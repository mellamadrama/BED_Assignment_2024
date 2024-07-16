document.addEventListener("DOMContentLoaded", function() {
    const signup = document.getElementById('createAdmin');
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
                const response = await fetch('/adminsignup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userDetails)
                });
                if (!response.ok) {
                    throw new Error('Failed to create admin account');
                } else {
                    alert('Admin account created successfully. Please login');
                    window.location.href = 'admin.html'
                }
            } catch (error) {
                console.error('Error: ', error);
                alert('Failed to create admin accout=nt')
            }
        });
    }
});