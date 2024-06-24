const Joi = require("joi");

const validateWeek = (req, res, next) => {
    const schema = Joi.object({
      weekName: Joi.string().min(1).max(100).required(),
      catId: Joi.string().length(1).required(),
      userId: Joi.string().length(10).required(),
    });
  
    const validation = schema.validate(req.body, { abortEarly: false }); 
  
    if (validation.error) {
      const errors = validation.error.details.map((error) => error.message);
      res.status(400).json({ message: "Validation error", errors });
      return; 
    }
  
    next(); 
  };

  const validateUpdateWeekName = (req, res, next) => {
    const schema = Joi.object({
      weekName: Joi.string().min(1).max(100).required(),
      catId: Joi.string().length(1).required(),
      userId: Joi.string().length(10).required(),
      newWeekName: Joi.string().min(1).max(100).required(),
    });

    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return;
    }

    next();
};

module.exports = {
  validateWeek,
  validateUpdateWeekName,
};