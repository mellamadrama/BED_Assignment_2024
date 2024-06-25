document.addEventListener("DOMContentLoaded", () => {
    async function fetchAndDisplayWeeklyPoints() {
        try {
            const response = await fetch("/weeklypoints"); 
            const weeklypoints = await response.json();
            console.log("Weekly Points (sorted from highest to lowest):");
            console.log(weeklypoints);

            const leaderboardBody = document.querySelector(".leaderboard-body");
            leaderboardBody.innerHTML = ""; 

            weeklypoints.forEach((point, index) => {
                const row = document.createElement("tr");
                row.className = index % 2 === 0 ? "bg-[#e6f7ec]" : ""; 

                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;

                const userCell = document.createElement("td");
                userCell.textContent = point.username;

                const pointsCell = document.createElement("td");
                pointsCell.textContent = point.userWeeklyPoints; 

                row.appendChild(rankCell);
                row.appendChild(userCell);
                row.appendChild(pointsCell);

                leaderboardBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching weekly points:", error);
        }
    }

    fetchAndDisplayWeeklyPoints();
});
