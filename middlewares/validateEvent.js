const Joi = require("joi");

const validateEvent = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(250).required(),
    address: Joi.string().max(250).allow(null, ''), 
    date: Joi.date().iso().allow(null), // Allow null for date
    price: Joi.number().precision(2).allow(null, ''), // Allow null for price
    adminId: Joi.string().max(10).allow(null, '') // Allow null for adminId
  });

  const validation = schema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return;
  }

  next();
};

module.exports = validateEvent;
