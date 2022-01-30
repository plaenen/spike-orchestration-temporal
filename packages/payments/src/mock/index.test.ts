import { InitiateIntrabankTransferRequestType } from '..';
import { createMockPaymentService } from './index';

it('should be posible to transfer a money between 2 internal services', async () => {
    const service = createMockPaymentService()
    const req: InitiateIntrabankTransferRequestType = {
        idempotencyKey: '09e297cc-802d-11ec-a8a3-0242ac120002',
        fromAccount: "F_12345678901234567890",
        toAccount: "T_12345678901234567890",
        amount: { // 100 EURO
            amount: 10000, 
            currency: 'EUR',
            decimals: 2
        },
        description: 'test transfer'
    }
    const result = await service.InitiateIntrabankTransfer(req)
    expect(service.getTransActions().get(result.transactionId)).not.toBeUndefined()
    expect(service.getAccounts().get(req.fromAccount)).toEqual(-req.amount.amount)
    expect(service.getAccounts().get(req.toAccount)).toEqual(req.amount.amount)
});

export {};
