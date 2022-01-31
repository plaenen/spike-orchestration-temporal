import { sleep, proxyActivities } from '@temporalio/workflow';

export async function createBuyToLetProduct(req: ScheduleAndRunMubarahRequest): Promise<ScheduleAndRunMubarahResponse> {
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
