import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { tap, take } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private auth: AuthService, private nav: NavController) {}

  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.auth.loggedIn().subscribe(loggedIn => {
        if (!loggedIn) {
          return reject();
        }

        resolve();
      });
    });
  }
}
