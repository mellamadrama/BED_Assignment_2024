const sql = require("mssql");
const dbConfig = require("../dbConfig");

class UserWeeklyChallenge {
    constructor(userId, ChallengeID, ChallengeDesc, Points, ChallengeCompleted) {
        this.userId = userId;
        this.ChallengeID = ChallengeID;
        this.ChallengeDesc = ChallengeDesc;
        this.Points = Points;
        this.ChallengeCompleted = ChallengeCompleted;
    }

    static async getAllChallengesByUserID(uId) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM UserWeeklyChallenges WHERE userId = @uId`; 
            const request = connection.request();
            request.input("uId", uId); 
            const result = await request.query(sqlQuery);
            connection.close();
            return result.recordset;
        } catch (error) {
            console.error("Error fetching user weekly challenges:", error);
            throw error; 
        }
    }

    static async updateChallengeCompleted(cId, uId, newChallenge) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                UPDATE UserWeeklyChallenges 
                SET ChallengeCompleted = @ChallengeCompleted 
                WHERE ChallengeID = @ChallengeID AND userId = @userId`;
            const request = connection.request();
            request.input("ChallengeID", sql.NVarChar, cId);
            request.input("userId", sql.NVarChar, uId);
            request.input("ChallengeCompleted", sql.Char, newChallenge.ChallengeCompleted);
            await request.query(sqlQuery);
            connection.close();
            return this.getAllChallengesByUserID(uId);
        } catch (error) {
            console.error("Error updating user weekly challenge:", error);
            throw error;
        }
    }

    static async deleteChallengeForEachUser(cId) {
        const connection = await sql.connect(dbConfig);
        const fetchUserIdsQuery = `SELECT DISTINCT userId FROM UserWeeklyChallenges`;
        const request1 = connection.request();
        const userIdsResult = await request1.query(fetchUserIdsQuery);
        for (let i = 0; i < userIdsResult.recordset.length; i++) {
            const userId = userIdsResult.recordset[i].userId;
            const sqlQuery = `DELETE FROM UserWeeklyChallenges WHERE ChallengeID = @cId AND userId = @userId`;
            const request = connection.request();
            request.input("userId", userId);
            request.input("ChallengeID", cId);
            await request.query(sqlQuery);
        }
        connection.close();
        return true; 
    }

    static async createChallengeForEachUser(ChallengeID, ChallengeDesc, Points) {
        const connection = await sql.connect(dbConfig);
        const fetchUserIdsQuery = `SELECT DISTINCT userId FROM UserWeeklyChallenges`;
        const request1 = connection.request();
        const userIdsResult = await request1.query(fetchUserIdsQuery);
        for (let i = 0; i < userIdsResult.recordset.length; i++) {
            const userId = userIdsResult.recordset[i].userId;
            const sqlQuery = `
                INSERT INTO UserWeeklyChallenges (userId, ChallengeID, ChallengeDesc, Points, ChallengeCompleted)
                VALUES (@userId, @ChallengeID, @ChallengeDesc, @Points, 'N')
            `;
            const request = connection.request();
            request.input("userId", userId);
            request.input("ChallengeID", ChallengeID);
            request.input("ChallengeDesc", ChallengeDesc);
            request.input("Points", Points);
            await request.query(sqlQuery);
        }
        connection.close();
        return true; 
    }
}

module.exports = UserWeeklyChallenge;
