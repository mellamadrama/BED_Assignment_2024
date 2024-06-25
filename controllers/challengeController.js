const Challenge = require("../models/challenge");

const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.getAllChallenges();
        res.json(challenges);
    } catch(error) {
        console.error(error);
        req.status(500).send("Error retrieving challenges");
    }
};

const getAllChallengesByUserID = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try{
        const challenges = await Challenge.getAllChallengesByUserID(userId);
        if (!challenges) {
            return res.status(404).send("User not found.")
        }
        res.json(challenges);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving challenges");
    }
};

const updateChallengeCompleted = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const challengeID = parseInt(req.params.ChallengeID);
    const newChallenge = req.body;

    try {
        const newChallenge = await Challenge.updateChallengeCompleted(challengeId, userId, newChallenge);
        if (!newChallenge) {
            return res.status(404).send("Challenge not found");
        }
        res.json(newChallenge);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updates completion status");
    }
};
 
const deleteChallenge = async (res, req) => {
    const challengeId = parseInt(req.params.ChallengeID);

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
}

const deleteChallengeForEachUser = async (res, req) => {
    const challengeId = parseInt(req.params.ChallengeID);

    try {
        const success = await Challenge.deleteChallenge(challengeId);
        if (!success) {
            return res.status(404).send("Challenge not found!");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting challenge for each user");
    }
}

const createChallenge = async (res, req) => {
    const newChallenge = req.body;
    try {
        const createdChallenge = await Challenge.createChallenge(newChallenge);
        res.status(201).json(createdChallenge);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating challenge");
    }
};

const createChallengeForEachUser = async (res, req) => {
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
    updateChallengeCompleted,
    deleteChallenge,
    deleteChallengeForEachUser,
    createChallenge,
    createChallengeForEachUser,
};