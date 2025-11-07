import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../orders/service/product.service';
import { Router } from '@angular/router';
import { Category } from '../../models/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{
  form: FormGroup;
  submitting = false;

  // tüm kategoriler (enum'den runtime olarak alınacak)
  categories: string[] = [];

  // arama ve filtreleme için
  filteredCategories: string[] = [];
  categorySearch = '';

  // dropdown kontrolü (Bootstrap JS kullanmıyorsan Angular ile kontrol et)
  dropdownOpen = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategoriesFromEnum();
    // başlangıçta tüm kategorileri göster
    this.filteredCategories = [...this.categories];
  }

  private loadCategoriesFromEnum(): void {
    const vals = Object.values(Category).filter(v => typeof v === 'string') as string[];
    this.categories = vals;
  }

  // template'te kullanmak için kısa getter'lar (template tipi hatalarını önler)
  get name() { return this.form.get('name'); }
  get price() { return this.form.get('price'); }
  get category() { return this.form.get('category'); }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.categorySearch = '';
      this.filteredCategories = [...this.categories];
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_: MouseEvent) {
    // dışarı tıklanınca kapat
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
      this.categorySearch = '';
      this.filteredCategories = [...this.categories];
    }
  }

  selectCategory(category: string): void {
    this.form.get('category')?.setValue(category);
    this.dropdownOpen = false;
    this.categorySearch = '';
    this.filteredCategories = [...this.categories];
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.productService.create(this.form.value).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/products']);
      },
      error: err => {
        this.submitting = false;
        alert('Oluşturma hatası: ' + (err.message || err));
      }
    });

    this.router.navigate(['product-list']);
  }

  cancel(): void {
    this.router.navigate(['product-list']);
  }
}
