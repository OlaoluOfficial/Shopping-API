import Joi from 'joi';

// Validation for creating a new product
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Product name should be a string',
    'string.min': 'Product name should be at least 3 characters',
    'string.max': 'Product name should not exceed 100 characters',
    'any.required': 'Product name is required'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Price should be a number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required'
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock should be a number',
    'number.integer': 'Stock should be an integer',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required'
  })
});

// Validation for adding an item to the cart
export const addToCartSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'string.base': 'User ID should be a string',
    'any.required': 'User ID is required'
  }),
  product_id: Joi.string().required().messages({
    'string.base': 'Product ID should be a string',
    'any.required': 'Product ID is required'
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity should be a number',
    'number.integer': 'Quantity should be an integer',
    'number.min': 'Quantity should be at least 1',
    'any.required': 'Quantity is required'
  })
});

// Validation for checkout
export const checkoutSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'string.base': 'User ID should be a string',
    'any.required': 'User ID is required'
  })
});
