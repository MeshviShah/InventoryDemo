// models/category.model.js

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
      trim: true
    }
  },
  {
   timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
   versionKey: false // disables __v field
}
);

const Category = mongoose.model('Category', categorySchema);

export {Category};
