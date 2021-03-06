import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import {
  Login,
  Logout,
  CheckLoggedIn,
  LoginError,
  LoginSuccess
} from '../actions/user.actions';
import {
  map,
  tap,
  switchMap,
  takeWhile,
  take,
  catchError
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
  @Selector()
  static loggedIn(state: UserStateModel) {
    return state.loggedIn;
  }

  @Selector()
  static email(state: UserStateModel) {
    return state.email;
  }

  constructor(private authService: AuthService) {}

  @Action(CheckLoggedIn)
  checkLoggedIn(ctx: StateContext<UserStateModel>) {
    return this.authService.loggedIn().pipe(
      take(1),
      switchMap(loggedIn => {
        if (!loggedIn) {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            loggedIn,
            email: ''
          });
          return Observable.of({});
        } else {
          return this.authService.getUser().pipe(
            take(1),
            tap(user => {
              const state = ctx.getState();
              ctx.setState({
                ...state,
                loggedIn: true,
                email: user.email
              });
            })
          );
        }
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, action: Login) {
    return this.authService.login(action.email, action.password).pipe(
      switchMap(result => ctx.dispatch(new LoginSuccess(result))),
      catchError(err => Observable.of(ctx.dispatch(new LoginError(err))))
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<UserStateModel>, action: LoginSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loggedIn: true,
      email: action.credentials.email
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>, action: Logout) {
    return this.authService.logout().pipe(
      tap(() => {
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
