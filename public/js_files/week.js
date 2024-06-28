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
    document.getElementById('delete-week').addEventListener('click', handleDeleteWeek);
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
                'Content-Type': 'application/json'
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
                method: 'DELETE'
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