import { Item } from "./item";

export interface OrderCreateRequest {
  items : Item[];
  personalName : string;
  roomNo: string;
}