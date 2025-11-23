import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../../service/order.service';
import { Item } from 'src/app/features/models/item';

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
    private router: Router
  ) {
    // form init
    this.form = this.fb.group({
      items: this.fb.array([ this.createItemGroup() ], Validators.required)
    });
  }

  ngOnInit(): void {}

  // Factory for a single Item formGroup
  private createItemGroup(data?: Partial<Item>): FormGroup {
    return this.fb.group({
      productId: [data?.productId ?? null, [Validators.required, Validators.min(1)]],
      productName: [data?.productName ?? '', [Validators.required, Validators.maxLength(200)]],
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
    this.submitting = true;

    const payload = this.form.value;

    this.orderService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
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