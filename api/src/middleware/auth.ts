import { Request, Response, NextFunction } from 'express';

// Basit API key authentication middleware
export const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key gerekli'
    });
  }
  
  // Şimdilik basit kontrol (production'da daha güvenli olmalı)
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Geçersiz API key'
    });
  }
  
  next();
};

// Rate limiting middleware (basit)
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  // Şimdilik pas geç, sonra implement edilecek
  next();
};
