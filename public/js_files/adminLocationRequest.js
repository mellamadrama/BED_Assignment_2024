async function fetchLocationRequests() {
    try {
        const response = await fetch("/locations");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const locationList = document.getElementById("location-request-list");

        data.forEach((location) => {
            const locationItem = document.createElement("tr");
            locationItem.classList.add("bg-[#908660]", "border-t", "border-gray-200");

            const locationIdElement = document.createElement("td");
            locationIdElement.textContent = location.locationReqId;
            locationIdElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            const locationUserElement = document.createElement("td");
            locationUserElement.textContent = location.userId;
            locationUserElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            const locationContentElement = document.createElement("td");
            locationContentElement.textContent = `${location.name}, ${location.address}`;
            locationContentElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "overflow-hidden", "text-ellipsis", "max-w-80", "break-all", "border", "border-gray-200");

            const locationStatusElement = document.createElement("td");
            let status = "Pending";
            switch (location.status) {
                case 'A':
                    status = "Approved";
                    break;
                case 'R':
                    status = "Rejected";
                    break;
                case 'P':
                    status = "Pending";
                    break;
            }
            locationStatusElement.textContent = status;
            locationStatusElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            const locationUpdateElement = document.createElement("td");
            const updateLink = document.createElement("a");
            updateLink.href = `../adminApproveLocation.html?locationReqId=${location.locationReqId}`;
            updateLink.textContent = `Update`;
            updateLink.classList.add("underline");
            locationUpdateElement.appendChild(updateLink);
            locationUpdateElement.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");

            locationItem.appendChild(locationIdElement);
            locationItem.appendChild(locationUserElement);
            locationItem.appendChild(locationContentElement);
            locationItem.appendChild(locationStatusElement);
            locationItem.appendChild(locationUpdateElement);
            locationList.appendChild(locationItem);
        });
    } catch (error) {
        console.error('Error fetching location requests:', error);
    }
}

fetchLocationRequests();
