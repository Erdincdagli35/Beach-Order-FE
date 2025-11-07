import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../orders/service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, Category } from '../../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  form: FormGroup;
  id!: number;
  loading = false;
  submitting = false;

  categories: string[] = [];

  // arama ve filtreleme için
  filteredCategories: string[] = [];
  categorySearch = '';

  // dropdown kontrolü (Bootstrap JS kullanmıyorsan Angular ile kontrol et)
  dropdownOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
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
    this.loadCategoriesFromEnum();
    // başlangıçta tüm kategorileri göster
    this.filteredCategories = [...this.categories];

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      alert('Geçersiz ürün id');
      this.router.navigate(['/products']);
      return;
    }
    this.loading = true;
    this.productService.listById(this.id).subscribe({
      next: (p: Product) => {
        this.form.patchValue(p);
        this.loading = false;
      },
      error: err => {
        alert('Ürün bulunamadı veya yüklenemedi.');
        this.loading = false;
        this.router.navigate(['/products']);
      }
    });
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
    this.productService.update(this.id, this.form.value).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/products']);
      },
      error: err => {
        this.submitting = false;
        alert('Güncelleme hatası: ' + (err.message || err));
      }
    });

    this.router.navigate(['product-list']);
  }

  cancel(): void {
    this.router.navigate(['product-list']);
  }
}
