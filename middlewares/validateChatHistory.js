const Joi = require("joi");

// Validation for saving chat history
const validateSaveChat = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().length(10).required(),
        chatMessages: Joi.array().items(
            Joi.object({
                sender: Joi.string().valid('user', 'model').required(),
                message: Joi.string().required(),
                timestamp: Joi.date().required()
            })
        ).required()
    });

    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return;
    }

    next();
};

module.exports = validateSaveChat;
