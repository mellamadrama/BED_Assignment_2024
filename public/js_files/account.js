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

// log out of account
// function logout() {
//   localStorage.removeItem('userId');
//   window.location.href = 'index.html'; 
// }

// document.getElementById('logoutBtn').addEventListener('click', function() {
//   logout();
// });

// update first name
document.getElementById('updateFirstname').addEventListener('submit', async function(event) {
  event.preventDefault();

  const userId = localStorage.getItem('userId');
  const firstName = document.getElementById('firstName').value;

  if (!newFirstname) {
    alert('Please enter a new first name');
    return;
  }

  try {
    const response = await fetch(`/updatefirstname/${firstName}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        firstName, userId, newFirstname
      })
    });

    if (response.ok) {
      alert('First name successfully updated!');
      localStorage.setItem('firstName', newFirstname);
      updateFirstname(newFirstname);
    } else {
      const errorMessage = await response.text();
      alert(`Failed to update first name: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occured.')
  }
});

// update last name
document.getElementById('updateLastname').addEventListener('submit', async function(event) {
  event.preventDefault();

  const userId = localStorage.getItem('userId');
  const lastName = document.getElementById('lastName').value;

  if (!newLastname) {
    alert('Please enter a new last name');
    return;
  }

  try {
    const response = await fetch(`/updatelastname/${lastName}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        lastName, userId, newLastname
      })
    });

    if (response.ok) {
      alert('Last name successfully updated!');
      localStorage.setItem('lastName', newLastname);
      updateLastname(newLastname);
    } else {
      const errorMessage = await response.text();
      alert(`Failed to update last name: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occured.')
  }
});

// update email
document.getElementById('updateEmail').addEventListener('submit', async function(event) {
  event.preventDefault();

  const userId = localStorage.getItem('userId');
  const email = document.getElementById('email').value;

  if (!newEmail) {
    alert('Please enter a new email');
    return;
  }

  try {
    const response = await fetch(`/updateemail/${email}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email, userId, newEmail
      })
    });

    if (response.ok) {
      alert('Email successfully updated!');
      localStorage.setItem('email', newEmail);
      updateEmail(newEmail);
    } else {
      const errorMessage = await response.text();
      alert(`Failed to update email address: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occured.')
  }
});



