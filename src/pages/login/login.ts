import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';
import { Store } from '@ngxs/store';
import { Login } from '../../store/actions/user.actions';
import { Home } from '../../store/actions/nav.actions';

@IonicPage()
@Component({
  templateUrl: './login.html'
})
export class LoginPage {
  loggedIn$: Observable<any>;
  email: string = '';
  password: string = '';

  constructor(public store: Store) {}

  login() {
    this.store.dispatch(new Login(this.email, this.password)).subscribe(() => {
      this.store.dispatch(new Home('HomePage'));
    });
  }
}
