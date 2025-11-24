import { Bill } from "./bill";

export interface Order {
  id: number;
  status?: string;
  total?: number;
  createdAt?: string;
  bills: Bill[];
}