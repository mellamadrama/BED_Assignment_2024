const Joi = require('joi');

async function validateUserSignup(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().min(1).max(100).required(),
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().min(1).max(100).required(),
        password: Joi.string().min(1).max(250).required(),
    });

    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return;
    }

    next();
};

module.exports = validateUserSignup;
