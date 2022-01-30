import * as z from 'zod'
import {electronicFormatIBAN, validateIBAN } from 'ibantools'

export type BankAccount = 
 IbanBankAccountType
 | IbanBankAccountType


export const InternalBankAccountSchema = z.string().
    length(22, { message: "Internal bank accounts should have 22 characters"})

export type InternalBankAccountType = z.infer<typeof InternalBankAccountSchema>

export const IbanBankAccountSchema = z.string().superRefine((val, ctx) => { 
    const isValidIban = validateIBAN(val)
    if (!isValidIban.valid) {
        ctx.addIssue({
            code: 'custom',
            message: `Invalid iban provided, ${isValidIban.errorCodes.toString()}, codes: NoIBANProvided = 0, NoIBANCountry = 1, WrongBBANLength = 2, WrongBBANFormat = 3, ChecksumNotNumber = 4, WrongIBANChecksum = 5, WrongAccountBankBranchChecksum = 6`
        })
    }
})

export type IbanBankAccountType = z.infer<typeof IbanBankAccountSchema>