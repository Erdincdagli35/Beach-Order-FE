import { Injectable } from '@angular/core';
import { Cart } from '../models/order/cart';
import { OrderCreateRequest } from '../models/order/order-crate-request';
import { Item } from '../models/order/item';

const STORAGE_KEY = 'app_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: Item[] = [];
  private personalName: string = '';
  private roomNo : string ='';

  constructor() {
    this.load();
  }

  private save() {
    const data: OrderCreateRequest = {
      items: this.items,
      personalName: this.personalName,
      roomNo: this.roomNo
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: OrderCreateRequest = JSON.parse(raw);
      this.items = data.items || [];
      this.personalName = data.personalName || '';
    } else {
      this.items = [];
      this.personalName = '';
    }
  }

  setPersonalName(personalName: string) {
    this.personalName = personalName;
    this.save();
  }

  getPersonalName(): string {
    return this.personalName;
  }

  setRoomNo(roomNo: string) {
    this.roomNo = roomNo;
    this.save();
  }

  getRoomNo(): string {
    return this.roomNo;
  }

  getItems(): Item[] {
    return [...this.items]; // immutable copy
  }

  addItem(item: Item) {
    const idx = this.items.findIndex(i => i.productId === item.productId);
    if (idx >= 0) {
      this.items[idx].qty += item.qty;
    } else {
      this.items.push({ ...item });
    }
    this.save();
  }

  updateItem(productId: number, qty: number) {
    const idx = this.items.findIndex(i => i.productId === productId);
    if (idx >= 0) {
      if (qty <= 0) {
        this.items.splice(idx, 1);
      } else {
        this.items[idx].qty = qty;
      }
      this.save();
    }
  }

  removeItem(productId: number) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.save();
  }

  clear() {
    this.items = [];
    this.personalName = '';
    this.roomNo = '';
    this.save();
  }

  getOrderRequest(): OrderCreateRequest {
    return {
      items: [...this.items],
      personalName: this.personalName,
      roomNo: this.roomNo
    };
  }
}