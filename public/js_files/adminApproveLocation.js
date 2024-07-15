document.addEventListener("DOMContentLoaded", async () => {
    let userId = null;
    let admin = localStorage.getItem('userId');

    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return Object.fromEntries(params.entries());
    }

    async function fetchLocationRequest(locationReqId) {
        try {
            const response = await fetch(`/locations/${locationReqId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            populateForm(data);
        } catch (error) {
            console.error('Error fetching location request:', error);
        }
    }

    function populateForm(data) {
        document.getElementById("approve-locationReqID").textContent = data.locationReqId;
        document.getElementById("approve-location-name").textContent = data.name;
        document.getElementById("approve-location-address").textContent = data.address;
        document.getElementById("approve-location-weblink").value = data.websiteLink || '';
        document.querySelector("select").value = data.status === 'A' ? 'Approved' : data.status === 'R' ? 'Rejected' : 'Pending';
        userId = data.userId;
    }

    const params = getQueryParams();
    if (params.locationReqId) {
        await fetchLocationRequest(params.locationReqId);
    }

    // Handle form submission
    document.getElementById("updateLocationForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedLocation = {
            name: document.getElementById("approve-location-name").textContent,
            address: document.getElementById("approve-location-address").textContent,
            status: document.getElementById("location-status").value,
            websiteLink: document.getElementById("approve-location-weblink").value,
            userId: userId,
            adminId: admin
        };

        async function updateLocation(locationReqId) {
            try {
                const response = await fetch(`/updlocations/${locationReqId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedLocation),
                });

                console.log('Updating location with:', updatedLocation);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Redirect or update UI on success
                alert('Location updated successfully');
                window.location.href = 'adminLocationRequest.html';
            } catch (error) {
                console.error('Error updating location:', error);
            }
        }

        if (params.locationReqId) {
            console.log('location req id: ', params.locationReqId);
            await updateLocation(params.locationReqId);
        }
    });
});
