async function fetchEvents() {
    try {
        const response = await fetch("/events", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const eventList = document.getElementById("event-list");

        data.forEach((event) => {
            const eventItem = document.createElement("tr");
            eventItem.classList.add("bg-[#908660]", "border-t", "border-gray-200");

            const eventIdElement = document.createElement("td");
            eventIdElement.textContent = event.eventId;
            eventIdElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            const eventNameElement = document.createElement("td");
            eventNameElement.textContent = event.name;
            eventNameElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "overflow-hidden", "text-ellipsis", "max-w-60", "break-all", "border", "border-gray-200");

            const eventDescriptionElement = document.createElement("td");
            eventDescriptionElement.textContent = event.description;
            eventDescriptionElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "overflow-hidden", "text-ellipsis", "max-w-60", "break-all", "border", "border-gray-200");

            const eventDateElement = document.createElement("td");
            eventDateElement.textContent = new Date(event.date).toLocaleDateString();
            eventDateElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            const eventPriceElement = document.createElement("td");
            if (event.price != null) {
                eventPriceElement.textContent = event.price;
            } else {
                eventPriceElement.textContent = "Free";
            }
            eventPriceElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            const eventUpdateElement = document.createElement("td");
            const updateLink = document.createElement("a");
            updateLink.href = `../adminUpdateEvent.html?eventId=${event.eventId}`;
            updateLink.textContent = `Update`;
            updateLink.classList.add("underline");
            eventUpdateElement.appendChild(updateLink);
            eventUpdateElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            eventItem.appendChild(eventIdElement);
            eventItem.appendChild(eventNameElement);
            eventItem.appendChild(eventDescriptionElement);
            eventItem.appendChild(eventDateElement);
            eventItem.appendChild(eventPriceElement);
            eventItem.appendChild(eventUpdateElement);
            eventList.appendChild(eventItem);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

fetchEvents();
