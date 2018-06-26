import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { UserState } from '../../store/states/user.state';
import { CheckLoggedIn } from '../../store/actions';
import { withLatestFrom } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Select(UserState.loggedIn) loggedIn$: Observable<boolean>;
  @Select(UserState.email) email$: Observable<string>;

  constructor(private store: Store) {}

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
}
