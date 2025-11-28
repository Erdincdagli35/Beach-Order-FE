import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/order.service';
import { Item } from '../../models/order/item';
import { CartService } from '../../services/cart.service';
import { OrderCreateRequest } from '../../models/order/order-crate-request';

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
    // Burada personelId kontrolü oluşturuldu (email yerine)
    this.form = this.fb.group({
      personalId: [this.cartService.getPersonalId() || ''],
      roomNo: [this.cartService.getRoomNo() || ''],
      items: this.fb.array([], Validators.required)
    });
  }

  // FormArray getter
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  // Template için controls getter
  get itemsControls(): AbstractControl[] {
    return this.items.controls;
  }

  ngOnInit(): void {
    const order = this.cartService.getOrderRequest(); // OrderCreateRequest bekliyoruz
    this.items.clear();

    if (order?.items && order.items.length) {
      order.items.forEach(ci => this.items.push(this.createItemGroup({
        productId: ci.productId,
        productName: ci.productName,
        qty: ci.qty
      })));
    } else {
      this.addItem();
    }

    // Eğer cart'ta kayıtlı personelId varsa form'a set et
    if (order?.personalId) {
      this.form.get('personalId')?.setValue(order.personalId);
    }

    if (order?.roomNo) {
      this.form.get('roomNo')?.setValue(order.roomNo);
    }
  }

  private createItemGroup(data?: Partial<Item>): FormGroup {
    return this.fb.group({
      productId: [data?.productId ?? null, [Validators.required, Validators.min(1)]],
      productName: [{ value: data?.productName ?? '', disabled: true }],
      qty: [data?.qty ?? 1, [Validators.required, Validators.min(1)]]
    });
  }

  addItem(data?: Partial<Item>): void {
    this.items.push(this.createItemGroup(data));
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    } else {
      this.items.at(0).reset({ productId: null, productName: '', qty: 1 });
    }
  }

  getItemControl(index: number, name: string) {
    return (this.items.at(index) as FormGroup).get(name);
  }

  submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.submitting = true;

  const payload = {
    personalId: this.form.value.personalId, // backend uyumlu
    roomNo : this.form.value.roomNo,
    items: this.items.value
  };

  // CartService’e set et
  this.cartService.setPersonalId(payload.personalId);

  this.cartService.setRoomNo(payload.roomNo);

  this.orderService.create(payload).subscribe({
    next: () => {
      this.submitting = false;
      this.cartService.clear();
      this.router.navigate(['customer-main-menu']);
    },
    error: err => {
      this.submitting = false;
      alert('Oluşturma hatası: ' + (err?.message || err));
    }
  });
}

  cancel(): void {
    this.router.navigate(['customer-main-menu']);
  }
}
