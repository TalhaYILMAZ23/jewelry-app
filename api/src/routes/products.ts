import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/productController';

const router = Router();

// GET /api/products - Tüm ürünler (filtreleme ile)
router.get('/', getAllProducts);

// GET /api/products/:id - Tekil ürün
router.get('/:id', getProductById);

export default router;
