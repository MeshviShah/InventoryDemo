import {Product,Category} from '../Modal/index.js';
import mongoose from 'mongoose';
import { messages } from '../Util/message.util.js';
import { buildQueryOptions } from '../Util/queryBuilder.util.js';

//create product service
export const createProductService = async (body) => {
  const { name, description, quantity, categories } = body;

  // Check if product name already exists
  const existingProduct = await Product.findOne({ name: name.trim(), deletedAt: null });
  console.log(existingProduct)
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

//get all product service
export const getAllProductService = async ({
  page = 1,
  limit = 10,
  search = '',
  categories = ''
}) => {
  // Convert categories to array
  const categoryArray =
    typeof categories === 'string'
      ? categories.split(',').map((c) => c.trim()).filter(Boolean)
      : Array.isArray(categories)
        ? categories
        : [];

  const { query, options, page: parsedPage, limit: parsedLimit } = buildQueryOptions({
    page,
    limit,
    sort: 'createdAt',
    order: 'desc',
    filters: { categories: categoryArray },
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
    page: parsedPage,
    limit: parsedLimit,
    pages: Math.ceil(total / parsedLimit)
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

//fetch category for deopdown
export const getProductCategoriesService = async () => {
  const categories = await Category.find({ deletedAt: null })
    .select('_id name') 
    .sort({ name: 1 }); // Sort alphabetically by name

  return categories;
};