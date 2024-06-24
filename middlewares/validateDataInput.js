const Joi = require("joi");

const validateDataInput = (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.string().length(10).required(),
      catId: Joi.string().length(1).required(),
      weekName: Joi.string().min(1).max(100).required(),
      info: Joi.string().min(1).max(200).required(),
      amount: Joi.string().min(1).max(200).required(),
      dateInput: Joi.string().min(1).max(200).required(),
    });
  
    const validation = schema.validate(req.body, { abortEarly: false }); 
  
    if (validation.error) {
      const errors = validation.error.details.map((error) => error.message);
      res.status(400).json({ message: "Validation error", errors });
      return; 
    }
  
    next(); 
  };

module.exports = validateDataInput;