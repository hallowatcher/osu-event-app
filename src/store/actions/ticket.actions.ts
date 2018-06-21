import { Payment } from '../../models/payment';

export class SearchTicket {
  static readonly type = '[Tickets] Search ticket';
  constructor(public id: string) {}
}

export class SearchTicketSuccess {
  static readonly type = '[Tickets] Search ticket success';
  constructor(public ticket: Payment) {}
}
