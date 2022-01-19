import { State } from './state';
import { addBusinessDays, format } from 'date-fns';
import { InputError } from '../core';

it('should not be possible to get a completiondate less then 3 business days away', () => {
  try {
    const state = new State();
    state.setCompletionDate(addBusinessDays(new Date(), 3));
  } catch (err) {
    expect(err instanceof InputError).toBeTruthy();
  }
});

it('should be possible to get a valid mubaraha date', () => {
  const state = new State();
  const today = new Date();
  const completionDate = addBusinessDays(today, 3);
  const expectedmubarahExecutionDate = addBusinessDays(today, 1);

  state.setCompletionDate(completionDate);
  expect(format(state.completionDate, 'yyyyMMdd')).toEqual(format(completionDate, 'yyyyMMdd'));
  expect(format(state.mubarahExecutionDate, 'yyyyMMdd')).toEqual(format(expectedmubarahExecutionDate, 'yyyyMMdd'));
  expect(state.getDaysTillExecution()).toEqual(1);
});
