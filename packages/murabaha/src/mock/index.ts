import { randomUUID } from 'crypto'
import { subBusinessDays } from 'date-fns'
import * as i from '../interface';

export const createMurabahaMockService = (): i.MurabahaService => {
  return {
    async purchaseCommodities (req: i.PurchaseCommoditiesReqType): Promise<i.PurchaseCommoditiesResType> {
      i.PurchaseCommoditiesReqSchema.parse(req)
      return {
        transactionId: randomUUID()
      }
    },
    async deriveMurabahaPuchaseDate(req: i.DeriveMurabahaPuchaseDateReqType): Promise<i.DeriveMurabahaPuchaseDateResType> {
      i.DeriveMurabahaPuchaseDateReqSchema.parse(req)
      return {
        murabahaPurchaseDate: subBusinessDays(req.completionDate, 2)
      }
    }
  }
}