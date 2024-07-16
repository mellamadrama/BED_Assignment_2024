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
  
        document.getElementById('inputusername').value = getUser.username;
        document.getElementById('inputfirstName').value = getUser.firstName;
        document.getElementById('inputlastName').value = getUser.lastName;
        document.getElementById('inputemail').value = getUser.email;
        document.getElementById('inputpassword').value = getUser.password;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    // add event listeners for log out
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      alert('Logging out')
      localStorage.removeItem('userId');
      window.location.href = 'index.html';
    });
  }

  const sustainableShoppingList = document.getElementById("sustainable-shopping-list");
    if (!sustainableShoppingList) {
        console.error("Element with ID 'sustainable-shopping-list' not found.");
        return;
    }
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }
        console.log(`Fetching locations for userId: ${userId}`);

        const response = await fetch(`/userlocation/${userId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const location = await response.json();
        console.log("Fetched locations:", location);

        if (!location || location.length === 0) {
            sustainableShoppingList.innerHTML = "<p>No sustainable shopping locations found.</p>";
            return;
        }

        location.forEach(userlocation => {
            const locationDiv = document.createElement("div");
            locationDiv.classList.add("inline-block", "rounded-lg", "border", "border-gray-200", "p-4", "mr-4", "bg-white");

            locationDiv.innerHTML = `
                <h5 class="font-bold mb-2">Location</h5>
                <p class="mb-2">Name of place: ${userlocation.name}</p>
                <p class="mb-2">Location of place: ${userlocation.address}</p>
                <p class="mb-2">Website Link: <a href="${userlocation.websiteLink}" class="text-blue-500 hover:underline" target="_blank">${userlocation.websiteLink}</a></p>
                <p class="mb-2">Status: ${userlocation.status}</p>
                <a href="#" class="bg-[#baab76] text-white px-4 py-2 rounded-md hover:underline">View</a>
            `;

            sustainableShoppingList.appendChild(locationDiv);
        });
    } catch (error) {
        console.error("Failed to fetch locations:", error);
    }
});