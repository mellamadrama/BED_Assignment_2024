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
});

// Update the week title name
function updateWeekName(weekName) {
    const weekNameElement = document.getElementById('week-title');
    if (weekNameElement) {
        weekNameElement.textContent = weekName;
    }
}