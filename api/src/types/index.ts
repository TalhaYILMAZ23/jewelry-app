export interface ProductResponse {
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GoldPriceResponse {
  price: number;
  currency: string;
  timestamp: Date;
}

export interface FilterQuery {
  price_min?: number;
  price_max?: number;
  popularity_min?: number;
  popularity_max?: number;
}
