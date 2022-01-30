import {ProductService } from './interface'
import { ProductRepository } from './repository'
export * from './interface'

export class ProductServiceImp implements ProductService {
    protected _repository: typeof ProductRepository

    GetEligibleProductsForCustomer(req: { customerId: string }): Promise<{ customerId: string }> {
        throw new Error('Method not implemented.')
    }
    GetProductsForCustomers(req: { customerId: string; includeClosed: boolean }): Promise<{ productCode: 'account:current:gbp' | 'account:current:usd' | 'account:savings:gbp' | 'account:savings:usd' | 'mortgage:buy_to_let'; productId: string; productStatus: 'origination' | 'active' | 'suspended' | 'dormant' | 'closed'; productRiskScore: number }> {
        throw new Error('Method not implemented.')
    }
    StartProductOrigination(req: { customerId: string; productCode: 'account:current:gbp' | 'account:current:usd' | 'account:savings:gbp' | 'account:savings:usd' | 'mortgage:buy_to_let'; idempotencyKey: string }): Promise<{ productId: string; productStatus: 'origination' | 'active' | 'suspended' | 'dormant' | 'closed' }> {
        throw new Error('Method not implemented.')
    }

} 