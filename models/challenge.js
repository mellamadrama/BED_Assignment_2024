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

    static async getUserChallengesByID(uId, cId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM UserWeeklyChallenges WHERE userId = @uId AND ChallengeID = @cId`; 
    
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
    
    static async resetWeeklyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `Update WeeklyPoints SET WeeklyPoints = 0`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; 
    }

    static async resetMonthlyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `Update MonthlyPoints SET MonthlyPoints = 0`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; 
    }
  }
  
  module.exports = Challenge;