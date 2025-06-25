// Controller/product.controller.js

import { createProductService, deleteProductService, getAllProductService } from '../Service/product.service.js';
import { response } from '../Interceptor/index.js';
import { messages } from '../Util/index.js';

/**
 * Create Product
 */
export const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    return response(res, {
      statusCode: 201,
      message: messages.product.CREATED,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Paginated Products
 */
export const getProducts = async (req, res, next) => {
  try {
    const result = await getAllProductService(req.query);
    return response(res, {
      statusCode: 200,
      message: messages.product.FETCHED,
      data: result.data,
      count: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Product by ID
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await deleteProductService(req.params.id);
    return response(res, {
      statusCode: 200,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};
