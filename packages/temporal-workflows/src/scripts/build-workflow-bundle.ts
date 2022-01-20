import { bundleWorkflowCode } from '@temporalio/worker';
import { writeFile } from 'fs/promises';
import { ensureDirSync } from 'fs-extra';
import path from 'path';

async function bundle() {
  const { code } = await bundleWorkflowCode({
    workflowsPath: require.resolve('../all-workflows'),
    nodeModulesPaths: [path.join(__dirname, '../../../../node_modules')]
  });

  const bundleDir = path.join(__dirname, '../../../../apps/temporal-worker/src/generated/');
  console.log('*********** ' + bundleDir);
  ensureDirSync(bundleDir);

  const bundlePath = path.join(bundleDir, 'workflow-bundle.js');

  await writeFile(bundlePath, code);

  console.log(`Bundle written to ${bundlePath}`);
}

bundle().catch((err) => {
  console.error(err);
  process.exit(1);
});
