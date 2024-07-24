const UserWeeklyChallenge = require('../models/userChallenge');

const getAllChallengesByUserID = async (req, res) => {
    try {
        const challenges = await UserWeeklyChallenge.getAllChallengesByUserID(req.user.id);
        res.json(challenges);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateChallengeCompleted = async (req, res) => {
    const { challengeId } = req.params;
    const userId = req.user.id;
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
        const { ChallengeID } = req.body;

        if (!ChallengeID) {
            return res.status(400).send('ChallengeID is required');
        }

        await UserWeeklyChallenge.createChallengeForEachUser(ChallengeID);
        res.status(201).send('Challenge created for each user successfully');
    } catch (error) {
        console.error("Error creating challenge for each user:", error.message);
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllChallengesByUserID,
    updateChallengeCompleted,
    deleteChallengeForEachUser,
    createChallengeForEachUser
};
