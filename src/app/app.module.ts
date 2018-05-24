import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';

import { AuthService } from '../services/auth.service';

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
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}