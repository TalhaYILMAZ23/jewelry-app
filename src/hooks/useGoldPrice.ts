import { useState, useEffect, useCallback } from 'react';
import { goldPriceService } from '../services/goldPrice';

interface UseGoldPriceReturn {
  goldPrice: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

export const useGoldPrice = (): UseGoldPriceReturn => {
  const [goldPrice, setGoldPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchGoldPrice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const price = await goldPriceService.getCurrentPrice();
      setGoldPrice(price);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Altın fiyatı alınamadı';
      setError(errorMessage);
      console.error('Gold price fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoldPrice();
    
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchGoldPrice, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchGoldPrice]);

  const refetch = useCallback(() => {
    goldPriceService.clearCache();
    fetchGoldPrice();
  }, [fetchGoldPrice]);

  return {
    goldPrice,
    loading,
    error,
    lastUpdated,
    refetch
  };
};
