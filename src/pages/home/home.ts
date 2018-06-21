import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private auth: AuthService) {}

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
