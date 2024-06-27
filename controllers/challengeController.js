const Challenge = require("../models/challenge");

const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.getAllChallenges();
        res.json(challenges);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving challenges");
    }
};

const getAllChallengesByUserID = async (req, res) => {
    const userId = req.params.userId;
    try {
        const challenges = await Challenge.getAllChallengesByUserID(userId);
        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllChallengesByChallengeID = async (req, res) => {
    const ChallengeID = req.params.challengeID;
    try {
        const challenges = await Challenge.getAllChallengesByChallengeID(ChallengeID);
        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateChallengeCompleted = async (req, res) => {
    const userId = req.params.userId;
    const challengeId = req.params.ChallengeID;
    const newChallenge = req.body;

    try {
        const updatedChallenge = await Challenge.updateChallengeCompleted(challengeId, userId, newChallenge);
        if (!updatedChallenge) {
            return res.status(404).send("Challenge not found");
        }
        res.json(updatedChallenge);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating completion status");
    }
};

const deleteChallenge = async (req, res) => {
    const challengeId = req.params.ChallengeID;

    try {
        const success = await Challenge.deleteChallenge(challengeId);
        if (!success) {
            return res.status(404).send("Challenge not found!");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting challenge");
    }
};

const deleteChallengeForEachUser = async (req, res) => {
    const challengeId = req.params.ChallengeID;

    try {
        const success = await Challenge.deleteChallengeForEachUser(challengeId);
        if (!success) {
            return res.status(404).send("Challenge not found!");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting challenge for each user");
    }
};

const createChallenge = async (req, res) => {
    const newChallenge = req.body;
    try {
        const createdChallenge = await Challenge.createChallenge(newChallenge);
        res.status(201).json(createdChallenge);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating challenge");
    }
};

const createChallengeForEachUser = async (req, res) => {
    const newChallenge = req.body;
    try {
        const createdChallenge = await Challenge.createChallengeForEachUser(newChallenge);
        res.status(201).json(createdChallenge);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating challenge for each user");
    }
};

module.exports = {
    getAllChallenges,
    getAllChallengesByUserID, 
    getAllChallengesByChallengeID,
    updateChallengeCompleted,
    deleteChallenge,
    deleteChallengeForEachUser,
    createChallenge,
    createChallengeForEachUser,
};
