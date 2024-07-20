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

    static async updateChallengeCompleted(cId, uId, ChallengeCompleted) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `
                UPDATE UserWeeklyChallenges 
                SET challengeCompleted = @ChallengeCompleted 
                WHERE ChallengeID = @ChallengeID AND userId = @userId`;
            const request = connection.request();
            request.input("ChallengeID", sql.NVarChar, cId);
            request.input("userId", sql.NVarChar, uId);
            request.input("ChallengeCompleted", sql.NVarChar, ChallengeCompleted); // Ensure ChallengeCompleted is passed as string
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

    static async createChallengeForEachUser(ChallengeID) {
        try {
            const connection = await sql.connect(dbConfig);
    
            const maxIdQuery = `SELECT MAX(userChallengeId) AS maxUserChallengeId FROM UserWeeklyChallenges`;
            const maxIdResult = await connection.request().query(maxIdQuery);
            let maxUserChallengeId = maxIdResult.recordset[0].maxUserChallengeId || 0;
    
            const fetchUserIdsQuery = `SELECT DISTINCT userId FROM UserWeeklyChallenges`;
            const userIdsResult = await connection.request().query(fetchUserIdsQuery);
                
            for (let i = 0; i < userIdsResult.recordset.length; i++) {
                const userId = userIdsResult.recordset[i].userId;
                const sqlQuery = `
                    INSERT INTO UserWeeklyChallenges (userChallengeId, userId, ChallengeID, ChallengeCompleted)
                    VALUES (@userChallengeID, @userId, @ChallengeID, 'N')
                `;
                const request = connection.request();
                
                maxUserChallengeId += 1;
    
                request.input("userChallengeID", sql.Int, maxUserChallengeId);
                request.input("userId", sql.NVarChar, userId);
                request.input("ChallengeID", sql.NVarChar, ChallengeID);
    
                await request.query(sqlQuery);
            }
            connection.close();
            return true; 
        } catch (error) {
            console.error("Error creating challenge for each user:", error.message);
            throw error;
        }
    }
}    

module.exports = UserWeeklyChallenge;
