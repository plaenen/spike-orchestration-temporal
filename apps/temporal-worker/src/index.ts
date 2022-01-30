import { Worker } from '@temporalio/worker';
import { activities } from '@packages/temporal-workflows';
// import { MurabahaMockBroker } from '@packages/murabaha';
import path from 'path';

const workflowOption = () => {
  return {
    workflowBundle: { path: require.resolve('./generated/workflow-bundle.js') }
  };
};

const initiatedActivities = {
  // ...activities.createMurabahaActivities({
  //   murabahaBroker: new MurabahaMockBroker()
  // }),
  ...activities.createCanaryActivities('injected')
};

async function run() {
  const worker = await Worker.create({
    ...workflowOption(),
    activities: initiatedActivities,
    nodeModulesPaths: [path.join(__dirname, '../../node_modules')],
    taskQueue: 'default'
  });

  console.log(worker.getState())

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
