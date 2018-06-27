import { Payment } from '../../models/payment';

export class VerifyJwt {
  static readonly type = '[Tickets] Verify ticket from JWT';
  constructor(public jwt: string) {}
}

export class VerifyJwtFailed {
  static readonly type = '[Tickets] Verify ticket from JWT failed';
  constructor(public error: any) {}
}

export class VerifyId {
  static readonly type = '[Tickets] Verify ticket ID';
  constructor(public id: string) {}
}

export class VerifySuccess {
  static readonly type = '[Tickets] Verify ticket success';
  constructor(public payment: Payment) {}
}

export class VerifyIdFailed {
  static readonly type = '[Tickets] Verify ticket ID failed';
  constructor(public error: any) {}
}

export class ChangeValidity {
  static readonly type = '[Tickets] Change validity for ticket';
  constructor(public id: string, public valid: boolean) {}
}
