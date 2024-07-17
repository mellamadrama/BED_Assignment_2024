const Challenge = require("../models/challenge");

const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.getAllChallenges();
        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getChallengeByID = async (req, res) => {
    try {
        const challenge = await Challenge.getChallengeByChallengeID(req.params.id);
        res.json(challenge);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createChallenge = async (req, res) => {
    try {
        const { ChallengeID, ChallengeDesc, Points } = req.body;
        await Challenge.createChallenge(ChallengeID, ChallengeDesc, Points);
        res.status(201).send('Challenge created successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteChallenge = async (req, res) => {
    try {
        await Challenge.deleteChallenge(req.params.id);
        res.status(200).send('Challenge deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllChallenges,
    getChallengeByID,
    createChallenge,
    deleteChallenge
};
