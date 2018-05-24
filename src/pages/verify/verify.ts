import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { IonicPage, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  templateUrl: './verify.html'
})
export class VerifyPage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public nav: NavController
  ) {}

  code = 'No ticket currently scanned';

  verify(barcodeData) {
    this.code = barcodeData.text;
  }

  scan() {
    this.nav.push('ScanPage', { callback: this.verify.bind(this) });
  }
}
