import { cqrs } from '@packages/shared'
import { commands } from '@packages/products'
import { CreateProductCmd, CreateProductResType  } from '../commands'

export class CreateProductHandler implements cqrs.ICommandHandler<CreateProductCmd, CreateProductResType> {    
    
    get handlesCommandName(): string {
        return 'cmd:product:create-product.v1'
    }

    public response?: CreateProductResType

    async handle(cmd: CreateProductCmd): Promise<CreateProductResType> {
        if (!this.response) {
            throw new Error('No mock response provided');
            
        }
        return this.response
    }
}