document.getElementById('deleteAccountButton').addEventListener('click', function () {
  document.getElementById('deleteAccountModal').classList.remove('hidden');
});

document.getElementById('closeModalButton').addEventListener('click', function () {
  document.getElementById('deleteAccountModal').classList.add('hidden');
});

document.getElementById('confirmDeleteButton').addEventListener('click', function () {
  // in progress
  alert('Account deleted!');
  document.getElementById('deleteAccountModal').classList.add('hidden');
});

document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if (firstName.value.trim() === '') {
      firstName.nextElementSibling.textContent = 'First name is required';
      firstName.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else {
      firstName.nextElementSibling.classList.add('hidden');
  }

  if (lastName.value.trim() === '') {
      lastName.nextElementSibling.textContent = 'Last name is required';
      lastName.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else {
      lastName.nextElementSibling.classList.add('hidden');
  }

  if (username.value.trim() === '') {
      username.nextElementSibling.textContent = 'Please choose a unique and valid username';
      username.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else {
      username.nextElementSibling.classList.add('hidden');
  }

  if (email.value.trim() === '') {
      email.nextElementSibling.textContent = 'Please enter a valid email address';
      email.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else if (!validateEmail(email.value.trim())) {
      email.nextElementSibling.textContent = 'Please enter a valid email address';
      email.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else {
      email.nextElementSibling.classList.add('hidden');
  }

  if (password.value.trim() === '') {
      password.nextElementSibling.textContent = 'Password is required';
      password.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else if (!validatePassword(password.value.trim())) {
      password.nextElementSibling.textContent = 'Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji';
      password.nextElementSibling.classList.remove('hidden');
      isValid = false;
  } else {
      password.nextElementSibling.classList.add('hidden');
  }

  if (isValid) {
      alert('Profile saved successfully!');
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  return re.test(password);
}