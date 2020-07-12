import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { genderValidator } from '../shared/gender.validator';
import { ProductsUploadService } from '../appServices/products-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productsForm: any;
  selectedFile: File = null;
  response: any = { status: '', message: ''};
  constructor( private fb: FormBuilder, private productService: ProductsUploadService) { }

  ngOnInit() {
    this.productsForm = this.fb.group({
      billingAddress: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productCategory: ['', [Validators.required, genderValidator]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      productImage: ['', Validators.required],
      description: ['', Validators.required],
      termsAndConditions: ['', Validators.required]
    });
  }

  get billingAddress() {
    return this.productsForm.get('billingAddress');
  }

  get productName() {
    return this.productsForm.get('productName');
  }

  get price() {
    return this.productsForm.get('price');
  }

  get productCategory() {
    return this.productsForm.get('productCategory');
  }

  get quantity() {
    return this.productsForm.get('quantity');
  }

  get productImage() {
    return this.productsForm.get('productImage');
  }

  get description() {
    return this.productsForm.get('description');
  }

  get termsAndConditions() {
    return this.productsForm.get('termsAndConditions');
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.productImage.setValue(this.selectedFile);
      console.log(this.selectedFile.type);
    }
  }

  onSubmit() {
    const fd = new FormData();
    fd.append('billingAddress', this.billingAddress.value);
    fd.append('productName', this.productName.value);
    fd.append('price', this.price.value);
    fd.append('productCategory', this.productCategory.value);
    fd.append('quantity', this.quantity.value);
    fd.append('productImage', this.productImage.value);
    fd.append('description', this.description.value);
    fd.append('terms', this.termsAndConditions.value);

    console.log(fd);

    this.productService.uploadProducts(fd)
      .subscribe(
        (data) => {
          this.response = data;
          this.productsForm.reset();
        },
        (error) => {
          this.response = {
            status: 'error',
            message: error
          };
        }
      );
  }

}
