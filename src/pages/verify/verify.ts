import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';
import { withLatestFrom } from 'rxjs/operators';
import { Payment } from 'models/payment';
import { Store, Select, Actions, ofAction } from '@ngxs/store';
import {
  ChangeValidity,
  VerifyId,
  CheckLoggedIn,
  Push,
  VerifyJwtFailed,
  BasicAlert,
  VerifyIdFailed,
  UserState,
  TicketState
} from '@app/store';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  templateUrl: './verify.html'
})
export class VerifyPage {
  private subscriptions = new Subscription();
  @Select(UserState.loggedIn) loggedIn$: Observable<boolean>;
  @Select(TicketState.activeTicket) payment$: Observable<Payment>;
  @Select(TicketState.validChangedFromNow) validChanged$: Observable<string>;

  constructor(private store: Store, private actions: Actions) {
    const subscription = this.actions
      .pipe(ofAction(VerifyJwtFailed, VerifyIdFailed))
      .subscribe((e: any) => {
        this.store.dispatch(
          new BasicAlert({
            title: 'Error',
            subTitle:
              e.error.message +
              '! If the problem persists, please contact hallowatcher.',
            buttons: ['OK']
          })
        );
      });

    this.subscriptions.add(subscription);
  }

  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.store
        .dispatch(new CheckLoggedIn())
        .pipe(withLatestFrom(this.loggedIn$))
        .subscribe(([state, loggedIn]) => {
          if (!loggedIn) {
            return reject();
          }

          resolve();
        });
    });
  }

  ionViewWillUnload() {
    this.subscriptions.unsubscribe();
  }

  scan() {
    this.store.dispatch(new Push('ScanPage'));
  }

  input() {
    this.store.dispatch(new Push('InputPage'));
  }

  changeValidity(id: string, valid: boolean) {
    this.store.dispatch(new ChangeValidity(id, valid)).subscribe(() => {
      setTimeout(() => this.store.dispatch(new VerifyId(id)), 500);
    });
  }
}
