import { randomUUID } from 'crypto'
import { IdempotencyKeyType, IdempotencyKeySchema } from "."


describe('api/idempotencykey', () => {

    it("Should be possible to create a valid idempotency key", () => {
        let key: IdempotencyKeyType = randomUUID()
        expect(IdempotencyKeySchema.safeParse(key).success).toBeTruthy()
    })

    it("Should not be possible to create a in-valid idempotency key", () => {
        let key: IdempotencyKeyType = 'not_a_uuid'
        expect(IdempotencyKeySchema.safeParse(key).success).toBeFalsy()
    })

})

export {}