import { randomUUID } from 'crypto'
import { CreateCustomerReqType } from '..';
import * as i from "../interface";

interface MockCrmService extends i.CrmService {}

export const createMockCrmService = (): MockCrmService =>  {
    const cases: Map<string, string> = new Map()
    const customers: Map<string, CreateCustomerReqType>= new Map()

    return {
        async CreateGenericCase(req: i.CreateGenericCaseRequestType): Promise<i.CreateGenericCaseResponseType> {
            i.CreateGenericCaseRequestSchema.parse(req)
            const caseId = randomUUID()
            const caseString = JSON.stringify(req, null, 2)
            cases.set(caseId, caseString)
            console.log(caseString)
            return {
                caseId, 
            }
        },
        async CreateCustomer(req: i.CreateCustomerReqType): Promise<i.CreateCustomerResType> {
            i.CreateCustomerReqSchema.parse(req)
            const customerId = randomUUID()
            customers.set(customerId, req)
            return {
                customerId: customerId
            }
        } 
    }
}
