import { Component, OnInit } from '@angular/core';
import { ProductsUploadService } from '../appServices/products-upload.service';
import { ProductModel } from '../models/product-model';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  carts;
  subTotal = 0;
  constructor( private productService: ProductsUploadService ) { }

  ngOnInit() {
    this.productService.getProductFromCart()
          .subscribe(
            (data) => {
              this.carts = data;
              console.log(this.carts);
            }
          );

    // const carts = this.productService.getProductFromCart();
    // for (let i = 0; i < carts.length; i++) {
    //   carts[i].minQty = 1;
    //   carts[i].totalPrice = parseInt(carts[i].price, 10);
    //   this.subTotal += parseInt(carts[i].price, 10);
    //   this.carts.push(carts[i]);
    // }
    // console.log(this.carts);
  }

  // increment quantity value
  increment(qty, carts) {
    let quantityValue = qty.minQty;
    quantityValue = quantityValue + 1;

    // set the minQty value
    qty.minQty = quantityValue;

    // set total price for each item
    qty.totalPrice = qty.price * qty.minQty;

    // set subTotal
    let sumTotal = 0;
    for (let j = 0; j < carts.length; j++) {
      sumTotal += carts[j].totalPrice;
    }
    this.subTotal = sumTotal;
  }

  // decrement quantity value
  decrement(qty, carts) {
    let quantityValue = qty.minQty;
    if (quantityValue <= 1) {
      quantityValue = 1;
    } else {
      quantityValue = quantityValue - 1;
    }

    // set the minQty value
    qty.minQty = quantityValue;

    // set total price for each item
    qty.totalPrice = qty.price * qty.minQty;

    // set subTotal
    let sumTotal = 0;
    for (let j = 0; j < carts.length; j++) {
      sumTotal += carts[j].totalPrice;
    }
    this.subTotal = sumTotal;
  }

}
