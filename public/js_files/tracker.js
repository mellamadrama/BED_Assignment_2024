document.addEventListener("DOMContentLoaded", async function() {
    // Get the weekName, catId, and userId from localStorage
    const weekName = localStorage.getItem('weekName');
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');
    const dataId = localStorage.getItem('dataId');

    // Check if weekName exists in localStorage
    if (weekName, catId, userId, dataId) {
        // Update the week title
        updateTitleName(weekName);
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
                window.location.href = `week.html?weekName=${weekName}&catId=${catId}&userId=${userId}`;
            }
        });
    }

    // Add event listeners for the update and delete buttons
    //document.getElementById('delete-data').addEventListener('click', handleDeleteDataInput);
    //delete button
    const deleteButton = document.getElementById('delete-data');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this data input?')) {
                // Handle delete data input process
                handleDeleteDataInput();
            }
        });
    }

    //update button
    const updateButton = document.getElementById('update-data');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            document.getElementById('updatedata').classList.toggle('hidden');
        });
    }

    const updateBtn = document.getElementById('updatebtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', async function(event) {
            event.preventDefault();
            const info = document.getElementById('info').value;
            const amount = document.getElementById('amount').value;
            const dateInput = document.getElementById('date').value;
            await updateDataInput(info, amount, dateInput);
        });
    }

    if (weekName, catId, userId, dataId) {
        // Fetch week data input details from the backend
        fetchCatDataInputByIds(weekName, catId, userId, dataId);
    } else {
        console.error("No data input found.");
    }
});

// Update the week title name
function updateTitleName(weekName) {
    const titleNameElement = document.getElementById('title');
    if (titleNameElement) {
        titleNameElement.textContent = `${weekName} Data`;
    }
}

// get data input by id
async function fetchCatDataInputByIds(weekName, catId, userId, dataId) {
    try {
        const res = await fetch(`/datainput/${weekName}/${catId}/${userId}/${dataId}`);
        const data = await res.json();
        if (data && data.length > 0) {
            displayDataInput(data[0]);
        } else {
            console.error("Data input not found.");
        }
    } catch (err) {
        console.error("Error fetching data input:", err);
    }
}

// Display data input
function displayDataInput(data) {
    const infoElement = document.getElementById('datainfo');
    const amtElement = document.getElementById('dataamt');
    const dateElement = document.getElementById('datadate');

    if (infoElement && amtElement && dateElement) {
        infoElement.textContent = `Info: ${data.info}`;
        amtElement.textContent = `Amt: ${data.amount}`;
        dateElement.textContent = `Date: ${data.dateInput}`;
    }
}

// Update data input
async function updateDataInput(info, amount, dateInput) {
    const weekName = localStorage.getItem('weekName');
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');
    const dataId = localStorage.getItem('dataId');

    try {
        const res = await fetch(`/datainput/${weekName}/${catId}/${userId}/${dataId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                weekName, catId, userId, dataId, info, amount, dateInput
            })
        });
        if (res.ok) {
            const data = await res.json();
            console.log('Data updated successfully:', data);
            displayDataInput(data[0]);
            alert('Data updated successfully');
            document.getElementById('updatedata').classList.add('hidden');
        } else {
            console.error('Error updating data:', await res.text());
        }
    } catch (err) {
        console.error('Error updating data:', err);
    }
}

// Handle delete data input process
async function handleDeleteDataInput() {
    const weekName = localStorage.getItem('weekName');
    const catId = localStorage.getItem('catId');
    const userId = localStorage.getItem('userId');
    const dataId = localStorage.getItem('dataId');

    try {
        const res = await fetch(`/datainput/${weekName}/${catId}/${userId}/${dataId}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert('Data input deleted successfully');
            window.location.href = `week.html?weekName=${weekName}&catId=${catId}&userId=${userId}`;
        } else {
            const errorMessage = await response.text();
            console.error(`Error deleting data input: ${errorMessage}`);
        }
    } catch (err) {
        console.error('Error:', error);
            alert('An error occurred while deleting the week');
    }
}