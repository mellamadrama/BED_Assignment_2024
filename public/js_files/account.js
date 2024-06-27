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

// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(email);
// }

// function validatePassword(password) {
//   const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
//   return re.test(password);
// }