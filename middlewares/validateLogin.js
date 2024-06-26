const Joi = require('joi');

const validateLogin = (req, res, next) =>  {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  })

    const validation = scheme.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((error) => error.message);
      res.status(400).json({ message: "Validation error", errors });
      return; 
    }
  
    next(); 
  };

module.exports = validateLogin;
