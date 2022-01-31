import { proxyActivities } from '@temporalio/workflow';
import * as z from 'zod';
import { commands } from '@packages/products'
import { CreateProductResType } from '@packages/products/src/commands';

const reqSchema = z.object({

})

export async function createProductWf(req: commands.CreateProductArgsType): Promise<CreateProductResType> {
  return await {
    productId: '123'
  }
}