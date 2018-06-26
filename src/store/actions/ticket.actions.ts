import { Payment } from '../../models/payment';

export class VerifyJwt {
  static readonly type = '[Tickets] Verify ticket from JWT';
  constructor(public jwt: string) {}
}

export class VerifyId {
  static readonly type = '[Tickets] Verify ticket from ID';
  constructor(public id: string) {}
}

export class ChangeValidity {
  static readonly type = '[Tickets] Change validity for ticket';
  constructor(public id: string, public valid: boolean) {}
}
