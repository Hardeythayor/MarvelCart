import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsUploadService } from './products-upload.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // public cartItem = JSON.parse(localStorage.getItem('product'));
  public cartItem;
  public cartLength;
  // = this.cartItem.length;

  private currrentCartCount = new BehaviorSubject(this.getCartLength());
  currentMessage = this.currrentCartCount.asObservable();

  constructor( private productService: ProductsUploadService) {
    this.productService.getProductFromCart()
          .subscribe((res) => {
            this.cartItem = res;
            console.log(this.cartItem);
            console.log(this.getCartLength());
          });
  }

  updateCartCount(count: number) {
    this.currrentCartCount.next(count);
  }

  getCartLength() {
    if (this.cartItem == null) {
      return this.cartLength = 0;
    } else {
      return this.cartLength = this.cartItem.length;
    }
  }
}
