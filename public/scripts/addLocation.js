document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("requestLocationForm").addEventListener("submit", async function (e) {
        e.preventDefault();
    
        let locationName = document.getElementById('locationName').value;
        let locationAddress = document.getElementById('locationAddress').value;

        if (locationName !== '' && locationAddress !== '') {
            const locationDetails = {
                name: locationName,
                address: locationAddress,
                status: 'P',
                websiteLink: null,
                userId: null, //update later 
                adminId: null
            }
    
            try {
                const response = await fetch('/createLocations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(locationDetails)
                });
    
                const result = await response.json();

                console.log(result);  // Log the server response for debugging
    
                if (!response.ok) {
                    const errorMessage = result.name || result.error || 'Unknown error';
                    alert(`Failed to send location request: ${errorMessage}`);
                    return;
                }
    
                if (result.status === 'success') {
                    alert('Location Request submitted!');
    
                    // Reset form fields after successful submission
                    document.getElementById('locationName').value = '';
                    document.getElementById('locationAddress').value = '';
                } else {
                    alert('Failed to submit location request');
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
