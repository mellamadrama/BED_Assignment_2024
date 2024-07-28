document.addEventListener("DOMContentLoaded", async function(event) {
    // Retrieve adminId from localStorage
    const adminId = localStorage.getItem('adminId');

    try {
        const response = await fetch(`/getadmin/${adminId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }

        const getAdmin = await response.json();

        const viewusername = document.getElementById('viewusername');
        const viewfirstname = document.getElementById('viewfirstname');
        const viewlastname = document.getElementById('viewlastname');
        const viewemail = document.getElementById('viewemail');
        const inputusername = document.getElementById('inputusername');
        const inputfirstName = document.getElementById('inputfirstName');
        const inputlastName = document.getElementById('inputlastName');
        const inputemail = document.getElementById('inputemail');
        const inputpassword = document.getElementById('inputpassword');

        if (viewusername) viewusername.textContent = `@${getAdmin.username}`;
        if (viewfirstname) viewfirstname.textContent = `${getAdmin.firstName}`;
        if (viewlastname) viewlastname.textContent = `${getAdmin.lastName}`;
        if (viewemail) viewemail.textContent = `${getAdmin.email}`;

        if (inputusername) inputusername.value = getAdmin.username;
        if (inputfirstName) inputfirstName.value = getAdmin.firstName;
        if (inputlastName) inputlastName.value = getAdmin.lastName;
        if (inputemail) inputemail.value = getAdmin.email;
        if (inputpassword) inputpassword.value = getAdmin.password;
    } catch (error) {
        console.error('Error fetching admin data:', error);
    }

    const fetchApprovedLocations = async () => {
        try {
            const response = await fetch(`/adminhistory/${adminId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }

            const locations = await response.json();
            const locationContainer = document.querySelector('.overflow-x-auto');

            // Clear existing content
            locationContainer.innerHTML = '';

            // Loop through each location
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

    // Add event listeners for log out
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            alert('Logging out');
            localStorage.removeItem('jwt');
            window.location.href = 'index.html';
        });
    }
});
