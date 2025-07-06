

export interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

export interface ProductResponse {
  _id: string;
  name: string;
  popularityScore: number;
  weight: number;
  price: number;
  rating: number;
  images: ProductImages;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductListResponse {
  success: boolean;
  goldPrice: number;
  count: number;
  products: ProductResponse[];
}

export interface SingleProductResponse {
  success: boolean;
  goldPrice: number;
  product: ProductResponse;
}
