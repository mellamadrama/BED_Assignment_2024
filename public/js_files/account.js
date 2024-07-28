document.addEventListener('DOMContentLoaded', async function () {

  // retrieve userId from localStorage
  const userId = localStorage.getItem('userId');
  
  try {
      const response = await fetch(`/getuser/${userId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
      });
      if (!response.ok) {
          throw new Error('Failed to fetch user data');
      }

      const getUser = await response.json();

      document.getElementById('viewusername').textContent = `@${getUser.username}`;
      document.getElementById('viewfirstname').textContent = `${getUser.firstName}`;
      document.getElementById('viewlastname').textContent = `${getUser.lastName}`;
      document.getElementById('viewemail').textContent = `${getUser.email}`;

      document.getElementById('inputusername').value = getUser.username;
      document.getElementById('inputfirstName').value = getUser.firstName;
      document.getElementById('inputlastName').value = getUser.lastName;
      document.getElementById('inputemail').value = getUser.email;
      document.getElementById('inputpassword').value = getUser.password;
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

  // add event listeners for log out
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      alert('Logging out')
      localStorage.clear();
      window.location.href = 'index.html';
    });
  }

  const updateAccount = document.getElementById('profileForm');
  if (updateAccount) {
    updateAccount.addEventListener('submit', async function(e) {
      e.preventDefault();
      const userId = localStorage.getItem('userId');

      const username = document.getElementById('inputusername').value;
      const firstName = document.getElementById('inputfirstName').value;
      const lastName = document.getElementById('inputlastName').value;
      const email = document.getElementById('inputemail').value;
      const password = document.getElementById('inputpassword').value;
      const newUserData = { username, firstName, lastName, email, password };

      try {
        const response = await fetch(`/updateuser/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({ newUserData }),
        });

        if (response.ok) {
          alert('Details Updated');
 
          const updatedUser = await response.json();
          localStorage.setItem('inputusername', newUserData.username);
          localStorage.setItem('inputfirstName', newUserData.firstName);
          localStorage.setItem('inputlastName', newUserData.lastName);
          localStorage.setItem('inputemail', newUserData.email);
          localStorage.setItem('inputpassword', newUserData.password);
          location.reload();
        } else {
          alert('Failed to update details');
          console.error('Failed to update details');
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An error occurred");
      }
    });
  }

  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', async function() {
      const userId = localStorage.getItem('userId');
      
      try {
        const response = await fetch(`deleteuser/${userId}`, {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });

        if (response.ok) {
          alert('Account deleted successfully');
          window.location.href = 'index.html';
        } else {
          alert('Failed to delete account');
        }
      } catch (error) {
        console.error('Error: ', error);
        alert("An error occured");
      }
    });
  }

});
 

