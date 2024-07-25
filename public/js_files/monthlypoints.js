document.addEventListener("DOMContentLoaded", () => {
    async function fetchUsernames() {
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

    async function fetchAndDisplayMonthlyPoints() {
        try {
            const response = await fetch("/monthlypoints", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const monthlypoints = await response.json();

            const accIds = [...new Set(monthlypoints.map(point => point.userId))];

            const userMapsArray = await fetchUsernames(accIds);

            const userMaps = userMapsArray.reduce((acc, obj) => {
                acc[obj.userId] = obj.username;
                return acc;
            }, {});
    
            const leaderboardBody = document.querySelector(".leaderboard-body");
            leaderboardBody.innerHTML = "";
    
            monthlypoints.forEach((point, index) => {
                const row = document.createElement("tr");
                row.className = index % 2 === 0 ? "bg-[#e6f7ec]" : "";
    
                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;
    
                const userCell = document.createElement("td");
                const username = userMaps[point.userId] || "Unknown";
                userCell.textContent = username;
    
                const pointsCell = document.createElement("td");
                pointsCell.textContent = point.userMonthlyPoints; // Ensure this matches your API response
    
                row.appendChild(rankCell);
                row.appendChild(userCell);
                row.appendChild(pointsCell);
    
                leaderboardBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching and displaying monthly points:", error);
        }
    }

    fetchAndDisplayMonthlyPoints();
});
