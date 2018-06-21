import { State, Action, StateContext } from '@ngxs/store';
import { NavController, App } from 'ionic-angular';
import { Push, Home, Pop } from '../actions/nav.actions';
import { Injector } from '@angular/core';

@State({
  name: 'nav'
})
export class NavState {
  private get nav(): NavController {
    return this.app.getRootNavs()[0];
  }

  constructor(protected app: App) {}

  @Action(Push)
  push(ctx: StateContext<string>, action: Push) {
    this.nav.push(action.page);
  }

  @Action(Pop)
  pop() {
    this.nav.pop();
  }

  @Action(Home)
  home(ctx: StateContext<string>, action: Push) {
    this.nav.setRoot(action.page);
  }
}
