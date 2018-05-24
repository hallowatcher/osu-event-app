import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import * as jwt from 'jsonwebtoken';
import { ENV } from '@app/env';
import { AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { Payment } from 'models/payment';

@IonicPage()
@Component({
  templateUrl: './verify.html'
})
export class VerifyPage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private nav: NavController,
    private db: AngularFireDatabase
  ) {}

  payment: Payment;

  verify(barcodeData) {
    const token = barcodeData.text;
    try {
      const decoded = <any>jwt.verify(token, ENV.ticketSecret);
      const orderId = decoded.orderId;

      // Grab the payment from the database
      this.db
        .object(`payments/${orderId}`)
        .valueChanges()
        .pipe(take(1))
        .subscribe((payment: Payment) => {
          this.payment = payment;
        });
    } catch (e) {
      console.error(e);
    }
  }

  scan() {
    this.nav.push('ScanPage', { callback: this.verify.bind(this) });
  }
}
