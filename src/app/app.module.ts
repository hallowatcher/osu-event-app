import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { AuthService } from '../services/auth.service';
import { TicketState } from '../store/states/ticket.state';
import { UserState } from '../store/states/user.state';
import { NavState } from '../store/states/nav.state';

const FIREBASE = {
  apiKey: 'AIzaSyD_Owd16YQQfcYcPoMF2k3If8lJeNIepxw',
  authDomain: 'osu-event.firebaseapp.com',
  databaseURL: 'https://osu-event.firebaseio.com',
  projectId: 'osu-event',
  storageBucket: 'osu-event.appspot.com',
  messagingSenderId: '341664398030'
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxsModule.forRoot([NavState, TicketState, UserState]),
    NgxsLoggerPluginModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [StatusBar, SplashScreen, BarcodeScanner, Toast, AuthService]
})
export class AppModule {}
