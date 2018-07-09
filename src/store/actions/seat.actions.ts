import { Seat } from 'models/seat';

export class GetSeat {
  static readonly type = '[Seats] Get seat';
  constructor(public id: string) {}
}

export class GetSeatSuccess {
  static readonly type = '[Seats] Get seat success';
  constructor(public seat: Seat) {}
}

export class GetSeatFailed {
  static readonly type = '[Seats] Get seat failed';
  constructor(public error: any) {}
}
