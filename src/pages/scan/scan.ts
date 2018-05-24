import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  templateUrl: './scan.html'
})
export class ScanPage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private nav: NavController,
    private navParams: NavParams
  ) {}

  callback = barcodeData => {};

  ionViewWillEnter() {
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    this.barcodeScanner
      .scan({ showTorchButton: true, resultDisplayDuration: 0 })
      .then(barcodeData => {
        if (barcodeData.cancelled) {
          return;
        }

        this.callback(barcodeData);
        this.nav.pop();
      })
      .catch(err => {
        console.error(err);
        this.nav.pop();
      });
  }
}
