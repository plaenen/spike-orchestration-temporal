import {
  IMurabahaBroker,
  PurchaseCommoditiesReq,
  PurchaseCommoditiesRes,
} from "../interface";

export class MurabahaMockBroker implements IMurabahaBroker {
  public PurchaseCommoditiesRes: PurchaseCommoditiesRes = {
    success: true
  }

  async purchaseCommodities(
    req: PurchaseCommoditiesReq
  ): Promise<PurchaseCommoditiesRes> {
    return this.PurchaseCommoditiesRes
  }
}
