document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("requestLocationForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        
        let locationName = document.getElementById('locationName').value;
        let locationAddress = document.getElementById('locationAddress').value;
        let user = localStorage.getItem('userId');

        if (locationName !== '' && locationAddress !== '') {
            const locationDetails = {
                name: locationName,
                address: locationAddress,
                status: 'P',
                websiteLink: null,
                userId: user,
                adminId: null
            };
            try {
                const response = await fetch('/createlocations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify(locationDetails)
                });

                if (response.ok) { // Check if the response status is in the range of 200-299
                    const result = await response.json();
                    console.log(result);  // Log the server response for debugging

                    if (result.status === 'success') { // Check if the result status is 'success'
                        alert('Location Request submitted!');
    
                        // Reset form fields after successful submission
                        document.getElementById('locationName').value = '';
                        document.getElementById('locationAddress').value = '';
                    } else {
                        alert('Failed to submit location request');
                    }
                } else {
                    const result = await response.json();
                    const errorMessage = result.message || 'Unknown error';
                    if (result.errors && result.errors.length > 0) {
                        alert(`Failed to send location request: ${result.errors.join(', ')}`);
                    } else {
                        alert(`Failed to send location request: ${errorMessage}`);
                    }
                }
            } catch (error) {
                console.error('Error:', error);  // Log any caught errors
                alert(`Failed to send location request: ${error.message}`);
            }
        } else {
            alert('Location Name and Address cannot be empty!');
        }
    });
});
