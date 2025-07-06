import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products';
import goldPriceRoutes from './routes/goldPrice';

// En üstte olmalı
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI as string);
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/gold-price', goldPriceRoutes);

// Vercel için export
export default app;
