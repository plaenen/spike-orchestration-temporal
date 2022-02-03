import { connect } from 'nats'
import { Worker } from '@temporalio/worker';
import { HandlerCentreOpt, commandCentre } from '@packages/commands-nats';
import { createActivities }from './activities';

async function run() {

  const nastConnection = await connect({ servers: 'localhost '})
  const cmdCentre = commandCentre({
    nc: nastConnection
  })

  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(cmdCentre), 
    taskQueue: 'child-workflows',
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});