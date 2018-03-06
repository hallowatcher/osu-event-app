import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: './login.html'
})
export class LoginPage {
  loggedIn$: Observable<any>;
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService, public nav: NavController) {
    this.loggedIn$ = this.authService.loggedIn();

    this.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.nav.setRoot('HomePage');
      }
    });
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {},
      err => {
        console.log(err.message);
      }
    );
  }
}
