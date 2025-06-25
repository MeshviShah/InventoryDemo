// models/product.model.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    description: {
      type: String,
      trim: true
    },
    quantity: {
      type: Number,
      required: [true],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false // disables __v field
  }
);
const Product = mongoose.model('Products', productSchema);
export  {Product};
