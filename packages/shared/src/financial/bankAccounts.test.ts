import { InternalBankAccountSchema, IbanBankAccountSchema, IbanBankAccountType, InternalBankAccountType } from "."

describe('financial/bankAccounts', () => {

    it("Should be possible to create a valid bank account", () => {
        let account: InternalBankAccountType = "1234567890123456789012"
        expect(InternalBankAccountSchema.safeParse(account).success).toBeTruthy()
    })

    it("Should throw an error if the internal bank account is incorrect", () => {
        let account: InternalBankAccountType = "12"
        expect(InternalBankAccountSchema.safeParse(account).success).toBeFalsy()
    })

    it("Should be possible to create a valid IBAN bank account", () => {
        let account: IbanBankAccountType = "AE070331234567890123456"
        expect(IbanBankAccountSchema.safeParse(account).success).toBeTruthy()
    })

    it("Should throw an error if the IBAN bank account is incorrect", () => {
        let account: IbanBankAccountType = "XX070331234567890123457"
        expect(IbanBankAccountSchema.safeParse(account).success).toBeFalsy()
    })
    
})

export {}