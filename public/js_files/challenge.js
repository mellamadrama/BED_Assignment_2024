document.addEventListener("DOMContentLoaded", async () => {
    async function getAllChallengesByChallengeID(challengeID, completed) {
        try {
            const userId = "Acc0000002";
            const response = await fetch(`/challenges/${challengeID}/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const challenges = await response.json();
            console.log(`Challenges for challengeID ${challengeID} and userId Acc0000002:`);
            console.log(challenges);

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
                checkbox.checked = completed; // if true, box check, else, empty
                checkbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-600", "mr-2");

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
            const userId = "Acc0000002";
            const response = await fetch(`/challenges/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const challenges = await response.json();
            console.log("Challenges for userId Acc0000002:");
            console.log(challenges);

            const challengeStatus = [];

            for (let i = 0; i < 7; i++) {
                const challenge = challenges[i];
                challengeStatus.push({
                    challengeId: challenge.ChallengeID,
                    completed: challenge.challengeCompleted === 'Y'
                });

                await getAllChallengesByChallengeID(challenge.ChallengeID, challenge.challengeCompleted === 'Y');
            }

            console.log("Challenge Info:");
            console.log(challengeStatus);

        } catch (error) {
            console.error("Error fetching challenges:", error);
        }
    }

    fetchAndDisplayChallenges();
});
