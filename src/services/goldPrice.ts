import { getGoldPrice as apiGetGoldPrice } from './api';

export class GoldPriceService {
  private static instance: GoldPriceService;
  private cachedPrice: number | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 dakika

  public static getInstance(): GoldPriceService {
    if (!GoldPriceService.instance) {
      GoldPriceService.instance = new GoldPriceService();
    }
    return GoldPriceService.instance;
  }

  public async getCurrentPrice(): Promise<number> {
    const now = Date.now();
    
    // Cache kontrolü
    if (this.cachedPrice && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      return this.cachedPrice;
    }

    try {
      const response = await apiGetGoldPrice();
      this.cachedPrice = response.data.price;
      this.lastFetchTime = now;
      return this.cachedPrice;
    } catch (error) {
      console.error('Altın fiyatı alınamadı:', error);
      // Fallback price
      return this.cachedPrice || 65.50;
    }
  }

  public clearCache(): void {
    this.cachedPrice = null;
    this.lastFetchTime = 0;
  }
}

export const goldPriceService = GoldPriceService.getInstance();
