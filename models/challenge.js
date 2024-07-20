const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Challenge {
    constructor(ChallengeID, ChallengeDesc, Points) {
        this.ChallengeID = ChallengeID;
        this.ChallengeDesc = ChallengeDesc;
        this.Points = Points;
    }

    static async getAllChallenges() {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM WeeklyChallenge`; 
        const request = connection.request();
        const result = await request.query(sqlQuery);
        connection.close();
        return result.recordset.map(
            (row) => new Challenge(row.ChallengeID, row.ChallengeDesc, row.Points)
        );
    }

    static async getChallengeByChallengeID(cId) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM WeeklyChallenge WHERE ChallengeID = @cId`; 
            const request = connection.request();
            request.input("cId", cId); 
            const result = await request.query(sqlQuery);
            connection.close();
            return result.recordset;
        } catch (error) {
            console.error("Error fetching challenges:", error);
            throw error; 
        }
    }

    static async createChallenge(ChallengeID, ChallengeDesc, Points) {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `
            INSERT INTO WeeklyChallenge (ChallengeID, ChallengeDesc, Points)
            VALUES (@ChallengeID, @ChallengeDesc, @Points)
        `;
        const request = connection.request();
        request.input("ChallengeID", sql.NVarChar, ChallengeID);
        request.input("ChallengeDesc", ChallengeDesc);
        request.input("Points", Points);
        await request.query(sqlQuery);
        connection.close();
        return true;
    }

    static async deleteChallenge(cId) {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `DELETE FROM WeeklyChallenge WHERE ChallengeID = @cId`;
        const request = connection.request();
        request.input("ChallengeID", cId);
        const result = await request.query(sqlQuery);
        connection.close();
        return result.rowsAffected > 0;
    }
}

module.exports = Challenge;
