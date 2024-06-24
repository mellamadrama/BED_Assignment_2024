const Joi = require("joi");

const validateCategory = (req, res, next) => {
    const schema = Joi.object({
      catId: Joi.string().length(1).required(),
      catName: Joi.string().min(1).max(50).required(),
    });
  
    const validation = schema.validate(req.body, { abortEarly: false }); 
  
    if (validation.error) {
      const errors = validation.error.details.map((error) => error.message);
      res.status(400).json({ message: "Validation error", errors });
      return; 
    }
  
    next(); 
  };

module.exports = validateCategory;