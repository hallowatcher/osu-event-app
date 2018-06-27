import { State, Action, StateContext } from '@ngxs/store';
import { AlertController } from 'ionic-angular';
import { BasicAlert } from '../actions/alert.actions';

@State({
  name: 'alert'
})
export class AlertState {
  constructor(private alertCtrl: AlertController) {}

  @Action(BasicAlert)
  basicAlert(ctx: StateContext<string>, action: BasicAlert) {
    const alert = this.alertCtrl.create(action.options);
    alert.present();
  }
}
