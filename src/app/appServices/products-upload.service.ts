import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsUploadService {

  apiUrl = 'http://localhost/welcome/api/marvel/uploads/products_upload.php';
  prodsUrl = 'http://localhost/welcome/api/marvel/products_display.php';
  prodUrl = 'http://localhost/welcome/api/marvel/product_display.php/';
  cartUrl = 'http://localhost/welcome/api/marvel/cart.php/';
  addToCartUrl = 'http://localhost/welcome/api/marvel/add_to_cart.php/';

  constructor(private http: HttpClient) { }

  uploadProducts(formData): Observable<any> {
    return this.http.post(this.apiUrl, formData)
      .pipe(
        res => res,
        catchError(this.handleError)
      );
  }

  displayProducts(): Observable<any> {
    return this.http.get<ProductModel[]>(this.prodsUrl)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  getproduct(id: number): Observable<any> {
    return this.http.post<ProductModel>(this.prodUrl, {code: id})
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  addProductToCart(id: number): Observable<any> {
      return this.http.post<ProductModel>(this.addToCartUrl, {code: id})
        .pipe(
          map(res => res),
          catchError(this.handleError)
        );
  }

  getProductFromCart() {
    return this.http.get<ProductModel[]>(this.cartUrl)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly
      console.error('An error occured:', error.error.message);
    } else {
      // The backend rturned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${(error.status)}`,
        +
        `body was: ${(error.error)}`
      );
      // return an observable with a user-facing error message
      return throwError(
        'Problem with service, please try again later.'
      );
    }
  }
}
