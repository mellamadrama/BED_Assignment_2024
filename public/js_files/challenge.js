document.addEventListener("DOMContentLoaded", async () => {

    async function addWeeklyPoints(userId, pointsChange) {
        try {
            const addPointsResponse = await fetch(`/addweekly/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ points: pointsChange })
            });
            if (!addPointsResponse.ok) {
                throw new Error(`HTTP error! Status: ${addPointsResponse.status}`);
            }
        } catch (error) {
            console.error('Error adding weekly points:', error);
            throw error;
        }
    }

    async function addMonthlyPoints(userId, pointsChange) {
        try {
            const addMonthlyPointsResponse = await fetch(`/addmonthly/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ points: pointsChange })
            });
            if (!addMonthlyPointsResponse.ok) {
                throw new Error(`HTTP error! Status: ${addMonthlyPointsResponse.status}`);
            }
        } catch (error) {
            console.error('Error adding monthly points:', error);
            throw error;
        }
    }

    async function updateUserChallenge(challengeID, userId, newCompletedStatus) {
        try {
            const updateResponse = await fetch(`/updateuserchallenges/${challengeID}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ challengeCompleted: newCompletedStatus })
            });
            if (!updateResponse.ok) {
                throw new Error(`HTTP error! Status: ${updateResponse.status}`);
            }

            const challengeResponse = await fetch(`/challenges/${challengeID}`);
            if (!challengeResponse.ok) {
                throw new Error(`HTTP error! Status: ${challengeResponse.status}`);
            }
            const challenges = await challengeResponse.json();

            for (const challenge of challenges) {
                const { ChallengeID, ChallengeDesc, Points } = challenge;

                const pointsChange = (newCompletedStatus === 'Y') ? parseInt(Points) : -parseInt(Points);

                await addWeeklyPoints(userId, pointsChange);
                await addMonthlyPoints(userId, pointsChange);

                const label = document.querySelector(`label[for="challenge-${ChallengeID}"]`);
                if (!label) {
                    throw new Error(`Label element not found for challenge ${ChallengeID}`);
                }

                if (newCompletedStatus === 'Y') {
                    label.classList.remove("text-gray-400");
                    label.classList.add("text-gray-700");
                } else {
                    label.classList.remove("text-gray-700");
                    label.classList.add("text-gray-400");
                }
            }

        } catch (updateError) {
            console.error(`Error updating challenge ${challengeID}:`, updateError);
            throw updateError;
        }

        await fetchAndDisplayWeeklyPoints();
        await fetchAndDisplayMonthlyPoints();
    }

    async function getAllChallengesByChallengeID(challengeID, completed) {
        try {
            const userId = localStorage.getItem('userId');
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
            const response = await fetch(`/userchallenges/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
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
            const response = await fetch(`/userweeklypoints/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
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
            const response = await fetch(`/usermonthlypoints/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });
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
