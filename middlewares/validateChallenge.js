const Joi = require("joi");

const validateChallenge = (req, res, next) => {
  const schema = Joi.object({
    ChallengeID: Joi.string().lenght(10).required(),
    ChallengeDesc: Joi.string().min(1).max(200).required(),
    Points: Joi.int().min(1).max(20).required(),
  });

  const validation = schema.validate(req.body, { abortEarly: false }); 

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return; 
  }

  next(); 
};

module.exports = validateChallenge;