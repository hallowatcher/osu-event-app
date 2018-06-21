import { State } from '@ngxs/store';
import { Payment } from '../../models/payment';

export interface TicketStateModel {
  activeTicket: Payment;
}
@State<TicketStateModel>({
  name: 'ticket',
  defaults: {
    activeTicket: undefined
  }
})
export class TicketState {}
