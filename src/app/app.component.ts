import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { passwordValidator } from './shared/password.validator';
import { genderValidator } from './shared/gender.validator';
import { UserModel } from './models/user-model';
import { RegistrationService } from './appServices/registration-service.service';
import { SharedService } from './appServices/shared.service';
import { ProductsUploadService } from './appServices/products-upload.service';
import { AuthService } from './appServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  isLoggedIn;
  registrationForm: FormGroup;
  registrationInputs: UserModel;
  error: string;
  displayName: string;

  cartCount;

  response: any = { status: '', message: ''};

  responseLogin: any = { status: '', message: ''};

  constructor( private fb: FormBuilder,
               private regService: RegistrationService,
               private sharedService: SharedService,
               private productService: ProductsUploadService,
               public authService: AuthService,
               private router: Router) {}

    ngOnInit() {
      this.registrationForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
        userName: ['', Validators.required],
        password: ['', [Validators.required]],
        confirmPassword: [''],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        gender: ['', [Validators.required, genderValidator]]
      },
      {validator: passwordValidator}
      );

      this.sharedService.currentMessage.subscribe((message) => {
        this.cartCount = message;
        console.log(this.cartCount);
      });
      // const cartItem = this.productService.getProductFromCart();
      // this.cartCount = cartItem.length;

      // display name
      this.displayName = this.getUserName();

      this.isLoggedIn = this.authService.isLoggedIn();
      console.log(this.isLoggedIn);
    }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get gender() {
    return this.registrationForm.get('gender');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onRegister() {
    this.registrationInputs = this.registrationForm.value;

    // this.regService.registerUser(this.registrationInputs)
    //   .subscribe(
    //     (res) => {
    //       this.response = res;
    //       this.registrationForm.reset();
    //     },
    //     (error) => this.response = {
    //       status: 'error',
    //       message: error
    //     }
    //   );

    this.authService.signUp(this.registrationInputs)
      .then(
        () => {
          this.response = {status: 'success', message: 'Successfully registered'};
          this.registrationForm.reset();
          this.router.navigate(['/verify-email']);
        }).catch(
        (error) => this.response = {
          status: 'error',
          message: error.message
        });
  }

  onLogin(loginInfo) {
    this.authService.signIn(loginInfo)
      .then(
        () => {
          // this.ngOnInit();
          this.responseLogin = {status: 'success', message: 'Login successful'};
          window.location.reload();
          this.router.navigate(['/products']);
        }
      ).catch(
        (error) => {
          this.responseLogin = {
            status: 'error',
            message: error.message
          };
        }
      );
  }

  facebookLogin() {
    this.authService.facebookAuth()
      .then(
        (auth) => {
          // this.router.navigate(['/products']);
          window.location.reload();
          console.log(auth);
        }
      ).catch(
        (error) => {
          console.error(error.message);
        }
      );
  }

  googleLogin() {
    this.authService.googleAuth()
      .then(
        () => {
          // this.router.navigate(['/products']);
          window.location.reload();
        }
      ).catch(
        (error) => {
          console.error(error.message);
        }
      );
  }

  onLogout() {
    this.authService.signOut();
  }


  getUserName() {
    const userDetail = JSON.parse(localStorage.getItem('user'));
    if (userDetail) {
      return userDetail.displayName;
    }
  }
}
