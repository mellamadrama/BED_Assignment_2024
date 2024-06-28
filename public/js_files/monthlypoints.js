document.addEventListener("DOMContentLoaded", () => {
    async function fetchAndDisplayMonthlyPoints() {
        try {
            const response = await fetch("/monthlypoints");
            const monthlyPoints = await response.json(); 
            console.log("Monthly Points (sorted from highest to lowest):");
            console.log(monthlyPoints);

            const leaderboardBody = document.querySelector(".leaderboard-body");
            leaderboardBody.innerHTML = "";

            monthlyPoints.forEach((point, index) => {
                const row = document.createElement("tr");
                row.className = index % 2 === 0 ? "bg-[#e6f7ec]" : ""; 

                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;

                const userCell = document.createElement("td");
                userCell.textContent = point.username; 

                const pointsCell = document.createElement("td");
                pointsCell.textContent = point.userMonthlyPoints; 

                row.appendChild(rankCell);
                row.appendChild(userCell);
                row.appendChild(pointsCell);

                leaderboardBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching monthly points:", error);
        }
    }

    async function resetPoints() {
        try {
            const response = await fetch("/resetmonthly", { method: "PUT" }); 
            if (response.ok) {
                console.log("Points reset successfully.");
                fetchAndDisplayMonthlyPoints(); 
            } else {
                const errorData = await response.json();
                console.error("Error resetting points:", errorData);
            }
        } catch (error) {
            console.error("Error resetting points:", error);
        }
    }

    document.getElementById("resetPointsButton").addEventListener("click", resetPoints);

    fetchAndDisplayMonthlyPoints(); 
});
