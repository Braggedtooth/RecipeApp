import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { AuthStateService } from './auth-state.service';
import { Router } from '@angular/router';

// User interface
export class User {
  name: String = "";
  email: String ="";
  password: String ="";
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private http: HttpClient, private tokenService:TokenService ,private auth:AuthStateService ,private router:Router) { }
  private BACKEND_API_URL =  'https://u08recipeapi.herokuapp.com/api/auth/' 
  
  
  // User registration
  register(user: User): Observable<any> {
    const  accessToken = this.tokenService.getToken();
    return this.http.post( this.BACKEND_API_URL+'register', user, {
      headers:{'Authorization': `Bearer ${accessToken}`}
    } );
  }

  // Login
  signin(user: User): Observable<any> {
    const  accessToken = this.tokenService.getToken();
    return this.http.post<any>( this.BACKEND_API_URL+'login', user,{
      headers:{'Authorization': `Bearer ${accessToken}`}
    });
  }

  // Access user profile
  profileUser(): Observable<any> {
    const  accessToken = this.tokenService.getToken();
    return this.http.get( this.BACKEND_API_URL+'user-profile',{
      headers:{'Authorization': `Bearer ${accessToken}`}
    } );
  }

  //logOut

  

}