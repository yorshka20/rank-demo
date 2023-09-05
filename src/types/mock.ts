export interface SeedResponse {
  products: ProductType[];
}

export type ProductType = {
  id: number;
  title: string;
  description: string;
  url: string;
  votes: number;
  submitterAvatarUrl: string;
  productImageUrl: string;
};

export type ProductStoreType = Map<number, ProductType>;
