import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsDisplayComponent } from './products-display/products-display.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/products' },
  { path: 'products', component: ProductsDisplayComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'verify-email', component: VerifyEmailComponent},
  { path: 'cart', component: MyCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
