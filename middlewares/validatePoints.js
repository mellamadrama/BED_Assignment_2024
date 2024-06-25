const Joi = require("joi");

const validatePoints = (req, res, next) => {
  const schema = Joi.object({
    userWeeklyPoints: Joi.int().min(1).max(20).required(),
    userMonthlyPoints: Joi.int().min(1).max(20).required(),
  });

  const validation = schema.validate(req.body, { abortEarly: false }); 

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return; 
  }

  next(); 
};

module.exports = validatePoints;