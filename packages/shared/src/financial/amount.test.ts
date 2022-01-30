import { AmountType, AmountSchema } from "."

describe('financial/amount', () => {

    it("Should be possible to create an amount", () => {
        let amount: AmountType = {
            amount: BigInt(100),
            currency: 'USD',
            decimals: 2
        }
        expect(AmountSchema.safeParse(amount).success).toBeTruthy()
    })

    it("Should not be possible to create an invalid amount", () => {
        let amount: AmountType = {
            amount: BigInt(100),
            currency: 'FOO', // currency does not exist
            decimals: 2
        }
        expect(AmountSchema.safeParse(amount).success).toBeFalsy()
    })
    
})

export {}