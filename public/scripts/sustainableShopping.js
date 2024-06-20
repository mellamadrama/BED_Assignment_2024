async function fetchLocations() {
    const response = await fetch("/locations");
    const data = await response.json();

    const locationList = document.getElementById("location-list");

    data.forEach((location) => {
        const locationItem = document.createElement("div");
        locationItem.classList.add("bg-[#908660] rounded-md");
        
        const locationNameElement = document.createElement("h3");
        locationNameElement.textContent = `Name: ${location.locationReqName}`;

        const locationAddressElement = document.createElement("p");
        locationAddressElement.textContent = `Address: ${location.locationReqAddress}`;

        //add more elements

        locationItem.appendChild(locationNameElement);
        locationItem.appendChild(locationAddressElement);

        locationList.appendChild(locationItem);
    });
}

fetchLocations();