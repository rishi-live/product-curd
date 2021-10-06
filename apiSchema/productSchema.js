const Joi = require('@hapi/joi');

module.exports.insert = Joi.object().keys({
  category_name: Joi.string().required(),
  status: Joi.string().required()
});
module.exports.pdt_update = Joi.object().keys({
  category_name: Joi.string().required(),
  status: Joi.string().allow(null, '')
});
module.exports.category_insert = Joi.object().keys({
  product_name: Joi.string().required(),
  quantity: Joi.string().required().min(1).regex(/^[0-9]*$/),
  price: Joi.number().required(),
  category_id: Joi.string().required()
});