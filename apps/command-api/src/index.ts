import { connect } from 'nats'
import { randomUUID } from 'crypto'
import { commandCentre } from '@packages/commands-nats'
import {  } from '@domains/product'

async function run() {
    const conn = await connect({ servers: 'localhost:4222' })
    const cmdCentre = commandCentre({ 
        nc: conn
    })

    const cmd = new commands.InitiateBuyToLetOriginationCmd({
        idempotencyKey: randomUUID(),
        customerId: randomUUID()
    })

    const res = await cmdCentre.execCommand(cmd, 1000)
    console.log(res)
    await conn.close()
}
  
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
