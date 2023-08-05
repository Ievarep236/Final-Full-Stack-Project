const Joi = require("joi");

const userScema = Joi.object({
  full_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  age: Joi.required(),
  password: Joi.string().required(),
});

module.exports = userScema;
