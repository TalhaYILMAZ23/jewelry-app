import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface - timestamps'i optional yap
export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}

// MongoDB Schema - timestamps'i kaldır
const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  popularityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  images: {
    yellow: {
      type: String,
      required: true
    },
    rose: {
      type: String,
      required: true
    },
    white: {
      type: String,
      required: true
    }
  }
}); // timestamps: true'yu kaldır

// Collection adını açıkça belirt: 'products'
export default mongoose.model<IProduct>('Product', ProductSchema, 'products');
