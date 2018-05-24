import { NgModule } from '@angular/core';
import { VerifyPage } from './verify';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [VerifyPage],
  imports: [IonicPageModule.forChild(VerifyPage)],
  exports: [VerifyPage]
})
export class VerifyModule {}
