import { NgModule } from '@angular/core';
import { ScanPage } from './scan';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ScanPage],
  imports: [IonicPageModule.forChild(ScanPage)],
  exports: [ScanPage]
})
export class ScanModule {}
