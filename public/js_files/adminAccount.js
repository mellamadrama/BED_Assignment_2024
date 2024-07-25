document.addEventListener('DOMContentLoaded', async function () {

    // retrieve userId from localStorage
    const adminId = localStorage.getItem('adminId');

    try {
        const response = await fetch(`/getadmin/${adminId}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
        }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
  
        const getAdmin = await response.json();
        console.log(getAdmin);
  
        document.getElementById('viewusername').textContent = `@${getAdmin.username}`;
        document.getElementById('viewfirstname').textContent = `${getAdmin.firstName}`;
        document.getElementById('viewlastname').textContent = `${getAdmin.lastName}`;
        document.getElementById('viewemail').textContent = `${getAdmin.email}`;
  
        document.getElementById('inputusername').value = getAdmin.username;
        document.getElementById('inputfirstName').value = getAdmin.firstName;
        document.getElementById('inputlastName').value = getAdmin.lastName;
        document.getElementById('inputemail').value = getAdmin.email;
        document.getElementById('inputpassword').value = getAdmin.password;
    } catch (error) {
        console.error('Error fetching admin data:', error);
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
        localStorage.removeItem('adminId');
        localStorage.removeItem('jwt');
        window.location.href = 'index.html';
      });
    }
  
    const updateAccount = document.getElementById('profileForm');
    if (updateAccount) {
      updateAccount.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('inputusername').value;
        const firstName = document.getElementById('inputfirstName').value;
        const lastName = document.getElementById('inputlastName').value;
        const email = document.getElementById('inputemail').value;
        const password = document.getElementById('inputpassword').value;
        const newAdminData = { username, firstName, lastName, email, password };
  
        try {
          const response = await fetch(`/updateadmin/${adminId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ newAdminData }),
          });
  
          if (response.ok) {
            alert('Details Updated');
            console.log('Details updated');
   
            const updatedAdmin = await response.json();
            localStorage.setItem('inputusername', newAdminData.username);
            localStorage.setItem('inputfirstName', newAdminData.firstName);
            localStorage.setItem('inputlastName', newAdminData.lastName);
            localStorage.setItem('inputemail', newAdminData.email);
            localStorage.setItem('inputpassword', newAdminData.password);
            location.reload();
          } else {
            alert('Failed to update details');
            console.log('Failed to update details');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        const adminId = localStorage.getItem('adminId');
        try {
          const response = await fetch(`deleteadmin/${adminId}`, {
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
            console.log("Failed to delete account");
          }
        } catch (error) {
          console.error('Error: ', error);
        }
      });
    }
  
  });
   
  
  