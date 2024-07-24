const user = require("../models/userAccount");
const Joi = require('joi');
const jwt = require("jsonwebtoken");

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().max(100).required(),
        password: Joi.string().max(250).required()
    });

    const validation = schema.validate(req.body, { abortEarly: false});

    if (validation.error) {
      const errors = validation.error.details.map((error) => error.message);
      res.status(400).json({ message: "Validation error", errors });
      return;
    }

    next();
};

module.exports = validateLogin;
