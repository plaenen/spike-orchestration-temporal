import * as z from 'zod'
import { verify } from 'jsonwebtoken'

export type ElectronicSignatureType = 
    | JwtSignatureType


// Todo add afditional verification
export const JwtSginatureSchema = z.string()

export type JwtSignatureType = z.infer<typeof JwtSginatureSchema>;