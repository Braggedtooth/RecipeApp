import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthStateService } from './services/shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from './services/shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
   
})
export class AppComponent implements OnInit {
  isSignedIn: boolean= false;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
      console.log(val);
      this.isSignedIn = val;
    });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}