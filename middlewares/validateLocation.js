const Joi = require("joi");

const validateLocation = (req, res, next) => {
  const schema = Joi.object({
    locationReqName: Joi.string().min(1).max(50).required(),
    locationReqAddress: Joi.string().min(1).max(250).required(),
    status: Joi.string().min(1).max(1).required(),
    websiteLink: Joi.string().min(1).max(250),
  });

  const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return; // Terminate middleware execution on validation error
  }

  next(); // If validation passes, proceed to the next route handler
};

module.exports = validateLocation;