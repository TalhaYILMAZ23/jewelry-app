export interface Product {
  _id: string;
  name: string;
  popularityScore: number;
  weight: number;
  price: number;
  rating: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export interface FilterOptions {
  price_min?: number;
  price_max?: number;
  popularity_min?: number;
  popularity_max?: number;
}

export type ColorType = 'yellow' | 'white' | 'rose';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
