const sql = require("mssql");
const dbConfig = require("../dbConfig");

class ChatHistory {
    constructor(chatId, userId, sender, message, timestamp) {
        this.chatId = chatId;
        this.userId = userId;
        this.sender = sender;
        this.message = message;
        this.timestamp = timestamp;
    }

    // Save chat
    static async saveChat(userId, chatMessages) {
        let connection;
        try {
            connection = await sql.connect(dbConfig);
            const request = connection.request();
            request.input("userId", userId);

            // Check for existing chat history and delete it
            const checkQuery = `SELECT * FROM ChatHistory WHERE userId = @userId`;
            const checkResult = await request.query(checkQuery);

            if (checkResult.recordset.length > 0) {
                const deleteQuery = `DELETE FROM ChatHistory WHERE userId = @userId`;
                await request.query(deleteQuery);
            }

            // Insert new chat messages
            for (const chatMessage of chatMessages) {
                const insertQuery = `INSERT INTO ChatHistory (userId, sender, message, timestamp) VALUES (@userId, @sender, @message, @timestamp)`;
                const insertRequest = connection.request();
                insertRequest.input("userId", userId);
                insertRequest.input("sender", chatMessage.sender);
                insertRequest.input("message", chatMessage.message);
                insertRequest.input("timestamp", chatMessage.timestamp);
                await insertRequest.query(insertQuery);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error saving chat history");
        } finally {
            if (connection) {
                connection.close();
            }
        }
    }

    // Get chat by userId
static async getChatByUserId(userId) {
    let connection;
    try {
        connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM ChatHistory WHERE userId = @userId ORDER BY chatId ASC`;
        const request = connection.request();
        request.input("userId", userId);
        const result = await request.query(sqlQuery);
        return result.recordset.map(
            (row) => ({
                chatId: row.chatId,
                userId: row.userId,
                sender: row.sender,
                message: row.message,
                timestamp: row.timestamp
            })
        );
    } finally {
        if (connection) connection.close();
    }
    }

}

module.exports = ChatHistory;
