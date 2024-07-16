const Joi = require("joi");

const validateLocation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    address: Joi.string().min(1).max(250).required(),
    status: Joi.string().length(1).required(), 
    websiteLink: Joi.string().max(250).allow(null, ''),
    userId: Joi.string().max(10).allow(null, ''), 
    adminId: Joi.string().max(10).allow(null, '') 
  });

  const validation = schema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return;
  }

  next();
};

module.exports = validateLocation;
