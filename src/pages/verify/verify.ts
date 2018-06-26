import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage } from 'ionic-angular';
import { withLatestFrom } from 'rxjs/operators';
import { Payment } from 'models/payment';
import { Store, Select } from '@ngxs/store';
import { ChangeValidity, VerifyId } from '../../store/actions/ticket.actions';
import { CheckLoggedIn } from '../../store/actions/user.actions';
import { UserState } from '../../store/states/user.state';
import { TicketState } from '../../store/states/ticket.state';
import { Push } from '../../store/actions/nav.actions';

@IonicPage()
@Component({
  templateUrl: './verify.html'
})
export class VerifyPage {
  constructor(private store: Store) {}

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
