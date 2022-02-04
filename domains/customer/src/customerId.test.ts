import { CustomerIdSchema, CustomerIdType } from '.'
it('should be possible to create a new customerId', () => {
    let cusId = ''
    expect(CustomerIdSchema.safeParse(cusId).success).toBeFalsy()
    cusId = '4db40e78-82e3-11ec-a8a3-0242ac120002'
    expect(CustomerIdSchema.safeParse(cusId).success).toBeTruthy()
})
export {}