import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpclient: HttpClient) {}

  LogIn(logInModel: any) {
    return this.httpclient.post(
      'http://localhost:5227/api/Auth/LogIn',
      logInModel
    );
  }
  Signup(SignupModel: any) {
    return this.httpclient.post(
      'http://localhost:5227/api/Auth/Register',
      SignupModel
    );
  }

  SaveTokeninLocalStorage(Response: any) {
    localStorage.setItem('token', Response.data.token);
    localStorage.setItem('refreshTokenId', Response.data.refreshTokenId);
  }
  isLoggedIn() {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != undefined
    ) {
      return true;
    }
    return false;
  }
  RefreshToken(model: any) {
    return this.httpclient.post(
      'http://localhost:5227/api/Auth/RefreshToken',
      model
    );
  }
  SaveTokens(tokendata: any) {
    localStorage.setItem('token', tokendata.token);
    localStorage.setItem('refreshTokenId', tokendata.refreshTokenId);
  }

  GetToken() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshTokenId');
  }
}
