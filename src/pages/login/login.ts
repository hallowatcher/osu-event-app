import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';
import { Store, Select } from '@ngxs/store';
import { Login, CheckLoggedIn } from '../../store/actions/user.actions';
import { Home } from '../../store/actions/nav.actions';
import { UserState } from '../../store/states/user.state';
import { withLatestFrom } from 'rxjs/operators';

@IonicPage()
@Component({
  templateUrl: './login.html'
})
export class LoginPage {
  @Select(UserState.loggedIn) loggedIn$: Observable<boolean>;
  email: string = '';
  password: string = '';

  constructor(public store: Store) {
    this.store
      .dispatch(new CheckLoggedIn())
      .pipe(withLatestFrom(this.loggedIn$))
      .subscribe(([state, loggedIn]) => {
        if (loggedIn) {
          this.store.dispatch(new Home('HomePage'));
        }
      });
  }

  login() {
    this.store.dispatch(new Login(this.email, this.password)).subscribe(() => {
      this.store.dispatch(new Home('HomePage'));
    });
  }
}
