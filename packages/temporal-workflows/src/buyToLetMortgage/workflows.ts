import { sleep, proxyActivities } from '@temporalio/workflow';
import { State } from './state';
import type { createMurabahaActivities } from './activities';
import { Amount } from '@packages/shared';
import { Meta } from '../core';

const { purchaseCommodities } = proxyActivities<ReturnType<typeof createMurabahaActivities>>({
  startToCloseTimeout: '30 seconds'
});

export type IssueBuyRequest = {
  idempotencyKey: string;
  completionDate: Date;
  amount: Amount;
  meta: Meta
};

export type ScheduleAndRunMubarahResponse = {};

type Context = {
  req: ScheduleAndRunMubarahRequest
  state: State
}


export async function scheduleAndRunMubarahWf(req: ScheduleAndRunMubarahRequest): Promise<ScheduleAndRunMubarahResponse> {
  const context: Context = {
    state: new State(),
    req
  }

  context.state.setCompletionDate(req.completionDate);
  waitTillMubarahaExecutionDate(context);
  // purchaseCommodities({
  //   amount: req.amount,
  //   idempotencyKey: req.idempotencyKey
  // });
  return {};
}

async function waitTillMubarahaExecutionDate(context: Context): Promise<void> {
  sleep(`${context.state.getDaysTillExecution() * context.req.meta.timeMultiplier } DAYS`);
}
