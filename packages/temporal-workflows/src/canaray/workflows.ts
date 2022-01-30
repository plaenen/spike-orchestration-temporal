import { proxyActivities } from '@temporalio/workflow';
import { createCanaryActivities } from './activities';

const { greet } = proxyActivities<ReturnType<typeof createCanaryActivities>>({
  startToCloseTimeout: '1 minute'
});

export async function canaryWf(name: string): Promise<string> {
  return await greet(name);
}
