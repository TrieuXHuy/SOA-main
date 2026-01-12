export interface Product {
  productID: string;
  productName: string;
  exportPrice: number;
  createdAt: string;
  shelfLife: number;
  productTypeID: string;
  description: string;
  rating: number;
  sold: number;
  view: number;
  sale: number;
  images: string[];
}

export interface Pagination {
  page: number;
  limit: number;
  pageSize: number;
}

export interface ProductList {
  products: Product[];
  pagination: Pagination;
}

export enum SortType {
  createdAt = 'createdAt',
  view = 'view',
  sold = 'sold',
  price = 'exportPrice'
}

export enum OrderType {
  asc = 'asc',
  desc = 'desc'
}

export interface ProductListConfig {
  page?: number | string;
  limit?: number | string;
  sort_by?: SortType;
  order?: OrderType;
  exclude?: string;
  rating_filter?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string;
  productTypeID?: string;
}
