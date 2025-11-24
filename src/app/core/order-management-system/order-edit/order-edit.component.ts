import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent {

  form: FormGroup;
    id!: number;
    loading = false;
    submitting = false;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private orderService: OrdersService,
      private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        price: [0, [Validators.required, Validators.min(0)]],
        category: ['']
      });
    }
  
    ngOnInit(): void {
    }
  
    submit(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.submitting = true;
      this.orderService.update(this.id, this.form.value).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/order-list']);
        },
        error: err => {
          this.submitting = false;
          alert('Güncelleme hatası: ' + (err.message || err));
        }
      });
  
      this.router.navigate(['product-main-menu']);
    }
  
    cancel(): void {
      this.router.navigate(['product-main-menu']);
    }
}
