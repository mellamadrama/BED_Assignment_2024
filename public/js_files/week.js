document.addEventListener("DOMContentLoaded", async function() {
    // Get the weekName, catId, and userId from localStorage
    const weekName = localStorage.getItem('weekName');
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');

    // Check if weekName exists in localStorage
    if (weekName) {
        // Update the week title
        updateWeekName(weekName);
    } else {
        console.error("No week name found in localStorage.");
    }

    // Retrieve the previous page URL from local storage
    const previousPage = localStorage.getItem('previousPage');

    // Back button logic
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            if (previousPage) {
                window.location.href = previousPage;
            } else {
                window.location.href = `choosencat.html?catId=${catId}`;
            }
        });
    }

    // Add event listeners for the update and delete buttons
    document.getElementById('update-week').addEventListener('click', handleUpdateWeek);
    document.getElementById('delete-week').addEventListener('click', handleDeleteWeek);

    if (weekName, catId, userId) {
        // Fetch week data input details from the backend
        await fetchCatDataInputById(weekName, catId, userId);
    } else {
        console.error("No data input found.");
    }
});

// Update the week title name
function updateWeekName(weekName) {
    const weekNameElement = document.getElementById('week-title');
    if (weekNameElement) {
        weekNameElement.textContent = weekName;
    }
}

// Handle update week process
async function handleUpdateWeek() {
    const weekName = localStorage.getItem('weekName');
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');
    const newWeekName = prompt('Enter a new week name');

    if (!newWeekName) {
        alert('Please enter a new week name');
        return;
    }

    try {
        const response = await fetch(`/weeks/${weekName}/${catId}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                weekName, catId, userId, newWeekName
            })
        });

        if (response.ok) {
            alert('Week name updated successfully');
            localStorage.setItem('weekName', newWeekName);
            updateWeekName(newWeekName);
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update week name: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the week name');
    }
}

async function handleDeleteWeek() {
    const weekName = localStorage.getItem('weekName');
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');

    if (confirm('Are you sure you want to delete this week and all related data?')) {
        try {
            const response = await fetch(`/weeks/${weekName}/${catId}/${userId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });

            if (response.ok) {
                alert('Week and related data deleted successfully');
                // Redirect or update the UI as needed
                window.location.href = `choosencat.html?catId=${catId}`;
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete week: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the week');
        }
    }
}

// Fetch week data input by weekName, catId, and userId
async function fetchCatDataInputById(weekName, catId, userId) {
    try {
        const response = await fetch(`/datainput/${weekName}/${catId}/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });
        const data = await response.json();
        if (data) {
            console.log(data);
            displayDataInputs(data);
        } else {
            console.error("Data input not found.");
        }
    } catch (error) {
        console.error("Error fetching data input:", error);
    }
}

// Display week data input
function displayDataInputs(datainputcontainer) {
    const datainputContainer = document.getElementById('datainputcontainer');
    if (datainputContainer) {
        // Clear any existing content
        datainputContainer.innerHTML = '';

        if (datainputcontainer.length > 0) {
            datainputcontainer.forEach(datainput => {
                const datainputElement = document.createElement('datainput');
                datainputElement.href = `tracker.html?weekName=${datainput.weekName}&catId=${datainput.catId}&userId=${datainput.userId}&dataId=${encodeURIComponent(datainput.dataId)}`;
                datainputElement.className = "bg-[#807558] rounded-lg p-4 mb-4 max-w-fit mx-auto text-left shadow-[0_0_0_4px_#baab76] hover:bg-[#f3e1c9] transition duration-300 ease-in-out cursor-pointer";
                datainputElement.innerHTML = `
                    <p id="datainfo" class="text-lg">Info:  ${datainput.info}</p>
                    <p id="dataamt" class="text-lg">Amt:    ${datainput.amount}</p>
                    <p id="datadate" class="text-lg">Date:  ${datainput.dateInput}</p>
                `;
                datainputElement.addEventListener('click', function(event) {
                    event.preventDefault();
                    // Save week details to localStorage
                    localStorage.setItem('weekName', datainput.weekName);
                    localStorage.setItem('catId', datainput.catId);
                    localStorage.setItem('userId', datainput.userId);
                    localStorage.setItem('dataId', datainput.dataId);
                    // Navigate to week.html
                    window.location.href = datainputElement.href;
                });
                datainputContainer.appendChild(datainputElement);
            });
        } else {
            // Display message when no data inputs are found
            datainputContainer.innerHTML = '<p>No data inputs found for this category.</p>';
        }
    } else {
        console.error('Data input container not found.');
    }
}