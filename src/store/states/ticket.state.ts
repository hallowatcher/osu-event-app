import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Payment } from '../../models/payment';
import * as jwt from 'jsonwebtoken';
import { AngularFireDatabase } from 'angularfire2/database';
import { ENV } from '@app/env';
import { take, tap, catchError } from 'rxjs/operators';
import moment from 'moment';
import { Seat } from '../../models/seat';
import {
  GetSeat,
  GetSeatFailed,
  GetSeatSuccess,
  ChangeValidity,
  VerifyJwt,
  VerifyId,
  VerifyJwtFailed,
  VerifyIdFailed,
  VerifySuccess
} from '@app/store/actions';

export interface TicketStateModel {
  activeTicket: Payment;
  activeSeat: Seat;
}
@State<TicketStateModel>({
  name: 'ticket',
  defaults: {
    activeTicket: undefined,
    activeSeat: undefined
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

  @Selector()
  static activeSeat(state: TicketStateModel): Seat {
    return state.activeSeat;
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

            ctx.dispatch(new VerifySuccess(activeTicket));
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

          ctx.dispatch(new VerifySuccess(activeTicket));
        }),
        catchError(e => ctx.dispatch(new VerifyIdFailed(e)))
      );
  }

  @Action(VerifySuccess)
  verifySuccess(ctx: StateContext<TicketStateModel>, action: VerifySuccess) {
    ctx.dispatch(new GetSeat(action.payment.id));

    const activeTicket: Payment = { ...action.payment };

    if (activeTicket.valid === undefined) {
      activeTicket.valid = true;
    }

    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeTicket
    });
  }

  @Action(GetSeat)
  getSeat(ctx: StateContext<TicketStateModel>, action: GetSeat) {
    return this.db
      .object(`seats/${action.id}`)
      .valueChanges()
      .pipe(
        take(1),
        tap((seat: Seat) => {
          if (!seat) {
            ctx.dispatch(
              new GetSeatFailed({ message: 'No seat reservation!' })
            );
            return;
          }

          ctx.dispatch(new GetSeatSuccess(seat));
        }),
        catchError(e => ctx.dispatch(new GetSeatFailed(e)))
      );
  }

  @Action(GetSeatSuccess)
  getSeatSuccess(ctx: StateContext<TicketStateModel>, action: GetSeatSuccess) {
    const activeSeat: Seat = { ...action.seat };

    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeSeat
    });
  }

  @Action(GetSeatFailed)
  getSeatFailed(ctx: StateContext<TicketStateModel>, action: GetSeatFailed) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      activeSeat: undefined
    });
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
