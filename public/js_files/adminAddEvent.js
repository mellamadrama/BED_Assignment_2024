document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let admin = localStorage.getItem('adminId');

    document.getElementById("updateEventForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const newEvent = {
            name: document.getElementById("event-name").value,
            description: document.getElementById("event-description").value,
            address: document.getElementById("event-address").value,
            date: new Date(document.getElementById("event-date").value).toISOString(),
            price: document.getElementById("event-price").value.trim(), // Remove any extra spaces
            adminId: admin
        };


        try {
            const response = await fetch(`/createevents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify(newEvent)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
            }

            // Redirect or display success message
            alert('Event created successfully!');
            window.location.href = 'adminEvents.html';

        } catch (error) {
            console.error('Error creating event:', error);
        }
    });
});
