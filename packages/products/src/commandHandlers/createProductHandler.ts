import { Connection } from "typeorm";
import { randomUUID} from 'crypto'
import { ProductRepository, OutboxRepository } from '../repository/index'
import { Product } from '../entities'
import { cqrs } from '@packages/shared'
import { CreateProductCmd, CreateProductResType  } from '../commands'
import { Outbox } from '../entities/outbox'


export type Services = {
    connection: Connection
 }

export class CreateProductHandler implements cqrs.ICommandHandler<CreateProductCmd, CreateProductResType> {   
    protected _services: Services 
    
    get handlesCommandName(): string {
        return 'cmd:product:create-product.v1'
    }
    
    async handle(cmd: CreateProductCmd): Promise<CreateProductResType> {
        CreateProductCmd.validateArgs(cmd)
        const connection = this._services.connection;

        const product = new Product()
        product.id = randomUUID()
        product.customerId = cmd.args.customerId
        product.productRiskScore = 100
        product.productStatus = ''
        product.productCode = cmd.args.productClass

        const outbox = new Outbox()
        outbox.aggregateId = product.id
        outbox.aggregateType = 'product'
        outbox.eventType = 'event:product.created'
        outbox.idempotencyKey = cmd.args.idempotencyKey
        outbox.payload = JSON.stringify(cmd.args)

        await connection.transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(product)
            await transactionalEntityManager.save(outbox)
        });

        return {
            productId: product.id
        }
    }

    constructor(services: Services) {
        this._services = services
    }
}
