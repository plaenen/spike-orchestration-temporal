import { CreateProductCmd, CreateProductResType } from "."
import { CreateProductHandler } from "../commandHandlers"
import { cqrs } from '@packages/shared'
import { Connection, createConnection } from "typeorm"
import { Product } from "../entities"
import { Outbox } from "../entities/outbox"
import { randomUUID } from 'crypto'

let connection: Connection

beforeAll(async () => {
    connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "postgres",
        schema: "products",
        entities: [Product, Outbox],
        synchronize: true
      });
})

afterAll(async () => {
    await connection.close()
})

it('should be possible to create a new buy to let mortgage', async() => {
    const cmd = new CreateProductCmd({
        customerId: randomUUID(),
        idempotencyKey: randomUUID(),
        productClass: "mortgage:buy_to_let",
    })

    const cmdCentre = new cqrs.CommandCentre()
    const handler = new CreateProductHandler({
        connection,
    })
    cmdCentre.register([handler])
    
    const res = await cmdCentre.execCommand<CreateProductResType>(cmd)
    console.log(res)

    // expect(res.productId).toEqual(handler.response.productId)
})

export {}