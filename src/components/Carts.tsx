export interface cart {
  id: number;
  userId: number;
  date: Date;
  products: Product[];
  __v: number;
}

export interface Product {
  productId: number;
  quantity: number;
}
