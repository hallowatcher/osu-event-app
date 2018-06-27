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
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  templateUrl: './login.html'
})
export class LoginPage {
  email: string = '';
  password: string = '';
  private subscriptions = new Subscription();
  @Select(UserState.loggedIn) loggedIn$: Observable<boolean>;

  constructor(public store: Store, private actions$: Actions) {
    const subscriptionOne = this.store
      .dispatch(new CheckLoggedIn())
      .pipe(withLatestFrom(this.loggedIn$))
      .subscribe(([state, loggedIn]) => {
        if (loggedIn) {
          this.store.dispatch(new Home('HomePage'));
        }
      });

    const subscriptionTwo = this.actions$
      .pipe(ofAction(LoginError))
      .subscribe((e: any) => {
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

    const subscriptionThree = this.actions$
      .pipe(ofAction(LoginSuccess))
      .subscribe(() => this.store.dispatch(new Home('HomePage')));

    this.subscriptions.add(subscriptionOne);
    this.subscriptions.add(subscriptionTwo);
    this.subscriptions.add(subscriptionThree);
  }

  ionViewWillUnload() {
    this.subscriptions.unsubscribe();
  }

  login() {
    this.store.dispatch(new Login(this.email, this.password));
  }
}
