import {Product,Category} from '../Modal/index.js';
import mongoose from 'mongoose';
import { messages } from '../Util/message.util.js';
import { buildQueryOptions } from '../Util/queryBuilder.util.js';

/**
 * Create a new product
 */
export const createProductService = async (body) => {
  const { name, description, quantity, categories } = body;

  // Check if product name already exists
  const existingProduct = await Product.findOne({ name: name.trim() });
  if (existingProduct) {
    throw {
      statusCode: 409,
      message: messages.product.ALREADY_EXISTS
    };
  }

  // Validate categories
  const foundCategories = await Category.find({ _id: { $in: categories } });
  if (foundCategories.length !== categories.length) {
    throw {
      statusCode: 400,
      message: 'One or more category IDs are invalid'
    };
  }

  const product = await Product.create({
    name: name.trim(),
    description,
    quantity,
    categories
  });

  return product;
};

/**
 * Get paginated and filtered products
 */
export const getAllProductService = async ({ page = 1, limit = 10, search = '', categories = [] }) => {
  const { query, options } = buildQueryOptions({
    page,
    limit,
    sort: 'createdAt',
    order: 'desc',
    filters: { categories },
    search,
    searchFields: ['name']
  });

  query.deletedAt = null;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('categories', 'name')
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit),

    Product.countDocuments(query)
  ]);

  return {
    data: products,
    total,
    page: options.page,
    limit: options.limit,
    pages: Math.ceil(total / options.limit)
  };
};


/**
 * Delete product by ID
 */
export const deleteProductService = async (id) => {


  const product = await Product.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: messages.product.NOT_FOUND
    };
  }

  product.deletedAt = new Date();
  await product.save();

  return { message: messages.product.DELETED };

};
