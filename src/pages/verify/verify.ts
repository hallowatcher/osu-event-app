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
  VerifyJwt,
  BasicAlert,
  VerifyIdFailed
} from '../../store/actions';
import { UserState } from '../../store/states/user.state';
import { TicketState } from '../../store/states/ticket.state';

@IonicPage()
@Component({
  templateUrl: './verify.html'
})
export class VerifyPage {
  constructor(private store: Store, private actions: Actions) {
    this.actions
      .pipe(ofAction(VerifyJwtFailed, VerifyIdFailed))
      .subscribe((e: any) => {
        this.store.dispatch(
          new BasicAlert({
            title: 'Error',
            subTitle:
              e.error.message +
              '! If the problem persists, please enter the payment ID manually.',
            buttons: ['OK']
          })
        );
      });
  }

  @Select(UserState.loggedIn) loggedIn$: Observable<boolean>;
  @Select(TicketState.activeTicket) payment$: Observable<Payment>;
  @Select(TicketState.validChangedFromNow) validChanged$: Observable<string>;

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

  scan() {
    this.store.dispatch(new Push('ScanPage'));
  }

  input() {
    this.store.dispatch(new Push('InputPage'));
  }

  changeValidity(id: string, valid: boolean) {
    this.store.dispatch(new ChangeValidity(id, valid)).subscribe(() => {
      this.store.dispatch(new VerifyId(id));
    });
  }
}
