export class Push {
  static readonly type = '[Nav] Push page';
  constructor(public page: string) {}
}

export class Pop {
  static readonly type = '[Nav] Pop page';
}

export class Home {
  static readonly type = '[Nav] Home page';
  constructor(public page: string) {}
}
