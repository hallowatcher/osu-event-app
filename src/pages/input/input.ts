import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';
import { Store } from '@ngxs/store';
import { VerifyId } from '../../store/actions/ticket.actions';
import { Pop } from '../../store/actions/nav.actions';

@IonicPage()
@Component({
  templateUrl: './input.html'
})
export class InputPage {
  @ViewChild('input') input: TextInput;
  id: string = '';

  constructor(private store: Store) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.input.setFocus();
    }, 150);
  }

  submit() {
    this.store.dispatch([new VerifyId(this.id), new Pop()]);
  }
}
