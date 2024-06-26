document.addEventListener("DOMContentLoaded", function() {
    //back button logic
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    //create new week
    const createWeekBtn = document.getElementById('create-week-btn');
    if (createWeekBtn) {
        createWeekBtn.addEventListener('click', async function() {
            const weekName = document.getElementById('weekname').value;
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

                // Redirect back to category screen after creation
                window.location.href = `choosencat.html?catId=${catId}`;
            } catch (err) {
                console.error('Error creating week:', err);
            }
        });
    }
});