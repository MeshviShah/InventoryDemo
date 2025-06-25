import dotenv from 'dotenv';
import {Category }from '../Modal/index.js';
import {connection} from '../Config/index.js';

dotenv.config();

const seedCategories = async () => {
  try {
    await connection();

    const categories = [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Grocery' },
      { name: 'Accessories' }
    ];

    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log('Categories Added Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedCategories();
