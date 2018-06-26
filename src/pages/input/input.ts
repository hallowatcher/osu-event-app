import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';
import { Store } from '@ngxs/store';
import { VerifyId, Pop } from '../../store/actions';

@IonicPage()
@Component({
  templateUrl: './input.html'
})
export class InputPage {
  @ViewChild('input') input: TextInput;
  id: string = '';

  constructor(private store: Store) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.input.setFocus();
    }, 100);
  }

  submit() {
    this.store.dispatch([new VerifyId(this.id), new Pop()]);
  }
}
