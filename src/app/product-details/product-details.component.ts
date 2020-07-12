import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsUploadService } from '../appServices/products-upload.service';
import { ProductModel } from '../models/product-model';
import { SharedService } from '../appServices/shared.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: ProductModel;
  productAddedToCart: any[];
  cartCount: number;
  quantityValue = 1;
  response;
  displayName;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsUploadService,
    private sharedService: SharedService
    ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.productService.getproduct(id)
      .subscribe(
        (data) => {
          this.product = data[0];
        },
        (error) => console.error(error)
      );

    this.displayName = this.getUserName();
  }

  onAddToCart(id) {
    this.productService.addProductToCart(id)
      .subscribe(
        (data) => {
          this.response = data;
          this.sharedService.updateCartCount(this.response);
          console.log(this.response);
        },
        (error) => console.error(error)
      );


    // get content of localstorage and store in productAddedToCart variable
    // this.productAddedToCart = this.productService.getProductFromCart();

    // // if content of local storage is empty, then store the selected product
    // if (this.productAddedToCart == null) {
    //   this.productAddedToCart = [];
    //   this.productAddedToCart.push(prod);
    //   this.productService.addProductToCart(this.productAddedToCart);
    // } else {

    //   // Check if the selected product does not exist already in local storage
    //   const tempProduct = this.productAddedToCart.find(p => p.id === prod.id);

    //   // if not already exist, add selected product to local storage
    //   if (tempProduct == null) {
    //     this.productAddedToCart.push(prod);
    //     this.productService.addProductToCart(this.productAddedToCart);
    //   }
    // }

    // this.cartCount = this.productAddedToCart.length;
    // console.log(this.cartCount);
    // this.sharedService.updateCartCount(this.response);
  }

  // increment quantity value
  increment() {
    this.quantityValue = this.quantityValue + 1;
  }

  // decrement quantity value
  decrement() {
    if (this.quantityValue <= 1) {
      this.quantityValue = 1;
    } else {
      this.quantityValue = this.quantityValue - 1;
    }
  }

  getUserName() {
    const userDetail = JSON.parse(localStorage.getItem('user'));
    if (userDetail) {
      return userDetail.displayName;
    }
  }
}
