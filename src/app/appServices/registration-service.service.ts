import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  apiUrl = 'http://localhost/welcome/api/marvel/registrations/register_user.php';

  constructor( private http: HttpClient) { }

  registerUser(userData: UserModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData)
      .pipe(
        res => res,
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
