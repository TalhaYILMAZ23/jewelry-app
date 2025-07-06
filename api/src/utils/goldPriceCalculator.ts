import axios from 'axios';

// goldapi.io'dan gerçek zamanlı altın fiyatı çek
export const getCurrentGoldPrice = async (): Promise<number> => {
  try {
    const API_KEY = process.env.GOLD_API_KEY;
    
    if (!API_KEY) {
      return 65.50; // Fallback price
    }

    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': API_KEY
      }
    });

    // goldapi.io response: price per troy ounce
    // 1 troy ounce = 31.1035 grams
    const pricePerOunce = response.data.price;
    const pricePerGram = pricePerOunce / 31.1035;
    
    return Math.round(pricePerGram * 100) / 100; // 2 ondalık basamak
    
  } catch (error) {
    return 65.50; // Fallback price
  }
};

// Dinamik fiyat hesaplama formülü
export const calculateProductPrice = (popularityScore: number, weight: number, goldPrice: number): number => {
  // Price = (popularityScore + 1) * weight * goldPrice
  return (popularityScore + 1) * weight * goldPrice;
};

export const calculateRating = (popularityScore: number): number => {
  // Popülerlik skorunu 5 üzerinden puana çevir
  return Math.round(popularityScore * 5 * 10) / 10;
};
