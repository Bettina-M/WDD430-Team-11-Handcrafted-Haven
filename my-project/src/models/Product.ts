import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  stock: number;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Jewelry & Accessories',
        'Home Decor',
        'Art & Paintings',
        'Textiles & Fabrics',
        'Woodworking',
        'Pottery & Ceramics',
        'Candles & Soaps',
        'Leather Goods',
        'Metal Work',
        'Paper Crafts',
        'Glass Work',
        'Other'
      ],
    },
    images: {
      type: [String],
      default: [],
    },
    sellerId: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ProductSchema.index({ sellerId: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ averageRating: -1 });

export default (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema);
