import { Connection, WorkflowClient } from '@temporalio/client';
import { workflows } from '@packages/temporal-workflows';

async function run() {
  const connection = new Connection();

  const client = new WorkflowClient(connection.service, {
    namespace: 'default'
  });

  const result = await client.execute(workflows.canaryWf, {
    taskQueue: 'default',
    workflowId: 'production-sample-0',
    args: ['Temporal']
  });
  console.log(result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
