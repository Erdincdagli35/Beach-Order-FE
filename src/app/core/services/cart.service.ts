import { Injectable } from '@angular/core';
import { Cart } from '../models/order/cart';
const STORAGE_KEY = 'app_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: Cart[] = [];
  

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  private load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    this.items = raw ? JSON.parse(raw) : [];
  }

  getItems(): Cart[] {
    return [...this.items]; // immutable copy
  }

  addItem(item: Cart) {
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
    this.save();
  }
}