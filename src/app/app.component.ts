import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngxs/store';
import { Logout, Home } from '@app/store';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';

  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public store: Store
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      { title: 'Verify', component: 'VerifyPage', icon: 'checkmark-circle' },
      { title: 'Logout', component: '', icon: 'arrow-round-back' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title === 'Logout') {
      this.store.dispatch([new Logout(), new Home('LoginPage')]);
      return;
    }

    this.store.dispatch(new Home(page.component));
  }
}
