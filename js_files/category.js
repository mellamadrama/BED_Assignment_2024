document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    
    if (category) {
        // Update category title on page load
        document.getElementById("category-title").textContent = category;
        
        // Store the selected category in localStorage
        localStorage.setItem("selectedCategory", category);
    } else {
        // If no category is in the URL, check localStorage
        const savedCategory = localStorage.getItem("selectedCategory");
        
        if (savedCategory) {
            // Update category title from localStorage
            document.getElementById("category-title").textContent = savedCategory;
        }
    }
});