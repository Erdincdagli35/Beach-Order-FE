import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { OrderItem } from '../../models/order-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'beach_cart';
  private items: OrderItem[] = [];
  private subj = new BehaviorSubject<OrderItem[]>([]);

  cart$ = this.subj.asObservable();

  constructor() {
    const raw = localStorage.getItem(this.key);
    this.items = raw ? JSON.parse(raw) : [];
    this.subj.next(this.items);
  }

  getItems(): OrderItem[] {
    return [...this.items];
  }

  add(product: Product, qty = 1) {
    const found = this.items.find(i => (i.product as any).id === product.id);
    if (found) found.quantity += qty;
    else this.items.push({ product: { id: product.id, name: product.name, price: product.price }, quantity: qty, unitPrice: product.price });
    this.save();
  }

  update(productId: number, qty: number) {
    const found = this.items.find(i => (i.product as any).id === productId);
    if (!found) return;
    found.quantity = qty;
    if (found.quantity <= 0) this.remove(productId);
    this.save();
  }

  remove(productId: number) {
    this.items = this.items.filter(i => (i.product as any).id !== productId);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  total(): number {
    return this.items.reduce((s, i) => s + (i.unitPrice ?? (i.product as any).price) * i.quantity, 0);
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
    this.subj.next([...this.items]);
  }
}
