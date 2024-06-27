document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get("catId");

    if (catId) {
        // Store the selected category id in localStorage
        localStorage.setItem("catId", catId);
    }

    if (catId) {
        // Fetch category details from the backend
        await fetchCategoryById(catId);
        await fetchWeekByCatId(catId);
    } else {
        console.error("No category ID found.");
    }
});

//get category by id
async function fetchCategoryById(catId) {
    try {
        const res = await fetch(`/categories/${catId}`);
        const data = await res.json();
        if (data) {
            console.log(data)
            if (data && data.catName) {
                updateCategoryName(data.catName);
            } else {
                console.error("Category data not found.");
            }
        }
    } catch (err) {
        console.error("Error fetching category data:", err);   
    }
} 

//update category name
function updateCategoryName(catName) {
    const categoryNameElement = document.getElementById('category-title');
    if (categoryNameElement) {
        categoryNameElement.textContent = catName;
    }
}

//getting the week by catId, userId
async function fetchWeekByCatId(catId) {
    try {
        const res = await fetch(`/weeks/${catId}/Acc0000002`);
        const data = await res.json();
        if (data) {
            console.log(data)
            if (data) {
                displayWeeks(data);
            } else {
                console.error("Week data not found.");
            }
        }
    } catch (err) {
        console.error("Error fetching week data:", err);   
    }
}

//display the weeks
function displayWeeks(weeks) {
    const weeksContainer = document.getElementById('weeks');
    if (weeksContainer) {
        // Clear any existing content
        weeksContainer.innerHTML = ''; 

        if (weeks.length > 0) {
            weeks.forEach(week => {
                const weekElement = document.createElement('week');
                weekElement.href = `week.html?weekName=${encodeURIComponent(week.weekName)}&catId=${week.catId}&userId=${week.userId}`;
                weekElement.className = "bg-[#baab76] font-semibold text-brown-800 py-16 px-8 w-48 text-center border-4 border-[#493d2c] rounded-[20px] bg-[#baab76] shadow-[0_0_0_4px_#baab76] hover:bg-[#f3e1c9] transition duration-300 ease-in-out cursor-pointer";
                weekElement.textContent = week.weekName;
                weekElement.addEventListener('click', function(event) {
                    event.preventDefault();
                    // Save week details to localStorage
                    localStorage.setItem('weekName', week.weekName);
                    localStorage.setItem('catId', week.catId);
                    localStorage.setItem('userId', week.userId);
                    // Navigate to week.html
                    window.location.href = weekElement.href;
                });
                weeksContainer.appendChild(weekElement);
            });
        } else {
            // Display message when no weeks are found
            weeksContainer.innerHTML = '<p>No weeks found for this category.</p>';
        }
    } else {
        console.error('Weeks container not found.');
    }
}
