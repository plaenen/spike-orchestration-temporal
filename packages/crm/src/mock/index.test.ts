import { CreateGenericCaseRequestType, CreateCustomerReqType } from '..';
import { createMockCrmService } from './index';

it('should be posible to transfer a money between 2 internal services', async () => {
    const service = createMockCrmService()
    const req: CreateGenericCaseRequestType = {
        idempotencyKey: '09e297cc-802d-11ec-a8a3-0242ac120002',
        title: 'test case',
        context: 'generated in a test-suite',
        action: 'resolve the csse',
        priority: 'CRITICAL',
        source: 'testcase:crm'
    }
    const result = await service.CreateGenericCase(req)
    console.log(result)
});

it('should be possible to create a new customer', async () => {
    const service = createMockCrmService()
    const req: CreateCustomerReqType = {
        idempotencyKey: '09e297cc-802d-11ec-a8a3-0242ac120002',
        email: 'foo@bar.com',
        mobile: '+97123422229332',
        name: 'Foo Bar'
    }
    const result = await service.CreateCustomer(req)
    console.log(result)
})

export {};
