const Event = require("../models/event");

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.getAllEvents();
        res.json(events);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving events");
    }
};

const getEventById = async(req, res) => {
    const eventId = req.params.eventId;
    console.log("Received eventId:", eventId); // Debugging

    try {
        const event = await Event.getEventById(eventId);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        res.json(event);
    } catch (error) {
        console.error("Error retrieving event:", error); // Debugging
        res.status(500).send("Error retrieving event");
    }
};


const createEvent = async (req, res) => {
    const { name, description, address, date, price, adminId } = req.body;
    console.log("Received event:", req.body); // Debugging

    try {
        const newEventData = { name, description, address, date, price, adminId };
        const event = await Event.createEvent(newEventData);
        res.status(201).json(event);
    } catch (error) {
        console.error("Error creating event:", error); // Debugging
        res.status(500).send("Error creating event");
    }
};


const updateEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const newEventData = req.body;

    console.log('Received Data for Update:', newEventData); // Logging the received data

    try {
        const updatedEvent = await Event.updateEvent(eventId, newEventData);
        if (!updatedEvent) {
            return res.status(404).send("Event not found");
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating event");
    }
};


const deleteEvent = async (req, res) => {
    const eventId = parseInt(req.params.eventId); // Ensure parsing ID

    try {
        const success = await Event.deleteEvent(eventId);
        if (!success) {
            return res.status(404).send("Event not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting event");
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}