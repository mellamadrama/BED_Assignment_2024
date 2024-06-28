const sql = require('mssql');

// Assume you have established your SQL connection

// Function to get user details by userId
async function getUserDetails(userId) {
    try {
        const query = `SELECT * FROM Users WHERE userId = @userId`;
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query(query);

        return result.recordset[0]; // Assuming only one user found with that userId
    } catch (error) {
        throw new Error(`Error fetching user details: ${error.message}`);
    }
}

module.exports = {
    getUserDetails
};
