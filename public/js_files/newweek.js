document.addEventListener("DOMContentLoaded", function() {
    // Retrieve catId from localStorage
    const catId = localStorage.getItem('catId');
    if (!catId) {
        console.error('catId not found in localStorage.');
        return;
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

    //create new week
    const createWeekBtn = document.getElementById('create-week-btn');
    if (createWeekBtn) {
        createWeekBtn.addEventListener('click', async function() {
            const weekName = document.getElementById('weekName').value;
            const catId = localStorage.getItem('catId');
            const userId = "Acc0000002"; // Replace with actual user ID

            try {
                const res = await fetch('/weeks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ weekName, catId, userId })
                });

                if (!res.ok) {
                    throw new Error('Failed to create week');
                }

                const data = await res.json();
                console.log('Week created:', data);

                // Redirect back to the previous page after creation
                if (previousPage) {
                    window.location.href = previousPage;
                } else {
                    window.location.href = `choosencat.html?catId=${catId}`;
                }
            } catch (err) {
                console.error('Error creating week:', err);
            }
        });
    }
});