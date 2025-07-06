export interface GoldPriceResponse {
  success: boolean;
  data: {
    price: number;
    currency: string;
    unit: string;
    timestamp: Date;
    source: string;
  };
}

export interface APIError {
  success: false;
  message: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: 'price' | 'rating' | 'name' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}
