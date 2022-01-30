import { Connection, WorkflowClient } from '@temporalio/client';
import { workflows } from '@packages/temporal-workflows';
import { addBusinessDays } from 'date-fns';

async function run() {
  const connection = new Connection();

  const client = new WorkflowClient(connection.service, {
    namespace: 'default'
  });

  const canaryWfResult = await client.execute(workflows.canaryWf, {
    taskQueue: 'default',
    workflowId: 'production-sample-0',
    args: ['Temporal']
  });
  console.log(canaryWfResult);

  // const scheduleAndRunMubarahResult = await client.execute(workflows.scheduleAndRunMubarahWf, { // 
  //   taskQueue: 'default', //
  //   workflowId: 'production-sample-0',
  //   args: [
  //     {
  //       amount: {
  //         amount: 1000,
  //         currencyCode: 'EUR'
  //       },
  //       idempotencyKey: 'my_idempotency_key',
  //       completionDate: addBusinessDays(new Date(), 5),
  //       meta: {
  //         // Use to fast forward sleep timers
  //         timeMultiplier: 0.000001
  //       }
  //     }

  //   ]
  // });
  // console.log(scheduleAndRunMubarahResult);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
