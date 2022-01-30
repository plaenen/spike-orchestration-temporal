import { commands } from '@packages/btl'
import { randomUUID } from 'crypto'

async function run() {
    const cmd = new commands.startBuyToLetOrdering.Command({
        customerId: 'cus_123456789012345678',
        idempotencyKey: randomUUID()
    })
}
  
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
