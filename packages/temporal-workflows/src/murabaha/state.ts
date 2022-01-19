import { subBusinessDays, differenceInCalendarDays } from 'date-fns';
import { InputError } from '../core';

export class State {
  private _completionDate?: Date;
  private _mubarahExecutionDate?: Date;

  public setCompletionDate(completionDate: Date) {
    if (subBusinessDays(completionDate, 3) < new Date())
      throw new InputError('completion date has to be at least 3 business days from now');

    this._completionDate = completionDate;
    // Schedele execution 2 business days prior to completion date
    this._mubarahExecutionDate = subBusinessDays(this.completionDate, 2);
  }

  public get completionDate(): Date {
    if (!this._completionDate) {
      new InputError('completion date not set');
    }
    return this._completionDate as Date;
  }

  public get mubarahExecutionDate(): Date {
    if (!this._mubarahExecutionDate) {
      new InputError('mubarah execution date not set');
    }
    return this._mubarahExecutionDate as Date;
  }

  public getDaysTillExecution(): number {
    return differenceInCalendarDays(this.mubarahExecutionDate, new Date());
  }

  public toJson() {
    return {
      completionDate: this.completionDate,
      mubarahExecutionDate: this.mubarahExecutionDate
    };
  }
}
