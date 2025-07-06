import express from 'express';
import { getGoldPrice } from '../controllers/goldPriceController';

const router = express.Router();

// GET /api/gold-price - Güncel altın fiyatı
router.get('/', getGoldPrice);

export default router;
