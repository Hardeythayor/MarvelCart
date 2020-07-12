import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { RegistrationService } from './registration-service.service';
import { UserModel } from '../models/user-model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User;
  constructor( public afAuth: AngularFireAuth,
               private regService: RegistrationService,
               public afs: AngularFirestore) {

    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signUp(userData: UserModel) {
    return this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then((result) => {
          this.SendVerificationMail();
          this.fullRegistration(userData);
          // update the displayName
          result.user.updateProfile({displayName: userData.userName});
          this.SetUserData(result.user);
        });
        // .catch((error) => {
        //   console.log(error.message);
        // });
  }

  signIn(userData: UserModel) {
    return this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then((res) => {
          this.SetUserData(res.user);
        });
  }

  // Sign in with Facebook
  facebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!');
        this.SetUserData(result.user);
    }).catch((error) => {
        console.log(error);
    });
  }

   // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  signOut() {
    return this.afAuth.auth.signOut()
        .then(() => {
            localStorage.removeItem('user');
          }
        );
  }

  // send verification email
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  fullRegistration(data) {
    this.regService.registerUser(data)
        .subscribe(
          (res) => res
        );
  }

  isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    if (user  !==  null) {
      return true;
    } else {
      return false;
    }
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
