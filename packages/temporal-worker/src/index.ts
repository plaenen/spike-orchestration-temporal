import { Worker } from '@temporalio/worker';
import { activities } from '@packages/temporal-workflows';
import path from 'path';

const workflowOption = () => {
  return {
    workflowBundle: { path: require.resolve('./generated/workflow-bundle.js') }
  };
};

async function run() {
  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    nodeModulesPaths: [path.join(__dirname, '../../node_modules')],
    taskQueue: 'default'
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
