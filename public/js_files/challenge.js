document.addEventListener("DOMContentLoaded", async () => {
    async function updateUserChallenge(ChallengeID, userId, newCompletedStatus) {
        try {
            const updateResponse = await fetch(`/updateuserchallenges/${ChallengeID}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ challengeCompleted: newCompletedStatus })
            });
            if (!updateResponse.ok) {
                throw new Error(`HTTP error! Status: ${updateResponse.status}`);
            }
        } catch (updateError) {
            console.error(`Error updating challenge ${ChallengeID}:`, updateError);
        }
    }

    async function getAllChallengesByChallengeID(challengeID, completed) {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("No userId found in localStorage");
            }
            const response = await fetch(`/challenges/${challengeID}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const challenges = await response.json();

            const challengeList = document.getElementById("challenge-list");

            challenges.forEach((challenge) => {
                const { ChallengeID, ChallengeDesc, Points } = challenge;

                const challengeItem = document.createElement("li");
                challengeItem.classList.add("flex", "gap-10", "justify-between", "items-center");

                const labelContainer = document.createElement("div");
                labelContainer.classList.add("flex", "items-center", "justify-between", "flex-1");

                const label = document.createElement("label");
                label.htmlFor = `challenge-${ChallengeID}`;
                label.textContent = `${ChallengeDesc}`;
                label.classList.add("block", "font-semibold", "text-lg", "mr-2");

                if (completed) {
                    label.classList.add("text-gray-700");
                } else {
                    label.classList.add("text-gray-400");
                }

                const pointsSpan = document.createElement("span");
                pointsSpan.textContent = `${Points}`;
                pointsSpan.classList.add("text-gray-700", "mr-2");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = `challenge-${ChallengeID}`;
                checkbox.checked = completed;
                checkbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-600", "mr-2");

                checkbox.addEventListener("change", async (event) => {
                    const newCompletedStatus = event.target.checked ? 'Y' : 'N';
                
                    try {
                        const userId = localStorage.getItem('userId');
                        if (!userId) {
                            throw new Error("No userId found in localStorage");
                        }
                
                        await updateUserChallenge(ChallengeID, userId, newCompletedStatus);
                
                        if (newCompletedStatus === 'Y') {
                            label.classList.remove("text-gray-400");
                            label.classList.add("text-gray-700");
                        } else {
                            label.classList.remove("text-gray-700");
                            label.classList.add("text-gray-400");
                        }
                
                    } catch (updateError) {
                        console.error(`Error updating challenge ${ChallengeID}:`, updateError);
                    }
                });                

                labelContainer.appendChild(label);
                labelContainer.appendChild(pointsSpan);

                challengeItem.appendChild(labelContainer);
                challengeItem.appendChild(checkbox);

                challengeList.appendChild(challengeItem);
            });

        } catch (error) {
            console.error("Error fetching challenges by challengeID:", error);
        }
    }

    async function fetchAndDisplayChallenges() {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("No userId found in localStorage");
            }
            const response = await fetch(`/userchallenges/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const challenges = await response.json();

            const challengeStatus = [];

            for (let i = 0; i < 7; i++) {
                const challenge = challenges[i];
                challengeStatus.push({
                    challengeId: challenge.ChallengeID,
                    completed: challenge.challengeCompleted === 'Y'
                });

                await getAllChallengesByChallengeID(challenge.ChallengeID, challenge.challengeCompleted === 'Y');
            }

        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    }

    async function fetchAndDisplayWeeklyPoints() {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("No userId found in localStorage");
            }
            const response = await fetch(`/userweeklypoints/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const points = await response.json();

            const userPoints = document.getElementById("weeklyPoints");
            userPoints.innerHTML = `This week’s points: <span class="font-semibold">${points.userWeeklyPoints}</span>`;

        } catch (error) {
            console.error("Error fetching points:", error);
        }
    }

    async function fetchAndDisplayMonthlyPoints() {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error("No userId found in localStorage");
            }
            const response = await fetch(`/usermonthlypoints/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const points = await response.json();

            const monthlyPoints = document.getElementById("monthlyPoints");
            if (monthlyPoints) {
                monthlyPoints.innerHTML = `This month’s points: <span class="font-semibold">${points.userMonthlyPoints}</span>`;
            } else {
                console.error("Element with ID 'monthlyPoints' not found in the DOM.");
            }

        } catch (error) {
            console.error("Error fetching points:", error);
        }
    }

    fetchAndDisplayChallenges();
    await fetchAndDisplayWeeklyPoints();
    await fetchAndDisplayMonthlyPoints();
});
