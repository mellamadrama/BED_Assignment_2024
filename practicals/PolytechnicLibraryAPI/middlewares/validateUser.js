const Joi = require("joi");
const validateUser = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        passwordHash: Joi.string().min(3).max(255).required(),
        role: Joi.string().valid('member', 'librarian').required()
    })

    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return;
    }

    next();
}
module.exports = validateUser;