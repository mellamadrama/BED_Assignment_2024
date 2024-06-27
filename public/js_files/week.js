document.addEventListener("DOMContentLoaded", function() {
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
    const newWeekName = prompt("Enter the new week name:");
    if (newWeekName) {
        const weekName = localStorage.getItem('weekName');
        const catId = localStorage.getItem('catId');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`/weeks/${weekName}/${catId}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ weekName, catId, userId, newWeekName })
            });

            if (response.ok) {
                const updatedWeek = await response.json();
                localStorage.setItem('weekName', newWeekName);
                updateWeekName(newWeekName);
                alert("Week name updated successfully.");
            } else {
                alert("Failed to update week name.");
            }
        } catch (error) {
            console.error("Error updating week:", error);
            alert("Error updating week.");
        }
    }
}