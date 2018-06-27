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
  UserState,
  BasicAlert
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

  constructor(public store: Store, private actions$: Actions) {
    this.store
      .dispatch(new CheckLoggedIn())
      .pipe(withLatestFrom(this.loggedIn$))
      .subscribe(([state, loggedIn]) => {
        if (loggedIn) {
          this.store.dispatch(new Home('HomePage'));
        }
      });

    this.actions$.pipe(ofAction(LoginError)).subscribe((e: any) => {
      this.store.dispatch(
        new BasicAlert({
          title: 'Error',
          subTitle:
            e.error.message +
            ' If the problem persists, please contact hallowatcher.',
          buttons: ['OK']
        })
      );
    });

    this.actions$
      .pipe(ofAction(LoginSuccess))
      .subscribe(() => this.store.dispatch(new Home('HomePage')));
  }

  login() {
    this.store.dispatch(new Login(this.email, this.password));
  }
}
