import { connect } from 'nats'
import { NatsHandler } from '@packages/nats-commands'
import { handlers } from '@domains/buy-to-let'

async function run() {
    const conn = await connect({ servers: 'localhost:4222' })
    const natsHandler = new NatsHandler(conn)
    natsHandler.register([
        new handlers.InitiateBuyToLetOriginationHandler()
    ])
    natsHandler.subscribe()
}
  
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
