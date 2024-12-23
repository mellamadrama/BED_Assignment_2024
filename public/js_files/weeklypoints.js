document.addEventListener("DOMContentLoaded", () => {
    async function fetchUsernames(accIds) {
        try {
            const response = await fetch(`/getuser`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const usernames = await response.json();
            return usernames; 
        } catch (error) {
            console.error("Error fetching usernames:", error);
            throw error;
        }
    }

    async function fetchAndDisplayWeeklyPoints() {
        try {
            const response = await fetch(`/weeklypoints`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const weeklypoints = await response.json();

            const accIds = [...new Set(weeklypoints.map(point => point.userId))];

            const userMapsArray = await fetchUsernames(accIds);

            const userMaps = userMapsArray.reduce((acc, obj) => {
                acc[obj.userId] = obj.username;
                return acc;
            }, {});

            const leaderboardBody = document.querySelector(".leaderboard-body");
            leaderboardBody.innerHTML = "";

            weeklypoints.forEach((point, index) => {
                const row = document.createElement("tr");
                row.className = index % 2 === 0 ? "bg-[#e6f7ec]" : "";

                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;

                const userCell = document.createElement("td");
                const username = userMaps[point.userId] || "Unknown";
                userCell.textContent = username;

                const pointsCell = document.createElement("td");
                pointsCell.textContent = point.userWeeklyPoints;

                row.appendChild(rankCell);
                row.appendChild(userCell);
                row.appendChild(pointsCell);

                leaderboardBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching and displaying weekly points:", error);
        }
    }

    fetchAndDisplayWeeklyPoints();
});
