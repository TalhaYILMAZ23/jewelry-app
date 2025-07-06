import { useState, useEffect, useCallback } from 'react';
import { type Product, type FilterOptions } from '../types';
import { getProducts } from '../services/api';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  goldPrice: number;
  refetch: () => void;
}

export const useProducts = (filters?: FilterOptions): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [goldPrice, setGoldPrice] = useState<number>(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getProducts(filters);
      
      if (response.success) {
        setProducts(response.products);
        setGoldPrice(response.goldPrice);
      } else {
        setError('Ürünler yüklenemedi');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setError(errorMessage);
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    goldPrice,
    refetch
  };
};
