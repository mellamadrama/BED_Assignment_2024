// show user details
document.addEventListener('DOMContentLoaded', async function () {
  // retrieve userId from localStorage
  const userId = localStorage.getItem('userId');
  if (!userId) {
      console.error('No userId found in localStorage');
      return;
  }

  try {
      const response = await fetch(`/getuser/${userId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch user data');
      }

      const getUser = await response.json();
      console.log(getUser)

      document.getElementById('viewusername').textContent = `@${getUser.username}`;
      document.getElementById('viewfirstname').textContent = `${getUser.firstName}`;
      document.getElementById('viewlastname').textContent = `${getUser.lastName}`;
      document.getElementById('viewemail').textContent = `${getUser.email}`;
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
});

// for delete modal + btn
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

function logout() {
  localStorage.removeItem('userId');
  window.location.href = 'index.html'; 
}

document.getElementById('logoutBtn').addEventListener('click', function (e) {
  e.preventDefault();
  logout();
});

document.getElementById('profileForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const userId = localStorage.getItem('userId');
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!userId) {
    alert('User ID is missing. Please log in again.');
    return;
  }

  const updatedUserDetails = { 
    firstName, 
    lastName, 
    username, 
    email, 
    password, 
  };

  console.log(updatedUserDetails)

  try {
    const response = await fetch(`/updateuser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserDetails),
    });

    if (response.ok) {
      alert('Details Updated');
      console.log('Details updated');

      // update the displayed user details in the UI
      const updatedUser = await response.json();
      document.getElementById('viewusername').innerText = updatedUser.username;
      document.getElementById('viewfirstname').innerText = updatedUser.firstName;
      document.getElementById('viewlastname').innerText = updatedUser.lastName;
      document.getElementById('viewemail').innerText = updatedUser.email;
      document.getElementById('viewpassword').innerText = updatedUser.password;

    } else {
      alert('Failed to update details');
      console.error('Failed to update details');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});



