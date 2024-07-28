document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");
    let admin = localStorage.getItem('adminId');

    if (eventId) {
        try {
            const response = await fetch(`/events/${eventId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const event = await response.json();

            document.getElementById("event-id").textContent = event.eventId;
            document.getElementById("event-name").value = event.name;
            document.getElementById("event-description").value = event.description;
            document.getElementById("event-address").value = event.address; // Ensure address is included
            
            // Format the date correctly for an HTML datetime-local input
            const eventDate = new Date(event.date);
            const localDateTime = eventDate.toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' }).replace(' ', 'T');
            document.getElementById("event-date").value = localDateTime;

            document.getElementById("event-price").value = event.price;
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    }

    document.getElementById("updateEventForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedEvent = {
            name: document.getElementById("event-name").value,
            description: document.getElementById("event-description").value,
            date: new Date(document.getElementById("event-date").value).toISOString(),
            price: document.getElementById("event-price").value,
            address: document.getElementById("event-address").value,
            adminId: admin
        };


        try {
            const response = await fetch(`/updateevents/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify(updatedEvent)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
            }

            // Redirect or display success message
            alert('Event updated successfully!');
            window.location.href = 'adminEvents.html';

        } catch (error) {
            console.error('Error updating event:', error);
        }
    });

    document.getElementById("delete-btn").addEventListener("click", async (e) => {
        e.preventDefault();

        if (confirm("Are you sure you want to delete this event?")) {
            try {
                const response = await fetch(`/deleteevents/${eventId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Redirect or display success message
                alert('Event deleted successfully!');
                window.location.href = 'adminEvents.html';

            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    });
});
