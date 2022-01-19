interface IActivityError {
  message: string;
}

export abstract class ActivityError extends Error implements IActivityError {
  protected _message: string = '';
  public set message(message: string) {
    this._message = message;
  }

  public get message(): string {
    return this._message;
  }
}

export class UnexpectedActivityError extends ActivityError {
  public constructor(err: any) {
    super(err);
  }

  public static create(err: any): ActivityError {
    return new UnexpectedActivityError(err);
  }
}
