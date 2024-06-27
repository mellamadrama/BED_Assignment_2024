async function fetchLocationRequests() {
    const response = await fetch("/locations");
    const data = await response.json();

    const locationList = document.getElementById("location-request-list");

    data.forEach((location) => {
        const locationItem = document.createElement("tr");
        locationItem.classList.add("bg-[#908660]");
        
        const locationIdElement = document.createElement("td");
        locationIdElement.textContent = location.locationReqId;
        locationIdElement.classList.add("px-6 py-4 whitespace-nowrap text-sm text-gray-900");

        const locationUserElement = document.createElement("td");
        locationUserElement.textContent = location.userId;
        locationUserElement.classList.add("px-6 py-4 whitespace-nowrap text-sm text-gray-900");

        const locationContentElement = document.createElement("td");
        locationContentElement.textContent = `${location.name}, ${location.address} `;
        locationContentElement.classList.add("px-6 py-4 whitespace-nowrap text-sm text-gray-900");

        const locationStatusElement = document.createElement("td");
        const status = null;
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
            default:
                status = "Pending";
                break;
        }
        locationStatusElement.textContent = status;
        locationStatusElement.classList.add("px-6 py-4 whitespace-nowrap text-sm text-gray-900");

        const locationUpdateElement = document.createElement("td");
        locationUpdateElement.createElement("a");
        locationUpdateElement.href = `../adminApproveLocation.html`;
        locationUpdateElement.textContent = `Update`;
        locationUpdateElement.classList.add("px-6 py-4 whitespace-nowrap text-sm text-gray-900 underline");

        locationItem.appendChild(locationIdElement);
        locationItem.appendChild(locationUserElement);
        locationItem.appendChild(locationContentElement);
        locationItem.appendChild(locationStatusElement);
        locationItem.appendChild(locationUpdateElement);

        locationList.appendChild(locationItem);
    });
}

fetchLocationRequests();