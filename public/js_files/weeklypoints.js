document.addEventListener("DOMContentLoaded", () => {
    async function fetchUsername(accId) {
        try {
            const response = await fetch(`/getuser`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const user = await response.json();
            console.log(user.userId);
            return { [accId]: user.username }; 
        } catch (error) {
            console.error("Error fetching user:", error);
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
            console.log(accIds)

            const userMapsArray = await Promise.all(accIds.map(accId => fetchUsername(accId)));

            const userMaps = userMapsArray.reduce((acc, obj) => {
                return { ...acc, ...obj };
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

    async function resetPoints() {
        try {
            const response = await fetch("/resetweekly", { method: "PUT" });
            if (response.ok) {
                alert("Points reset successfully.");
                fetchAndDisplayWeeklyPoints(); 
            } else {
                const errorData = await response.json();
                alert("Error resetting points:", errorData);
            }
        } catch (error) {
            console.error("Error resetting points:", error);
        }
    }

    document.getElementById("resetPointsButton").addEventListener("click", resetPoints);

    fetchAndDisplayWeeklyPoints();
});
