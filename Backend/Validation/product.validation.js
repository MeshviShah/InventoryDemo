// Validation/product.validation.js

import { body, param } from 'express-validator';

export const validateCreateProduct = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required'),
  
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 0 }).withMessage('Quantity must be a integer'),

  body('categories')
    .isArray({ min: 1 }).withMessage('At least one category must be selected'),
];

export const validateDeleteProduct = [
  param('id').isMongoId().withMessage('Invalid product ID'),
];
