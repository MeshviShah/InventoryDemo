// Controller/product.controller.js

import { createProductService, deleteProductService, getAllProductService,getProductCategoriesService } from '../Service/product.service.js';
import { response } from '../Interceptor/index.js';
import { messages } from '../Util/index.js';

//create product controller
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

//get all products controller
export const getProducts = async (req, res, next) => {
  try {
    const queryParams = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      search: req.query.search || '',
      categories: req.query.categories || ''
    };

    const result = await getAllProductService(queryParams);
    return res.status(200).json({
      status: true,
      message: 'Products fetched successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};


//delete product controller
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

//get product categories for dropdown controller
export const productCategoryDropdown = async (req, res, next) => {
  try {
    const categories = await getProductCategoriesService();
    return response(res, {
      statusCode: 200,
      message: messages.category.FETCHED, 
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
