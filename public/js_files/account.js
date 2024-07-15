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


  // add event listeners for delete button
  const deleteBtn = document.getElementById('deleteAccountBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function() {
      document.getElementById('deleteModal').classList.remove('hidden');
    });
  }

  // add event listener for close modal button
  const closeBtn = document.getElementById('closeBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      document.getElementById('deleteModal').classList.add('hidden');
    });
  }

  // add event listeners for delete btn
  const comfirmDeleteBtn = document.getElementById('comfirmDeleteBtn');
  if (comfirmDeleteBtn) {
    comfirmDeleteBtn.addEventListener('click', function() {

      // in progress
      alert('Account deleted! ');
      document.getElementById('deleteModal').classList.add('hidden');
      window.location.href = 'index.html';
    });
  }

  // add event listeners for log out
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      alert('Logging out')
      localStorage.removeItem('userId');
      window.location.href = 'index.html';
    })
    
  }

});

document.getElementById('profileForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const userId = localStorage.getItem('userId');
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const newUserData = { firstName, lastName, username, email, password };

  if (!newUserData.username || !newUserData.email || !newUserData.firstName || !newUserData.lastName || !newUserData.password) {
    alert('Please enter updated user details');
    return;
  }

  try {
    const response = await fetch(`/updateuser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newUserData}),
    });

    if (response.ok) {
      alert('Details Updated');
      console.log('Details updated');
      // update the displayed user details in the UI
      const updatedUser = await response.json();
      localStorage.setItem('firstName', newUserData.firstName);
      localStorage.setItem('lastName', newUserData.lastName);
      localStorage.setItem('email', newUserData.email);
      localStorage.setItem('password', newUserData.password);
      localStorage.setItem('username', newUserData.username);
      location.reload();
    } else {
      alert('Failed to update details');
      console.error('Failed to update details');
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occured")
  }
});