import { State, Action, StateContext } from '@ngxs/store';
import { ToastController } from 'ionic-angular';
import { Create } from '../actions/toast.actions';

@State({
  name: 'toast'
})
export class ToastState {
  constructor(private toastCtrl: ToastController) {}

  @Action(Create)
  basicAlert(ctx: StateContext<string>, action: Create) {
    const toast = this.toastCtrl.create(action.options);
    toast.present();
  }
}
