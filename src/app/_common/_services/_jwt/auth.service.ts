import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest } from '../../_models/login/sign-in-request';
import { SignUpAdminRequest } from '../../_models/login/sign-up-admin-request';
import { SignUpMemberRequest } from '../../_models/login/sign-up-member-request';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin$(signInRequest: SignInRequest): Observable<any> {
    var uri = "unitedcooking/auth/signin";
    return this.http.post<any>(uri, signInRequest, httpOptions);
  }

  signupMember$(signUpMember : SignUpMemberRequest): Observable<any> {
    var uri = "unitedcooking/auth/signup";
    return this.http.post(uri, signUpMember, httpOptions);
  }

  signupAdmin$(signupAdmin : SignUpAdminRequest): Observable<any> {
    var uri = "unitedcooking/auth/signup-admin";
    return this.http.post(uri, signupAdmin, httpOptions);
  }
  
}
