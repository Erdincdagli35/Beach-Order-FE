import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/order.service';
import { Item } from '../../models/order/item';
import { Cart } from '../../models/order/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
    private router: Router,
    private cartService: CartService
  ) {
    this.form = this.fb.group({
      items: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    const cart = this.cartService.getItems();
    if (cart && cart.length) {
      // sepetten gelen her item için form grubu oluştur
      this.items.clear();
      cart.forEach(ci => this.items.push(this.createItemGroup({
        productId: ci.productId,
        productName: ci.productName,
        qty: ci.qty
      })));
    } else {
      // default bir item bırak
      this.addItem();
    }
  }

  // Factory for a single Item formGroup
  private createItemGroup(data?: Partial<Item>): FormGroup {
    return this.fb.group({
      productId: [data?.productId ?? null, [Validators.required, Validators.min(1)]],
      productName: [{ value: data?.productName ?? '', disabled: true }],
      qty: [data?.qty ?? 1, [Validators.required, Validators.min(1)]]
    });
  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  // Helper to access a specific item control in template: itemsControls[index].get('productId')...
  get itemsControls(): AbstractControl[] {
    return this.items.controls;
  }

  addItem(data?: Partial<Item>): void {
    this.items.push(this.createItemGroup(data));
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    } else {
      // isterseniz 1 tane kalmasını engellemek yerine temizleyebilirsiniz:
      this.items.at(0).reset({ productId: null, productName: '', qty: 1 });
    }
  }

  // kısa getter'lar (template tipi hatalarını önler)
  // Burada örnek olarak items üzerinden spesifik alanlara erişim yapabilirsiniz
  getItemControl(index: number, name: string) {
    return (this.items.at(index) as FormGroup).get(name);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.form.value; // { items: [{productId, productName, qty}, ...] }

    this.orderService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        // başarılıysa sepeti temizle
        this.cartService.clear();
        this.router.navigate(['product-main-menu']);
      },
      error: err => {
        this.submitting = false;
        alert('Oluşturma hatası: ' + (err?.message || err));
      }
    });
  }
  

  cancel(): void {
    this.router.navigate(['product-main-menu']);
  }
}