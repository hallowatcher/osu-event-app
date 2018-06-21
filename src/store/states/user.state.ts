import { State, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import { Login, Logout } from '../actions/user.actions';
import { map, tap } from 'rxjs/operators';

export interface UserStateModel {
  loggedIn: boolean;
  email: string;
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    loggedIn: false,
    email: ''
  }
})
export class UserState {
  constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, action: Login) {
    return this.authService.login(action.email, action.password).pipe(
      map(result => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          loggedIn: true,
          email: result.email
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>, action: Logout) {
    return this.authService.logout().pipe(
      map(() => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          loggedIn: false,
          email: ''
        });
      })
    );
  }
}
