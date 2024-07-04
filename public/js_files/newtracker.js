document.addEventListener("DOMContentLoaded", function() {
    // Retrieve catId from localStorage
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');
    const weekName = localStorage.getItem('weekName');
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
                window.location.href = `week.html?weekName=${weekName}&catId=${catId}&userId=${userId}`;
            }
        });
    }

    //create new data input
    const createDataInputBtn = document.getElementById('create-data-input-btn');
    if (createDataInputBtn) {
        createDataInputBtn.addEventListener('click', async function() {
            const weekName = localStorage.getItem('weekName');
            const catId = localStorage.getItem('catId');
            const userId = localStorage.getItem('userId');
            const info = document.getElementById('info').value;
            const amount = document.getElementById('amount').value;
            const dateInput = document.getElementById('date').value;

            try {
                const res = await fetch('/datainput', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ weekName, catId, userId, info, amount, dateInput })
                });

                if (!res.ok) {
                    throw new Error('Failed to create data input');
                }

                const data = await res.json();
                console.log('Data input created:', data);

                // Redirect back to the previous page after creation
                if (previousPage) {
                    window.location.href = previousPage;
                } else {
                    window.location.href = `week.html?weekName=${weekName}&catId=${catId}&userId=${userId}`;
                }
            } catch (err) {
                console.error('Error creating data input:', err);
            }
        });
    }
    
});