import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';
import { getCurrentGoldPrice, calculateProductPrice, calculateRating } from '../utils/goldPriceCalculator';
import { ProductResponse, FilterQuery } from '../types';

// Tüm ürünleri getir
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { price_min, price_max, popularity_min, popularity_max } = req.query as FilterQuery;
    
    // MongoDB'den ürünleri çek
    const products = await Product.find() as IProduct[];
    
    // Güncel altın fiyatını al
    const goldPrice = await getCurrentGoldPrice();
    
    // Ürünleri işle ve fiyat hesapla
    const processedProducts: ProductResponse[] = products.map(product => {
      const price = calculateProductPrice(product.popularityScore, product.weight, goldPrice);
      const rating = calculateRating(product.popularityScore);
      
      return {
        _id: product._id.toString(),
        name: product.name,
        popularityScore: product.popularityScore,
        weight: product.weight,
        price,
        rating,
        images: product.images
      };
    });
    
    // Filtreleme uygula
    let filteredProducts = processedProducts;
    
    if (price_min) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(price_min));
    }
    if (price_max) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(price_max));
    }
    if (popularity_min) {
      filteredProducts = filteredProducts.filter(p => p.popularityScore >= Number(popularity_min));
    }
    if (popularity_max) {
      filteredProducts = filteredProducts.filter(p => p.popularityScore <= Number(popularity_max));
    }
    
    res.json({
      success: true,
      goldPrice,
      count: filteredProducts.length,
      products: filteredProducts
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ürünler alınamadı',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Tekil ürün getir
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id) as IProduct | null;
    
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Ürün bulunamadı'
      });
      return;
    }
    
    const goldPrice = await getCurrentGoldPrice();
    const price = calculateProductPrice(product.popularityScore, product.weight, goldPrice);
    const rating = calculateRating(product.popularityScore);
    
    const processedProduct: ProductResponse = {
      _id: product._id.toString(),
      name: product.name,
      popularityScore: product.popularityScore,
      weight: product.weight,
      price,
      rating,
      images: product.images
    };
    
    res.json({
      success: true,
      goldPrice,
      product: processedProduct
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ürün alınamadı',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};
