import { axiosInstance } from './axios';


// Get all products with pagination, search, and category filter
export const getProducts = ({ page = 1, limit = 10, search = '', categories = [] }) => {
  const params = {
    page,
    limit,
    search,
    categories: categories.join(','), // backend should parse this
  };
  return axiosInstance.get('/product', { params });
};

// Add a new product
export const addProduct = (data) => {
  return axiosInstance.post('/product', data);
};

// Delete a product by ID
export const deleteProduct = (id) => {
  return axiosInstance.delete(`/product/${id}`);
};

// Get available categories
export const getCategories = () => {
  return axiosInstance.get('/product/category');
};

