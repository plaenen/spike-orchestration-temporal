import { sleep } from '@temporalio/workflow';
import { State } from './state';

export type ScheduleAndRunMubarahRequest = {
  completionDate: Date;
};

export type ScheduleAndRunMubarahResponse = {};

export async function scheduleAndRunMubarah(req: ScheduleAndRunMubarahRequest): Promise<ScheduleAndRunMubarahResponse> {
  const state = new State();
  state.setCompletionDate(req.completionDate);
  waitTillMubarahaExecutionDate(state);
  return {};
}

async function waitTillMubarahaExecutionDate(state: State): Promise<void> {
  sleep(`${state.getDaysTillExecution()} DAYS`);
}
