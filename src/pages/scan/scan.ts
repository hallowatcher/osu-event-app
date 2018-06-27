import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Store } from '@ngxs/store';
import { VerifyJwt, Pop } from '@app/store';

@IonicPage()
@Component({
  templateUrl: './scan.html'
})
export class ScanPage {
  constructor(private barcodeScanner: BarcodeScanner, private store: Store) {}

  ionViewDidLoad() {
    this.barcodeScanner
      .scan({ showTorchButton: true, resultDisplayDuration: 0 })
      .then(barcodeData => {
        if (barcodeData.cancelled) {
          return;
        }

        this.store.dispatch([new VerifyJwt(barcodeData.text), new Pop()]);
      })
      .catch(err => {
        console.error(err);
        this.store.dispatch(new Pop());
      });
  }
}
