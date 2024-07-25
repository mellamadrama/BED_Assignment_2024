async function displayLocations() {
    const response = await fetch(`/locations`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    });
    const data = await response.json();

    const locationList = document.getElementById("location-list");

    data.forEach((location) => {
        if (location.status == 'A') {
            const locationItem = document.createElement("a");
            locationItem.href = `${location.websiteLink}`;
            locationItem.target = "_blank";
            locationItem.className = "bg-[#908660] rounded-md text-black text-center hover:border-black hover:border-2 py-5 px-5 w-60";
            
            const locationNameElement = document.createElement("h3");
            locationNameElement.textContent = `Name: ${location.name}`;

            const locationAddressElement = document.createElement("p");
            locationAddressElement.textContent = `Address: ${location.address}`;

            locationItem.appendChild(locationNameElement);
            locationItem.appendChild(document.createElement("br"));
            locationItem.appendChild(locationAddressElement);

            locationList.appendChild(locationItem);
        }
    });
}

displayLocations();