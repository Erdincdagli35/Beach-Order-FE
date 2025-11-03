import { Product } from "./product";

export interface OrderItem {
  product: Partial<Product> | { id: number };
  quantity: number;
  unitPrice?: number;
  id?: number;
}