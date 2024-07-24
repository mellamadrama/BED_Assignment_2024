document.addEventListener("DOMContentLoaded", () => {
    async function fetchChallenges() {
        try {
            const response = await fetch(`/challenges`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const challenges = await response.json();
            console.log(challenges);
    
            const leaderboardBody = document.getElementById('challenge-list'); 
            leaderboardBody.innerHTML = '';
    
            challenges.forEach((challenge, index) => {
                const row = document.createElement("tr");
                row.classList.add("bg-[#908660]", "border-t", "border-gray-200");
    
                const challengeIDCell = document.createElement("td");
                challengeIDCell.textContent = challenge.ChallengeID;
                challengeIDCell.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");
    
                const challengeDescCell = document.createElement("td");
                challengeDescCell.textContent = challenge.ChallengeDesc;
                challengeDescCell.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");
    
                const pointsCell = document.createElement("td");
                pointsCell.textContent = challenge.Points;
                pointsCell.classList.add("px-6", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "border", "border-gray-200");
    
                row.appendChild(challengeIDCell);
                row.appendChild(challengeDescCell);
                row.appendChild(pointsCell);
    
                leaderboardBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching challenges:", error);
            throw error;
        }
    }
    
    fetchChallenges();
});
