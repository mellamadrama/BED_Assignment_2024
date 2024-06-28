document.getElementById('deleteAccountBtn').addEventListener('click', function () {
  document.getElementById('deleteModal').classList.remove('hidden');
});

document.getElementById('closeBtn').addEventListener('click', function () {
  document.getElementById('deleteModal').classList.add('hidden');
});

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
  // in progress
  alert('Account deleted!');
  document.getElementById('deleteModal').classList.add('hidden');
  window.location.href = 'index.html'
});

document.getElementById('firstNameSubmit').addEventListener('click', function () {
    const firstName = document.getElementById('firstName');
    
    if (firstName.value.trim() === '') {
      alert('First name is required');
    } else {
      alert('First name updated');
      console.log('First name updated');
    }
  });

  document.getElementById('lastNameSubmit').addEventListener('click', function () {
    const firstName = document.getElementById('lastName');
    
    if (firstName.value.trim() === '') {
      alert('Last name is required');
    } else {
      alert('Last name updated');
      console.log('Last name updated');
    }
  });

  document.getElementById('usernameSubmit').addEventListener('click', function () {
    const firstName = document.getElementById('username');
    
    if (firstName.value.trim() === '') {
      alert('Username is required');
    } else {
      alert('Username updated');
      console.log('username updated');
    }
  });

  document.getElementById('emailSubmit').addEventListener('click', function () {
    const firstName = document.getElementById('email');
    
    if (firstName.value.trim() === '') {
      alert('Valid Email Address is required');
    } else {
      alert('Email Address updated');
      console.log('Email Address updated');
    }
  });

  document.getElementById('pwSubmit').addEventListener('click', function () {
    const firstName = document.getElementById('password');
    
    if (firstName.value.trim() === '') {
      alert('Password is required');
    } else {
      alert('Password updated');
      console.log('Password updated');
    }
  });

  document.addEventListener('DOMContentLoaded', async function () {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('No userId found in localStorage');
        return;
    }

    try {
        // Fetch user data from the server
        const response = await fetch(`/getUser/:${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const getUser = await response.json();

        // Update HTML elements with user data
        document.getElementById('viewusername').textContent = `@${getUser.username}`;
        document.getElementById('viewfirstname').textContent = `${getUser.firstName}`;
        document.getElementById('viewlastname').textContent = `${getUser.lastName}`;
        document.getElementById('viewemail').textContent = `${getUser.email}`;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});

