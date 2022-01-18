import { bundleWorkflowCode } from '@temporalio/worker';
import { writeFile } from 'fs/promises';
import { ensureDirSync } from 'fs-extra';
import path from 'path';

async function bundle() {
  const { code } = await bundleWorkflowCode({
    workflowsPath: require.resolve('../src/all-workflows')
  });

  const bundleDir = path.join(__dirname, '../../temporal-worker/src/generated/');
  ensureDirSync(bundleDir);

  const bundlePath = path.join(bundleDir, 'workflow-bundle.js');

  await writeFile(bundlePath, code);

  console.log(`Bundle written to ${bundlePath}`);
}

bundle().catch((err) => {
  console.error(err);
  process.exit(1);
});
