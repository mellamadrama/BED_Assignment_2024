const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Event {
    constructor(eventId, name, description, address, date, price, adminId) {
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.address = address;
        this.date = date;
        this.price = price;
        this.adminId = adminId;
    }

    static async getAllEvents() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Events;`;

        const request = connection.request();
        const result = await request.query(sqlQuery);


        connection.close();

        return result.recordset.map(
            (row) => new Event(row.eventId, row.name, row.description, row.address, row.date, row.price, row.adminId)
        );
    }

    static async getEventById(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Events WHERE eventId = @eventId;`; // Parameterized query

        const request = connection.request();
        request.input("eventId", id);
        const result = await request.query(sqlQuery);


        connection.close();

        return result.recordset[0]
            ? new Event(
                result.recordset[0].eventId, 
                result.recordset[0].name,
                result.recordset[0].description,
                result.recordset[0].address,
                result.recordset[0].date,
                result.recordset[0].price,
                result.recordset[0].adminId
            )
            : null; // Handle event not found
    }

    static async createEvent(newEventData) {
        const connection = await sql.connect(dbConfig);

        // Convert empty strings to null for numeric fields
        const price = newEventData.price ? parseFloat(newEventData.price) : null;

        const sqlQuery = `INSERT INTO Events (name, description, address, date, price, adminId) VALUES (@name, @description, @address, @date, @price, @adminId); SELECT SCOPE_IDENTITY() AS eventId;`; // Parameterized query

        const request = connection.request();
        request.input("name", sql.VarChar, newEventData.name);
        request.input("description", sql.VarChar, newEventData.description);
        request.input("address", sql.VarChar, newEventData.address);
        request.input("date", sql.DateTime, newEventData.date);
        request.input("price", sql.Decimal(18, 2), price); // Use the converted price
        request.input("adminId", sql.VarChar, newEventData.adminId);

        const result = await request.query(sqlQuery);

        connection.close();

        // Retrieve the newly created event using its ID
        return this.getEventById(result.recordset[0].eventId);
    }

    static async updateEvent(id, newEventData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Events SET name = @name, description = @description, address = @address, date = @date, price = @price, adminId = @adminId WHERE eventId = @eventId`;
        
        const request = connection.request();
        request.input("eventId", id);
        request.input("name", newEventData.name || null);
        request.input("description", newEventData.description || null);
        request.input("address", newEventData.address || null);
        request.input("date", newEventData.date || null);
        request.input("price", newEventData.price || null);
        request.input("adminId", newEventData.adminId || null);

        await request.query(sqlQuery);

        connection.close();

        return this.getEventById(id); // Returning the updated event data
        
    }    

    static async deleteEvent(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `DELETE FROM Events WHERE eventId = @eventId`; // Parameterized query

        const request = connection.request();
        request.input("eventId", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; // Indicate success based on affected rows
    }
}

module.exports = Event;
