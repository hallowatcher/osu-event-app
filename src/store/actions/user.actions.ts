export class CheckLoggedIn {
  static readonly type = '[User] Check logged in';
}

export class Login {
  static readonly type = '[User] Login';
  constructor(public email: string, public password: string) {}
}

export class LoginSuccess {
  static readonly type = '[User] Login success';
  constructor(public credentials: { email; uid }) {}
}

export class LoginError {
  static readonly type = '[User] Login error';
  constructor(public error: any) {}
}

export class Logout {
  static readonly type = '[User] Logout';
}
