document.addEventListener('DOMContentLoaded', async () => {
    async function fetchLastChallenge() {
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
            
            const lastChallenge = challenges[challenges.length - 1];
            return lastChallenge.ChallengeID;
        } catch (error) {
            console.error("Error fetching challenges:", error);
            throw error;
        }
    }

    function generateNextChallengeID(cId) {
        const numericPart = parseInt(cId.substring(1));
        const nextNumericPart = numericPart + 1;
        const nextChallengeID = 'C' + nextNumericPart.toString().padStart(9, '0');
        return nextChallengeID;
    }
    document.getElementById("addChallengeForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        let challengeDescription = document.getElementById('ChallengeDesc').value;
        let challengePoints = document.getElementById('ChallengePoints').value;

        if (challengeDescription && challengePoints) {
            try {
                const lastChallenge = await fetchLastChallenge();
                const newChallengeID = generateNextChallengeID(lastChallenge);

                const newChallenge = {
                    ChallengeID: newChallengeID,
                    ChallengeDesc: challengeDescription,
                    Points: challengePoints
                };

                const createChallenge = await fetch(`/createchallenges`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify(newChallenge)
                });
                if (!createChallenge.ok) {
                    throw new Error(`HTTP error! Status: ${createChallenge.status}`);
                }

                const newUserChallenge = {
                    ChallengeID: newChallengeID
                };

                const createUserChallenge = await fetch(`/createuserchallenges`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify(newUserChallenge)
                });
                if (!createUserChallenge.ok) {
                    throw new Error(`HTTP error! Status: ${createUserChallenge.status}`);
                }

                alert('Challenge added successfully!');
                document.getElementById('ChallengeDesc').value = '';
                document.getElementById('ChallengePoints').value = '';
            } catch (error) {
                console.error('Error adding challenge:', error);
                alert('Failed to add challenge. Please try again.');
            }

        } else {
            alert("Challenge description and challenge points are required");
        }
    });
});
