document.addEventListener('DOMContentLoaded', async() => {
    document.getElementById("requestLocationForm").addEventListener("submit", async function (e) {
        e.preventDefault();
    
        const locationName = document.getElementById('locationName').value;
        const locationAddress = document.getElementById('locationAddress').value;
        //const user = 

        if (locationName !='' && locationAddress !='') {
            const locationDetails = {
                name: locationName,
                address: locationAddress,
                status: 'P',
                websiteLink: null,
                //userId: user,
                adminId: null
            }
    
            const response = await fetch('/createLocations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationDetails)
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                alert(`Failed to send location request: ${result.name}`);
                return;
            }
    
            if (result.status === 'success') {
                alert('Location Request submitted!');
    
                //reset form fields after successful submission
                locationName = '';
                locationAddress = '';
            } else {
                alert('Failed to submit location request');
            }
        } else {
            alert('Location Name and Address cannot be empty!');
        }
    })
})