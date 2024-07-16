const Joi = require("joi");

const validateAdminId = (req, res, next) => {
    const schema = Joi.object({
        adminId: Joi.string().length(10).required()
    });

    const { error } = schema.validate(req.params);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    next();
};

module.exports = validateAdminId;
