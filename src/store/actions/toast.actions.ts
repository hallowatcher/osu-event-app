export class Create {
  static readonly type = '[Toast] Create toast';
  constructor(
    public options: {
      message: string;
      duration: number;
      position?: string;
      showCloseButton?: boolean;
      closeButtonText?: string;
    }
  ) {}
}
