import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../orders/service/product.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  
  product!: Product;
  products : Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}


  ngOnInit(): void {
      this.product.id = this.route.snapshot.params['id'];
      console.log("this.product.id" + this.product.id);
        this.productService.delete(this.product.id).subscribe( data => {
          this.goToProduct();
          this.getProduct();
        })
    }

    private getProduct(){
      this.productService.list().subscribe(data => {
        this.products = data;
      });
    }

    goToProduct() {
      this.router.navigate(['product-list']);
    }
}
