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
    }

    const signup = document.getElementById('createAdmin');
    if (signup) {
        signup.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const adminDetails = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            try {
                const response = await fetch('/adminsignup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(adminDetails)
                });

                if (response.ok) {
                    const result = await response.text();
                    alert(result);
                    window.location.href = 'index.html';
                } else {
                    const errorResult = await response.json();
                    alert(`Error: ${errorResult.message}`);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                alert('Error creating admin account');
            }
        });
    }
});
