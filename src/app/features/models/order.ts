import { OrderItem } from "./order-item";

export interface Order {
  id?: number;
  customerUsername?: string;
  items: OrderItem[];
  status?: string;
  createdAt?: string;
}