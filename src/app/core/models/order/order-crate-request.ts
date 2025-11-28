import { Item } from "./item";

export interface OrderCreateRequest {
  items : Item[];
  personalId : string;
  roomNo: string;
}