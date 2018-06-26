export class CheckLoggedIn {
  static readonly type = '[User] Check logged in';
}

export class Login {
  static readonly type = '[User] Login';
  constructor(public email: string, public password: string) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}
