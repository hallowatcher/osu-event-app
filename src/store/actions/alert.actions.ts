export class BasicAlert {
  static readonly type = '[Alert] Basic alert';
  constructor(
    public options: { title: string; subTitle: string; buttons: string[] }
  ) {}
}
