const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Challenge {
    constructor(userId, ChallengeID, ChallengeDesc, Points, ChallengeCompleted) {
        this.userId = userId;
        this.ChallengeID = ChallengeID;
        this.ChallengeDesc = ChallengeDesc;
        this.Points = Points;
        this.ChallengeCompleted = ChallengeCompleted
    }

    static async getAllChallenges() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM WeeklyChallenges`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new Challenge(row.ChallengeID, row.ChallengeDesc, row.Points)
        );
    }
  
    static async getAllChallengesByUserID(uId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM UserWeeklyChallenges WHERE userId = @uId`; 
    
        const request = connection.request();
        request.input("userId", uId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new Challenge(
                result.recordset[0].userId,
                result.recordset[0].ChallengeID,
                result.recordset[0].ChallengeDesc,
                result.recordset[0].Points,
                result.recordset[0].ChallengeCompleted
            )
            : null;
    }

    static async updateChallengeCompleted(cId, uId, newChallenge) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE UserWeeklyChallenges SET ChallengeCompleted = @ChallengeCompleted WHERE ChallengeID = @cId AND userId = @uId`; 
    
        const request = connection.request();
        request.input("ChallengeID", cId);
        request.input("userId", uId);
        request.input("ChallengeDesc", newChallenge.ChallengeDesc);
        request.input("Points", newChallenge.Points);
        request.input("ChallengeCompleted", newChallenge.ChallengeCompleted);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getAllChallengesByUserId(uId); 
    }
    

    static async deleteChallenge(cId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM WeeklyChallenges 
                            WHERE ChallengeID = @cId`;
    
        const request = connection.request();
        request.input("ChallengeID", cId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0;
    }

    static async deleteChallengeForEachUser(cId) {
        const connection = await sql.connect(dbConfig);
    
        const fetchUserIdsQuery = `
            SELECT DISTINCT userId FROM UserWeeklyChallenges
        `;
    
        const request1 = connection.request();
        const userIdsResult = await request1.query(fetchUserIdsQuery);
    
        for (let i = 0; i < userIdsResult.recordset.length; i++) {
            const userId = userIdsResult.recordset[i].userId;
    
            const sqlQuery = `
                DELETE FROM UserWeeklyChallenges WHERE ChallengeID = @cId AND userId = @userId
            `;
    
            const request = connection.request();
            request.input("userId", userId);
            request.input("ChallengeID", cId);

            await request.query(sqlQuery);
        }
    
        connection.close();
    
        return true; 
    }

    static async createChallenge(ChallengeID, ChallengeDesc, Points) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `
            INSERT INTO WeeklyChallenge (ChallengeID, ChallengeDesc, Points)
            VALUES (@ChallengeID, @ChallengeDesc, @Points)
        `;
    
        const request = connection.request();
        request.input("ChallengeID", ChallengeID);
        request.input("ChallengeDesc", ChallengeDesc);
        request.input("Points", Points);

        await request.query(sqlQuery);

        return true;
    }

    static async createChallengeForEachUser(ChallengeID, ChallengeDesc, Points) {
        const connection = await sql.connect(dbConfig);
    
        const fetchUserIdsQuery = `
            SELECT DISTINCT userId FROM UserWeeklyChallenges
        `;
    
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
            request.input("ChallengeDesc", 'N');
    
            await request.query(sqlQuery);
        }
    
        connection.close();
    
        return true; 
    }
    
    
}
  
  module.exports = Challenge;