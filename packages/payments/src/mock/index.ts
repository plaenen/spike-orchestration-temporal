import { randomUUID } from 'crypto'
import * as i from "../interface";

interface MockPaymentsService extends i.PaymentService {
    getAccounts():  Map<string, number>
    getTransActions():  Map<string, string>    
}

export const createMockPaymentService = (): MockPaymentsService =>  {
    const accounts: Map<string, number> = new Map
    const transacions: Map<string, string> = new Map

    return {
        async InitiateIntrabankTransfer(req: i.InitiateIntrabankTransferRequestType): Promise<i.InitiateIntrabankTransferResponseType> {
            i.InitiateIntrabankTransferRequestSchema.parse(req)
            const fromAmmount = accounts.get(req.fromAccount) || 0
            const newFromAmmount = fromAmmount - req.amount.amount
            accounts.set(req.fromAccount, newFromAmmount)
    
            const toAmmount = accounts.get(req.toAccount) || 0
            const newtoAmmount = toAmmount + req.amount.amount
            accounts.set(req.toAccount, newtoAmmount)
    
            const transactionId = randomUUID()
            transacions.set(transactionId, JSON.stringify(req, null, 2))
            return {
                transactionId,
            }
        },
        getAccounts():  Map<string, number>  {
            return accounts
        },
        getTransActions():  Map<string, string>  {
            return transacions
        }
    }
}
