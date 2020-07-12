import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { ProductsUploadService } from '../appServices/products-upload.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(private prodService: ProductsUploadService) { }

  ngOnInit() {
    this.prodService.displayProducts()
      .subscribe(
        (data) => {
          this.products = data;
        },
        error => error
      );
  }

}
