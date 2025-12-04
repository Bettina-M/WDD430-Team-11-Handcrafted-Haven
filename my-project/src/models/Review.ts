import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a review title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
      trim: true,
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters'],
    },
    images: {
      type: [String],
      default: [],
    },
    helpful: {
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
ReviewSchema.index({ productId: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1 });

// Prevent duplicate reviews from same user on same product
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default (mongoose.models.Review as Model<IReview>) || mongoose.model<IReview>('Review', ReviewSchema);
