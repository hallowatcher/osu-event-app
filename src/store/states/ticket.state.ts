import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Payment } from '../../models/payment';
import {
  ChangeValidity,
  VerifyJwt,
  VerifyId,
  VerifyJwtFailed,
  VerifyIdFailed
} from '../actions/ticket.actions';
import * as jwt from 'jsonwebtoken';
import { AngularFireDatabase } from 'angularfire2/database';
import { ENV } from '@app/env';
import { take, tap, catchError } from 'rxjs/operators';
import moment from 'moment';

export interface TicketStateModel {
  activeTicket: Payment;
}
@State<TicketStateModel>({
  name: 'ticket',
  defaults: {
    activeTicket: undefined
  }
})
export class TicketState {
  @Selector()
  static activeTicket(state: TicketStateModel): Payment {
    return state.activeTicket;
  }

  @Selector()
  static validChangedFromNow(state: TicketStateModel): string {
    return state.activeTicket.validChanged
      ? moment(state.activeTicket.validChanged).fromNow()
      : 'never';
  }

  constructor(private db: AngularFireDatabase) {}

  @Action(VerifyJwt)
  verifyJwt(ctx: StateContext<TicketStateModel>, action: VerifyJwt) {
    try {
      const decoded = <any>jwt.verify(action.jwt, ENV.ticketSecret);
      const orderId = decoded.orderId;

      // Grab the payment from the database
      return this.db
        .object(`payments/${orderId}`)
        .valueChanges()
        .pipe(
          take(1),
          tap((activeTicket: Payment) => {
            if (!activeTicket) {
              ctx.dispatch(
                new VerifyIdFailed({ message: 'Invalid payment ID' })
              );
              return;
            }

            if (activeTicket.valid === undefined) {
              activeTicket.valid = true;
            }

            const state = ctx.getState();
            ctx.setState({
              ...state,
              activeTicket
            });
          }),
          catchError(e => ctx.dispatch(new VerifyIdFailed(e)))
        );
    } catch (e) {
      ctx.dispatch(new VerifyJwtFailed(e));
    }
  }

  @Action(VerifyId)
  verifyId(ctx: StateContext<TicketStateModel>, action: VerifyId) {
    return this.db
      .object(`payments/${action.id}`)
      .valueChanges()
      .pipe(
        take(1),
        tap((activeTicket: Payment) => {
          if (!activeTicket) {
            ctx.dispatch(new VerifyIdFailed({ message: 'Invalid payment ID' }));
            return;
          }

          if (!activeTicket) {
            throw new Error('Invalid ticket');
          }

          if (activeTicket.valid === undefined) {
            activeTicket.valid = true;
          }

          const state = ctx.getState();
          ctx.setState({
            ...state,
            activeTicket
          });
        }),
        catchError(e => ctx.dispatch(new VerifyIdFailed(e)))
      );
  }

  @Action(ChangeValidity)
  async changeValidity(
    ctx: StateContext<TicketStateModel>,
    action: ChangeValidity
  ) {
    await this.db.object(`payments/${action.id}/valid`).set(action.valid);
    await this.db
      .object(`payments/${action.id}/validChanged`)
      .set(new Date().toISOString());
  }
}
