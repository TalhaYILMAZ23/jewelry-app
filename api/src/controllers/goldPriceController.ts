import { Request, Response } from 'express';
import { getCurrentGoldPrice } from '../utils/goldPriceCalculator';

// Güncel altın fiyatını getir
export const getGoldPrice = async (req: Request, res: Response) => {
  try {
    const goldPrice = await getCurrentGoldPrice();
    
    res.json({
      success: true,
      data: {
        price: goldPrice,
        currency: 'USD',
        unit: 'per gram',
        timestamp: new Date(),
        source: 'goldapi.io'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Altın fiyatı alınamadı',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};
