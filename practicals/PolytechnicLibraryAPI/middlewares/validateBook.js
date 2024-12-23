const Joi = require("joi");
const validateBook = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        author: Joi.string().min(3).max(255).required(),
        availability: Joi.string().length(1).required()
    })

    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return;
    }

    next();
}
module.exports = validateBook;