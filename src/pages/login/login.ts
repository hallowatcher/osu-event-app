import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';
import { Store, Select, Actions, ofAction } from '@ngxs/store';
import {
  Login,
  CheckLoggedIn,
  LoginError,
  LoginSuccess,
  Home,
  UserState
} from '@app/store';
import { withLatestFrom, catchError } from 'rxjs/operators';

@IonicPage()
@Component({
  templateUrl: './login.html'
})
export class LoginPage {
  @Select(UserState.loggedIn) loggedIn$: Observable<boolean>;
  email: string = '';
  password: string = '';
  errorMsg = '';

  constructor(public store: Store, private actions$: Actions) {
    this.store
      .dispatch(new CheckLoggedIn())
      .pipe(withLatestFrom(this.loggedIn$))
      .subscribe(([state, loggedIn]) => {
        if (loggedIn) {
          this.store.dispatch(new Home('HomePage'));
        }
      });

    this.actions$.pipe(ofAction(LoginError)).subscribe((error: any) => {
      this.errorMsg = error.error.message;
    });

    this.actions$
      .pipe(ofAction(LoginSuccess))
      .subscribe(() => this.store.dispatch(new Home('HomePage')));
  }

  login() {
    this.store.dispatch(new Login(this.email, this.password));
  }
}
