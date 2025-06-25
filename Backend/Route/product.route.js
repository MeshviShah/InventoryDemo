// Routes/product.route.js

import express from 'express';
import {
  createProduct,
  getProducts,
  deleteProduct
} from '../Controller/index.js';
import { validate, validateCreateProduct, validateDeleteProduct } from '../Validation/index.js';

const productRoute = express.Router();

// Create a new product
productRoute.post('/',validateCreateProduct,validate, createProduct);

// Get all products (paginated, filtered)
productRoute.get('/', getProducts);

// Soft delete a product by ID
productRoute.delete('/:id',validateDeleteProduct, deleteProduct);

export  {productRoute};
