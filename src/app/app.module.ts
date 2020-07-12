import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsDisplayComponent } from './products-display/products-display.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MyCartComponent } from './my-cart/my-cart.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsDisplayComponent,
    ProductDetailsComponent,
    VerifyEmailComponent,
    MyCartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
