import { CommandType } from '@packages/commands';
import { proxyActivities } from '@temporalio/workflow';
import type { createActivities } from '../activities';

const { execCommand } = proxyActivities<ReturnType<typeof createActivities>>({
    startToCloseTimeout: '30 seconds',
});

export async function createWorkflow(req: CommandType): Promise<any> {
    return await execCommand(req);
}