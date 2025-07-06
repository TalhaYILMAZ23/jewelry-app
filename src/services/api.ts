import axios from 'axios';
import { type ProductListResponse, type SingleProductResponse } from '../types/Product';
import { type GoldPriceResponse } from '../types/API';
import { type FilterOptions } from '../types';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Tüm ürünleri getir
export const getProducts = async (filters?: FilterOptions): Promise<ProductListResponse> => {
  const params = new URLSearchParams();
  
  if (filters?.price_min) params.append('price_min', filters.price_min.toString());
  if (filters?.price_max) params.append('price_max', filters.price_max.toString());
  if (filters?.popularity_min) params.append('popularity_min', filters.popularity_min.toString());
  if (filters?.popularity_max) params.append('popularity_max', filters.popularity_max.toString());
  
  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

// Tekil ürün getir
export const getProductById = async (id: string): Promise<SingleProductResponse> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Altın fiyatını getir
export const getGoldPrice = async (): Promise<GoldPriceResponse> => {
  const response = await api.get('/gold-price');
  return response.data;
};
