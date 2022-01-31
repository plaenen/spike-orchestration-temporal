import * as b from '@packages/btl'
import * as p from '@packages/products'
import { cqrs } from '@packages/shared';
import { randomUUID } from 'crypto'
import { createConnection } from 'typeorm'

async function run() {
    const cmdCentre = new cqrs.CommandCentre()

    const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "postgres",
        schema: "products"
      });

    // Register all commands 
    cmdCentre.register([new b.commandHandlers.StartBuyToLetOrderingHandler(cmdCentre),
     new p.commandHandlers.CreateProductHandler({
        connection,
     })])
    

    const cmd = new b.commands.StartBuyToLetOrderingCmd({
        customerId: randomUUID(),
        idempotencyKey: randomUUID()
    })

    const res = await cmdCentre.execCommand(cmd)
    console.log(res)
}
  
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
