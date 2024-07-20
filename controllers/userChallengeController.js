const UserWeeklyChallenge = require('../models/userChallenge');

const getAllChallengesByUserID = async (req, res) => {
    try {
        const challenges = await UserWeeklyChallenge.getAllChallengesByUserID(req.params.userId);
        res.json(challenges);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateChallengeCompleted = async (req, res) => {
    const { challengeId, userId } = req.params;
    const { challengeCompleted } = req.body;

    try {
        const updatedChallenges = await UserWeeklyChallenge.updateChallengeCompleted(challengeId, userId, challengeCompleted);
        res.status(200).json(updatedChallenges);
    } catch (error) {
        console.error("Error updating user weekly challenge:", error);
        res.status(500).json({ message: "Error updating user weekly challenge", error });
    }
};


const deleteChallengeForEachUser = async (req, res) => {
    try {
        await UserWeeklyChallenge.deleteChallengeForEachUser(req.params.challengeId);
        res.status(200).send('Challenge deleted for each user successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createChallengeForEachUser = async (req, res) => {
    try {
        const { ChallengeID, ChallengeDesc, Points } = req.body;
        await UserWeeklyChallenge.createChallengeForEachUser(ChallengeID, ChallengeDesc, Points);
        res.status(201).send('Challenge created for each user successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllChallengesByUserID,
    updateChallengeCompleted,
    deleteChallengeForEachUser,
    createChallengeForEachUser
};
