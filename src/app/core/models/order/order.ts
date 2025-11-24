import { Bill } from "../order/bill";

export interface Order {
  id: number;
  status?: string;
  total?: number;
  createdAt?: string;
  bills: Bill[];
  personalId: number;
}