import { Injectable } from '@angular/core';
import { Cart } from '../models/order/cart';
import { OrderCreateRequest } from '../models/order/order-crate-request';
import { Item } from '../models/order/item';

const STORAGE_KEY = 'app_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: Item[] = [];
  private personalId: string = '';

  constructor() {
    this.load();
  }

  private save() {
    const data: OrderCreateRequest = {
      items: this.items,
      personalId: this.personalId
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data: OrderCreateRequest = JSON.parse(raw);
      this.items = data.items || [];
      this.personalId = data.personalId || '';
    } else {
      this.items = [];
      this.personalId = '';
    }
  }

  setPersonalId(personalId: string) {
    this.personalId = personalId;
    this.save();
  }

  getPersonalId(): string {
    return this.personalId;
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
    this.personalId = '';
    this.save();
  }

  getOrderRequest(): OrderCreateRequest {
    return {
      items: [...this.items],
      personalId: this.personalId
    };
  }
}