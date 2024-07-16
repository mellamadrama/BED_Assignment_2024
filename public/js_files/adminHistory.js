document.addEventListener("DOMContentLoaded", async function() {
    // retrieve adminId from localStorage
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
        console.error('No userId found in localStorage');
        return;
    }

    try {
        const response = await fetch(`/getadmin/${adminId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
  
        const getAdmin = await response.json();
        console.log(getAdmin)
  
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

    const fetchApprovedLocations = async () => {
        try {
            const adminId = 'Acc0000004'; // Replace with actual adminId or get it dynamically
            const response = await fetch(`/adminhistory/${adminId}`); // Adjust the endpoint as per your backend setup
            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }
            const locations = await response.json();
    
            // Select the container where you want to append location details
            const locationContainer = document.querySelector('.overflow-x-auto');
    
            // Clear existing content (optional, if needed)
            locationContainer.innerHTML = '';
    
            // Loop through each location and create HTML elements dynamically
            locations.forEach(location => {
                const locationDiv = document.createElement('div');
                locationDiv.className = 'inline-block rounded-lg border border-gray-200 p-4 mr-4 bg-white';
    
                // Populate data into the created elements
                locationDiv.innerHTML = `
                    <h5 class="font-bold mb-2">${location.name}</h5>
                    <p class="mb-2">Location Request ID: ${location.locationReqId}</p>
                    <p class="mb-2">Member ID: ${location.memberId}</p>
                    <p class="mb-2">Address: ${location.address}</p>
                    <p class="mb-2">Status: ${location.status}</p>
                `;
    
                // Append each location div to the container
                locationContainer.appendChild(locationDiv);
            });
        } catch (error) {
            console.error('Error fetching locations:', error);
            // Handle error, e.g., show error message
        }
    };
    fetchApprovedLocations();

    // add event listeners for log out
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
        alert('Logging out')
        localStorage.removeItem('adminId');
        window.location.href = 'index.html';
        });
    }
      
});