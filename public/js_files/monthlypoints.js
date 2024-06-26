document.addEventListener("DOMContentLoaded", () => {
    async function fetchAndDisplayMonthlyPoints() {
        try {
            const response = await fetch("/monthlypoints"); // Fetch monthly points data
            const monthlyPoints = await response.json(); // Parse the JSON response
            console.log("Monthly Points (sorted from highest to lowest):");
            console.log(monthlyPoints);

            const leaderboardBody = document.querySelector(".leaderboard-body");
            leaderboardBody.innerHTML = ""; // Clear existing rows

            monthlyPoints.forEach((point, index) => {
                const row = document.createElement("tr");
                row.className = index % 2 === 0 ? "bg-[#e6f7ec]" : ""; // Alternate row background color

                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;

                const userCell = document.createElement("td");
                userCell.textContent = point.username; // Assuming username property exists in the fetched data

                const pointsCell = document.createElement("td");
                pointsCell.textContent = point.userMonthlyPoints; // Assuming userMonthlyPoints property exists in the fetched data

                row.appendChild(rankCell);
                row.appendChild(userCell);
                row.appendChild(pointsCell);

                leaderboardBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching monthly points:", error);
        }
    }

    fetchAndDisplayMonthlyPoints(); // Call the function to fetch and display monthly points
});
